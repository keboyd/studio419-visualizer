import { expect, test, type FrameLocator, type Locator, type Page } from "@playwright/test";
import { readFile } from "node:fs/promises";
import path from "node:path";

type VisualComparison = {
  actualHeight: number;
  actualWidth: number;
  diffRatio: number;
  meanDiff: number;
  referenceHeight: number;
  referenceWidth: number;
};

const referenceDir = path.join(process.cwd(), "reference", "screenshots");
const maxMeanDiff = 0.06;
const maxDiffRatio = 0.28;
const minDimensionRatio = 0.95;

async function loadPrototype(page: Page): Promise<FrameLocator> {
  await page.goto("/");
  const frame = page.frameLocator("iframe.prototype-frame");
  await expect(frame.locator(".studio419-logo-svg")).toBeVisible();
  return frame;
}

async function compareToReference(page: Page, actualPng: Buffer, referenceName: string) {
  const referencePng = await readFile(path.join(referenceDir, referenceName));

  return page.evaluate(
    async ({ actual, reference }): Promise<VisualComparison> => {
      async function imageDataFromBase64(base64: string) {
        const binary = atob(base64);
        const bytes = new Uint8Array(binary.length);
        for (let index = 0; index < binary.length; index += 1) {
          bytes[index] = binary.charCodeAt(index);
        }

        const bitmap = await createImageBitmap(new Blob([bytes], { type: "image/png" }));
        return bitmap;
      }

      const actualBitmap = await imageDataFromBase64(actual);
      const referenceBitmap = await imageDataFromBase64(reference);
      const width = referenceBitmap.width;
      const height = referenceBitmap.height;

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d", { willReadFrequently: true });
      if (!context) {
        throw new Error("Canvas 2D context unavailable for visual comparison.");
      }

      context.drawImage(referenceBitmap, 0, 0, width, height);
      const referencePixels = context.getImageData(0, 0, width, height).data;
      context.clearRect(0, 0, width, height);
      context.drawImage(actualBitmap, 0, 0, width, height);
      const actualPixels = context.getImageData(0, 0, width, height).data;

      let totalDiff = 0;
      let changedPixels = 0;
      const pixelCount = width * height;

      for (let index = 0; index < referencePixels.length; index += 4) {
        const redDiff = Math.abs(referencePixels[index] - actualPixels[index]);
        const greenDiff = Math.abs(referencePixels[index + 1] - actualPixels[index + 1]);
        const blueDiff = Math.abs(referencePixels[index + 2] - actualPixels[index + 2]);
        const averageDiff = (redDiff + greenDiff + blueDiff) / (3 * 255);
        totalDiff += averageDiff;

        if (averageDiff > 0.08) {
          changedPixels += 1;
        }
      }

      return {
        actualHeight: actualBitmap.height,
        actualWidth: actualBitmap.width,
        diffRatio: changedPixels / pixelCount,
        meanDiff: totalDiff / pixelCount,
        referenceHeight: referenceBitmap.height,
        referenceWidth: referenceBitmap.width
      };
    },
    {
      actual: actualPng.toString("base64"),
      reference: referencePng.toString("base64")
    }
  );
}

async function expectVisualMatch(page: Page, target: Page | Locator, referenceName: string) {
  const actualPng = await target.screenshot();
  const comparison = await compareToReference(page, actualPng, referenceName);

  expect(comparison.actualWidth, `${referenceName} width`).toBeGreaterThanOrEqual(
    Math.floor(comparison.referenceWidth * minDimensionRatio)
  );
  expect(comparison.actualHeight, `${referenceName} height`).toBeGreaterThanOrEqual(
    Math.floor(comparison.referenceHeight * minDimensionRatio)
  );
  expect(comparison.meanDiff, `${referenceName} mean visual diff`).toBeLessThan(maxMeanDiff);
  expect(comparison.diffRatio, `${referenceName} changed pixel ratio`).toBeLessThan(maxDiffRatio);
}

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => {
    localStorage.clear();
  });
});

test.describe("Phase 2 visual parity checks", () => {
  test("matches the desktop shell and header reference screenshots", async ({ page }) => {
    const frame = await loadPrototype(page);

    await expectVisualMatch(page, page, "desktop-full.png");
    await expectVisualMatch(page, frame.locator("header.topbar-v39"), "header.png");
  });

  test("matches inspector panel reference screenshots", async ({ page }) => {
    const frame = await loadPrototype(page);

    await expectVisualMatch(page, frame.locator('[data-major-group="color"]'), "brand-panel.png");
    await expectVisualMatch(page, frame.locator('[data-major-group="type"]'), "type-panel.png");
    await expectVisualMatch(page, frame.locator('[data-major-group="layout"]'), "layout-panel.png");
    await expectVisualMatch(page, frame.locator('[data-major-group="save"]'), "presets-panel.png");
    await expectVisualMatch(page, frame.locator('[data-major-group="about"]'), "about-panel.png");
  });

  test("matches the existing custom palette modal reference screenshot", async ({ page }) => {
    const frame = await loadPrototype(page);

    await frame.getByRole("button", { name: "Custom" }).click();
    await expect(frame.locator("#customPaletteModal")).toHaveAttribute("aria-hidden", "false");
    await expectVisualMatch(page, frame.locator("#customPaletteModal .modal"), "Build a custom palette.png");
  });
});
