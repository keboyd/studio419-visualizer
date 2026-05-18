import { expect, test, type FrameLocator, type Page } from "@playwright/test";

async function loadPrototype(page: Page): Promise<FrameLocator> {
  await page.goto("/");
  const frame = page.frameLocator("iframe.prototype-frame");
  await expect(frame.locator(".studio419-logo-svg")).toBeVisible();
  return frame;
}

async function clearPrototypeStorage(page: Page) {
  await page.goto("/");
  await page.evaluate(() => {
    localStorage.clear();
  });
}

async function setRangeValue(frame: FrameLocator, selector: string, value: string) {
  await frame.locator(selector).evaluate((node, nextValue) => {
    const input = node as HTMLInputElement;
    input.value = String(nextValue);
    input.dispatchEvent(new Event("input", { bubbles: true }));
  }, value);
}

test.beforeEach(async ({ page }) => {
  await clearPrototypeStorage(page);
});

test.describe("Phase 2 behavior hardening", () => {
  test("persists type, layout, mode, viewport, and saved setup after refresh", async ({ page }) => {
    let frame = await loadPrototype(page);

    await frame.getByRole("button", { name: "Dark" }).click();
    await frame.getByRole("button", { name: "Mobile" }).click();
    await setRangeValue(frame, "#size", "76");
    await setRangeValue(frame, "#heroPadX", "72");
    await frame.getByRole("button", { name: "Centered" }).click();
    await frame.locator("#presetNameInput").fill("Persistent Phase 2 Setup");
    await frame.getByRole("button", { name: "Save Active Setup" }).click();

    await page.reload();
    frame = page.frameLocator("iframe.prototype-frame");
    await expect(frame.locator(".studio419-logo-svg")).toBeVisible();

    await expect(frame.locator("#darkBtn")).toHaveClass(/active/);
    await expect(frame.locator("#canvasStage")).toHaveAttribute("data-viewport", "mobile");
    await expect(frame.locator("#sizeVal")).toHaveText("76px");
    await expect(frame.locator("#heroPadXVal")).toHaveText("72px");
    await expect(frame.locator("#layoutCenterBtn")).toHaveClass(/active/);
    await expect(frame.locator("#presetBrowserSelect")).toContainText("Persistent Phase 2 Setup");
  });

  test("scopes color overrides by Color Usage mode", async ({ page }) => {
    const frame = await loadPrototype(page);

    await frame.locator("#colorUsageLightSelect").selectOption("minimal");
    await frame.locator("#colorOverrideHeadline").selectOption("brand");
    await expect(frame.locator("#chipColorOverrideHeadline")).toHaveAttribute("title", /brand:/);

    await frame.locator("#colorUsageLightSelect").selectOption("editorial");
    await expect(frame.locator("#colorOverrideHeadline")).toHaveValue("auto");
    await expect(frame.locator("#colorOverrideScopeMeta")).toContainText("Editorial usage");

    await frame.locator("#colorUsageLightSelect").selectOption("minimal");
    await expect(frame.locator("#colorOverrideHeadline")).toHaveValue("brand");
    await expect(frame.locator("#colorOverrideScopeMeta")).toContainText("Minimal usage");
  });

  test("contrast fix pills resolve a forced failing headline contrast", async ({ page }) => {
    const frame = await loadPrototype(page);

    await frame.locator("#colorOverrideHeadline").selectOption("bg");
    await expect(frame.locator("#headlineContrastBadge")).toHaveClass(/fail|warn/);

    await frame.locator("#headlineContrastBadge").click();
    await expect(frame.locator("#headlineContrastBadge")).toHaveClass(/pass/);
    await expect(frame.locator("#colorOverrideHeadline")).toHaveValue("auto");
  });

  test("reset app settings preserves saved setups while resetting active settings", async ({ page }) => {
    const frame = await loadPrototype(page);

    await frame.locator("#presetNameInput").fill("Keep Me Through Reset");
    await frame.getByRole("button", { name: "Save Active Setup" }).click();
    await setRangeValue(frame, "#size", "82");
    await expect(frame.locator("#sizeVal")).toHaveText("82px");

    page.on("dialog", async (dialog) => {
      await dialog.accept();
    });
    await frame.getByRole("button", { name: "Reset App Settings" }).click();

    const reloadedFrame = page.frameLocator("iframe.prototype-frame");
    await expect(reloadedFrame.locator(".studio419-logo-svg")).toBeVisible();
    await expect(reloadedFrame.locator("#presetBrowserSelect")).toContainText("Keep Me Through Reset");
    await expect(reloadedFrame.locator("#sizeVal")).toHaveText("60px");
  });

  test("imports a preset library and updates the saved setup browser", async ({ page }) => {
    const frame = await loadPrototype(page);
    const payload = {
      exportType: "hero-preset-library",
      exportVersion: "phase2-test",
      presets: ["Imported Legacy Pair"]
    };

    await frame.locator("#presetLibraryFileInput").setInputFiles({
      name: "phase-2-preset-library.json",
      mimeType: "application/json",
      buffer: Buffer.from(JSON.stringify(payload))
    });

    await expect(frame.locator("#exportStatus")).toContainText("Imported 1 presets");
    await expect(frame.locator("#presetBrowserSelect")).toContainText("Imported Legacy Pair");
  });

  test("dragging the canvas pans the preview and stores canvas view", async ({ page }) => {
    const frame = await loadPrototype(page);
    const stage = frame.locator("#canvasStage");
    const initialTransform = await stage.evaluate((node) => (node as HTMLElement).style.transform);
    const box = await frame.locator("#canvasViewport").boundingBox();
    expect(box).not.toBeNull();

    const startX = (box?.x ?? 0) + (box?.width ?? 0) / 2;
    const startY = (box?.y ?? 0) + (box?.height ?? 0) / 2;
    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(startX + 80, startY + 45);
    await page.mouse.up();

    await expect
      .poll(async () => stage.evaluate((node) => (node as HTMLElement).style.transform))
      .not.toBe(initialTransform);
    const storedCanvasView = await frame.locator("body").evaluate(() => {
      return localStorage.getItem("fontPairCuratedHeroV178:canvasView");
    });
    expect(storedCanvasView).toContain('"x"');
  });
});
