import { expect, test, type FrameLocator, type Page } from "@playwright/test";

async function loadPrototype(page: Page): Promise<FrameLocator> {
  await page.goto("/");
  const frame = page.frameLocator("iframe.prototype-frame");
  await expect(frame.locator(".studio419-logo-svg")).toBeVisible();
  return frame;
}

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => {
    localStorage.clear();
  });
});

async function setRangeValue(frame: FrameLocator, selector: string, value: string) {
  await frame.locator(selector).evaluate((node, nextValue) => {
    const input = node as HTMLInputElement;
    input.value = String(nextValue);
    input.dispatchEvent(new Event("input", { bubbles: true }));
  }, value);
}

test.describe("Phase 2 parity smoke tests", () => {
  test("loads the parity prototype with required shell regions", async ({ page }) => {
    const frame = await loadPrototype(page);

    await expect(frame.locator(".logo-slot-studio419 .studio419-logo-svg")).toBeVisible();
    await expect(frame.locator(".app-title-v43 strong")).toHaveText("Font Pair & Palette Visualizer");
    await expect(frame.locator(".header-preview-controls-v44")).toBeVisible();
    await expect(frame.locator(".header-ui-controls-v183")).toBeVisible();
    await expect(frame.locator("#canvasViewport")).toBeVisible();
    await expect(frame.locator("aside.inspector-v39")).toBeVisible();

    await expect(frame.locator('[data-major-group="color"] > .major-group-header strong')).toHaveText("Brand");
    await expect(frame.locator('[data-major-group="type"] > .major-group-header strong')).toHaveText("Type");
    await expect(frame.locator('[data-major-group="layout"] > .major-group-header strong')).toHaveText("Layout");
    await expect(frame.locator('[data-major-group="save"] > .major-group-header strong')).toHaveText("Presets & Export");
    await expect(frame.locator('[data-major-group="about"] > .major-group-header strong')).toHaveText("About");

    await expect(frame.locator("#favorites")).toBeHidden();
    await expect(frame.locator("#presetBrowserSelect")).toBeVisible();
  });

  test("canvas device presets, reversed viewport slider, zoom, and mode controls respond", async ({ page }) => {
    const frame = await loadPrototype(page);

    await frame.getByRole("button", { name: "Mobile" }).click();
    await expect(frame.locator("#viewportWidthVal")).toHaveText("390px");
    await expect(frame.locator("#canvasStage")).toHaveAttribute("data-viewport", "mobile");
    await expect(frame.locator('button[data-viewport="mobile"]')).toHaveClass(/active/);

    const sliderProgress = await frame.locator("#viewportWidth").evaluate((node) => {
      return (node as HTMLElement).style.getPropertyValue("--range-progress");
    });
    expect(sliderProgress.trim()).toBe("100%");

    await frame.getByRole("button", { name: "Retina / 5K" }).click();
    await expect(frame.locator("#viewportWidthVal")).toHaveText("2560px");
    await expect(frame.locator("#canvasStage")).toHaveAttribute("data-viewport", "retina");

    await frame.getByRole("button", { name: "+" }).first().click();
    await expect(frame.locator("#zoomResetBtn")).toHaveText("110%");
    await frame.locator("#zoomResetBtn").click();
    await expect(frame.locator("#zoomResetBtn")).toHaveText("100%");

    await frame.getByRole("button", { name: "Dark" }).click();
    await expect(frame.locator("#darkBtn")).toHaveClass(/active/);
    await frame.getByRole("button", { name: "Brand" }).click();
    await expect(frame.locator("#brandBtn")).toHaveClass(/active/);
  });

  test("responsive type, Hero X Padding, and layout controls update the preview", async ({ page }) => {
    const frame = await loadPrototype(page);

    await setRangeValue(frame, "#viewportWidth", "390");
    await expect(frame.locator("#viewportWidthVal")).toHaveText("390px");
    await expect(frame.locator("#canvasStage")).toHaveAttribute("data-viewport", "mobile");

    await setRangeValue(frame, "#size", "80");
    await expect(frame.locator("#sizeVal")).toHaveText("80px");
    await expect(frame.locator("#typeScalingMeta")).toContainText("40px mobile → 80px desktop");

    await setRangeValue(frame, "#heroPadX", "80");
    await expect(frame.locator("#heroPadXVal")).toHaveText("80px");
    await expect(frame.locator("#paddingLabelX")).toContainText("padding-x");

    await frame.getByRole("button", { name: "Centered" }).click();
    await expect(frame.locator("#layoutCenterBtn")).toHaveClass(/active/);
    await expect(frame.locator(".headline")).toHaveCSS("text-align", "center");

    await setRangeValue(frame, "#ctaLinkGap", "40");
    await expect(frame.locator("#ctaLinkGapVal")).toHaveText("40px");

    await frame.getByRole("button", { name: "Square" }).click();
    await expect(frame.locator("#ctaRadiusSquareBtn")).toHaveClass(/active/);
    await expect(frame.locator("#cta")).toHaveCSS("border-radius", "0px");
  });

  test("saved setup dropdown workflow and export formats remain available", async ({ page }) => {
    const frame = await loadPrototype(page);

    await frame.locator("#presetNameInput").fill("Phase 2 Smoke Setup");
    await frame.getByRole("button", { name: "Save Active Setup" }).click();
    await expect(frame.locator("#favCount")).toHaveText("1 preset");
    await expect(frame.locator("#presetBrowserSelect")).toContainText("Phase 2 Smoke Setup");

    await frame.getByRole("button", { name: "Duplicate" }).click();
    await expect(frame.locator("#favCount")).toHaveText("2 presets");

    await frame.getByRole("button", { name: "Previous" }).click();
    await frame.getByRole("button", { name: "Next" }).click();

    await frame.locator("#exportFormatSelect").selectOption("json");
    await frame.getByRole("button", { name: "Copy Export" }).click();
    await expect(frame.locator("#tokenOutput")).toHaveValue(/"exportType": "hero-design-preset"/);

    await frame.locator("#exportFormatSelect").selectOption("figma");
    await frame.getByRole("button", { name: "Copy Export" }).click();
    await expect(frame.locator("#tokenOutput")).toHaveValue(/FIGMA DESIGN NOTES/);
  });

  test("existing custom palette modal matches the Phase 1 parity target", async ({ page }) => {
    const frame = await loadPrototype(page);

    await frame.getByRole("button", { name: "Custom" }).click();
    await expect(frame.locator("#customPaletteModal")).toHaveAttribute("aria-hidden", "false");
    await expect(frame.getByRole("heading", { name: "Build a custom palette" })).toBeVisible();
    await expect(frame.locator("#customPaletteName")).toHaveValue("My Custom Palette");
    await expect(frame.getByRole("button", { name: "Load Active Palette" })).toBeVisible();
    await expect(frame.getByRole("button", { name: "Save Palette" })).toBeVisible();
    await expect(frame.getByRole("button", { name: "Reset Defaults" })).toBeVisible();
    await expect(frame.getByRole("button", { name: "Clear Saved Custom Palettes" })).toBeVisible();
  });
});
