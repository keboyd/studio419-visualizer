import { expect, test, type FrameLocator, type Page } from "@playwright/test";
import { studio419Logo } from "../../src/features/brand/studio419LogoData";
import {
  appTitle,
  brandReferenceDisclaimer,
  brandPanelRequiredLabels,
  chromeModeOptions,
  ctaRadiusOptions,
  elementColorOverrides,
  exportActions,
  exportFormats,
  headerControlGroups,
  heroContrastAuditTargets,
  heroLayoutOptions,
  layoutControlDefaults,
  layoutRangeControls,
  previewModes,
  presetBrowserActions,
  presetLibraryImportModes,
  responsiveTypeAnchors,
  responsiveTypeControls,
  savedSetupActions,
  viewportPresets,
  viewportRange
} from "../../src/features/visualizer/migrationContract";
import { inspectorPanels, prototypeRegions, prototypeSource } from "../../src/features/parity/prototypeManifest";

async function loadPrototype(page: Page): Promise<FrameLocator> {
  await page.goto("/");
  await expect(page.locator(`[data-migration-phase="prototype-host"]`)).toBeVisible();
  await expect(page.locator(`iframe.${prototypeRegions.shell.frameClassName}`)).toHaveAttribute(
    "src",
    prototypeSource.path
  );
  await expect(page.locator(`iframe.${prototypeRegions.shell.frameClassName}`)).toHaveAttribute(
    "title",
    prototypeSource.title
  );

  const frame = page.frameLocator(`iframe.${prototypeRegions.shell.frameClassName}`);
  await expect(frame.locator(`.${studio419Logo.className}`)).toBeVisible();
  return frame;
}

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => {
    localStorage.clear();
  });
});

test.describe("Phase 3 native migration contracts", () => {
  test("mounts the native header shadow without changing the visible parity shell", async ({ page }) => {
    await page.goto("/");

    const shadow = page.locator('[data-migration-shadow="native-regions"]');
    await expect(shadow).toBeHidden();
    await expect(shadow.locator('[data-native-region="header"]')).toHaveCount(1);
    await expect(shadow.locator('[data-native-region="canvas-controls"]')).toHaveCount(1);
    await expect(shadow.locator('[data-native-region="inspector"]')).toHaveCount(1);
    await expect(shadow.locator(".app-title-v43 strong")).toHaveText(appTitle);
    await expect(shadow.locator(`.${studio419Logo.className} path`)).toHaveCount(studio419Logo.paths.length);
    await expect(page.locator(`iframe.${prototypeRegions.shell.frameClassName}`)).toBeVisible();
  });

  test("hydrates native header options from the prototype data source", async ({ page }) => {
    const frame = await loadPrototype(page);
    const shadow = page.locator('[data-migration-shadow="native-regions"]');

    const prototypeFontCategories = await frame.locator("#headerCategorySelect option").evaluateAll((options) =>
      options.slice(0, 5).map((option) => option.textContent)
    );
    const nativeFontCategories = await shadow.locator("#nativeHeaderCategorySelect option").evaluateAll((options) =>
      options.slice(0, 5).map((option) => option.textContent)
    );

    const prototypeFontPairs = await frame.locator("#headerPairSelect option").evaluateAll((options) =>
      options.slice(0, 5).map((option) => option.textContent)
    );
    const nativeFontPairs = await shadow.locator("#nativeHeaderPairSelect option").evaluateAll((options) =>
      options.slice(0, 5).map((option) => option.textContent)
    );

    const prototypePalettes = await frame.locator("#paletteSelect option").evaluateAll((options) =>
      options.slice(0, 5).map((option) => option.textContent)
    );
    const nativePalettes = await shadow.locator("#nativePaletteSelect option").evaluateAll((options) =>
      options.slice(0, 5).map((option) => option.textContent)
    );

    expect(nativeFontCategories).toEqual(prototypeFontCategories);
    expect(nativeFontPairs).toEqual(prototypeFontPairs);
    expect(nativePalettes).toEqual(prototypePalettes);
  });

  test("updates hidden native header dependent selects and counters", async ({ page }) => {
    await page.goto("/");
    const shadow = page.locator('[data-migration-shadow="native-regions"]');

    await shadow.locator("#nativeHeaderCategorySelect").evaluate((node) => {
      const select = node as HTMLSelectElement;
      select.selectedIndex = 1;
      select.dispatchEvent(new Event("change", { bubbles: true }));
    });

    await expect(shadow.locator("#nativeHeaderPairSelect option").first()).toHaveText("1. Playfair Display & Source Sans Pro");
    await expect(shadow.locator("#nativeCounter")).toHaveText("1 / 91");

    await shadow.locator("#nativeHeaderPairSelect").evaluate((node) => {
      const select = node as HTMLSelectElement;
      select.selectedIndex = 2;
      select.dispatchEvent(new Event("change", { bubbles: true }));
    });

    await expect(shadow.locator("#nativeCounter")).toHaveText("3 / 91");

    await shadow.locator("#nativeHeaderPaletteCategorySelect").evaluate((node) => {
      const select = node as HTMLSelectElement;
      select.value = "Brand-Inspired Systems";
      select.dispatchEvent(new Event("change", { bubbles: true }));
    });
    await expect(shadow.locator("#nativePaletteSelect option").first()).toContainText("Brand /");
    await expect(shadow.locator("#nativePaletteCounter")).toHaveText(/1 \/ \d+/);
  });

  test("updates hidden native canvas viewport, zoom, and preview mode state", async ({ page }) => {
    await page.goto("/");
    const shadow = page.locator('[data-migration-shadow="native-regions"]');

    await expect(shadow.locator("#nativeViewportWidthVal")).toHaveText(`${viewportRange.defaultWidth}px`);
    await shadow.locator('button[data-viewport="mobile"]').evaluate((node) => {
      (node as HTMLButtonElement).click();
    });
    await expect(shadow.locator("#nativeViewportWidthVal")).toHaveText("390px");
    await expect(shadow.locator('button[data-viewport="mobile"]')).toHaveClass(/active/);
    await expect(shadow.locator("#nativeViewportWidth")).toHaveJSProperty("value", "390");

    const mobileProgress = await shadow.locator("#nativeViewportWidth").evaluate((node) => {
      return (node as HTMLElement).style.getPropertyValue("--range-progress");
    });
    expect(mobileProgress.trim()).toBe("100%");

    await shadow.locator("#nativeZoomInBtn").evaluate((node) => {
      (node as HTMLButtonElement).click();
    });
    await expect(shadow.locator("#nativeZoomResetBtn")).toHaveText("110%");
    await shadow.locator("#nativeZoomResetBtn").evaluate((node) => {
      (node as HTMLButtonElement).click();
    });
    await expect(shadow.locator("#nativeZoomResetBtn")).toHaveText("100%");

    await shadow.locator("#nativeCanvasStage").dispatchEvent("pointerdown", { clientX: 10, clientY: 20 });
    await expect(shadow.locator("#nativeCanvasStage")).toHaveAttribute("data-is-panning", "true");
    await shadow.locator("#nativeCanvasStage").dispatchEvent("pointermove", { clientX: 35, clientY: 48 });
    await expect(shadow.locator("#nativeCanvasStage")).toHaveAttribute("data-pan-x", "25");
    await expect(shadow.locator("#nativeCanvasStage")).toHaveAttribute("data-pan-y", "28");
    await shadow.locator("#nativeCanvasStage").dispatchEvent("pointerup", { clientX: 35, clientY: 48 });
    await expect(shadow.locator("#nativeCanvasStage")).toHaveAttribute("data-is-panning", "false");

    await shadow.locator("#nativeCanvasStage").dispatchEvent("wheel", { deltaY: -1 });
    await expect(shadow.locator("#nativeZoomResetBtn")).toHaveText("110%");

    await shadow.locator("#nativeOverlayToggleBtn").evaluate((node) => {
      (node as HTMLButtonElement).click();
    });
    await expect(shadow.locator("#nativeOverlayToggleBtn")).toHaveText("Hide Bounds");
    await expect(shadow.locator('[data-native-region="hero-preview"]')).toHaveAttribute("data-bounds-visible", "true");

    await shadow.locator("#nativeBrandBtn").evaluate((node) => {
      (node as HTMLButtonElement).click();
    });
    await expect(shadow.locator("#nativeBrandBtn")).toHaveClass(/active/);
    await expect(shadow.locator('[data-native-region="hero-preview"]')).toHaveAttribute("data-preview-mode", "Brand");
  });

  test("updates hidden native hero responsive type and padding from viewport width", async ({ page }) => {
    await page.goto("/");
    const shadow = page.locator('[data-migration-shadow="native-regions"]');
    const hero = shadow.locator('[data-native-region="hero-preview"]');

    await expect(hero).toHaveAttribute("data-viewport-width", "1440");
    await expect(hero).toHaveCSS("--hero-headline-size", "60px");
    await expect(hero).toHaveCSS("--hero-body-size", "16px");
    await expect(hero).toHaveCSS("--hero-padding-x", "48px");

    await shadow.locator('button[data-viewport="mobile"]').evaluate((node) => {
      (node as HTMLButtonElement).click();
    });

    await expect(hero).toHaveAttribute("data-viewport-width", "390");
    await expect(hero).toHaveCSS("--hero-headline-size", "40px");
    await expect(hero).toHaveCSS("--hero-body-size", "16px");
    await expect(hero).toHaveCSS("--hero-padding-x", "36px");
    await expect(shadow.locator("#nativePaddingLabelX")).toHaveText("padding-x 36px");

    await shadow.locator('button[data-viewport="retina"]').evaluate((node) => {
      (node as HTMLButtonElement).click();
    });

    await expect(hero).toHaveAttribute("data-viewport-width", "2560");
    await expect(hero).toHaveCSS("--hero-headline-size", "71px");
    await expect(hero).toHaveCSS("--hero-padding-x", "48px");
  });

  test("keeps the extracted Studio419 logo geometry identical to the prototype", async ({ page }) => {
    const frame = await loadPrototype(page);
    const prototypeLogo = frame.locator(`.${studio419Logo.className}`);

    await expect(prototypeLogo).toHaveAttribute("viewBox", studio419Logo.viewBox);

    const prototypePaths = await prototypeLogo.locator("path").evaluateAll((paths) =>
      paths.map((path) => path.getAttribute("d"))
    );

    expect(prototypePaths).toEqual([...studio419Logo.paths]);
  });

  test("keeps header, inspector, and canvas controls aligned to the React migration contract", async ({ page }) => {
    const frame = await loadPrototype(page);

    await expect(frame.locator(".app-title-v43 strong")).toHaveText(appTitle);

    for (const group of headerControlGroups) {
      const headerGroup = frame.locator(group.selector);
      await expect(headerGroup.locator(".header-group-label-v183")).toHaveText(group.label);
      for (const controlId of group.controls) {
        await expect(headerGroup.locator(`#${controlId}`)).toBeVisible();
      }
    }

    for (const option of chromeModeOptions) {
      await expect(frame.locator("#chromeModeSelect option").filter({ hasText: option })).toHaveCount(1);
    }

    for (const panel of inspectorPanels) {
      await expect(frame.locator(`${panel.selector} > .major-group-header strong`)).toHaveText(panel.label);
    }

    for (const preset of viewportPresets) {
      await expect(frame.locator(`button[data-viewport="${preset.value}"]`)).toHaveText(preset.label);
    }

    for (const mode of previewModes) {
      await expect(frame.getByRole("button", { name: mode })).toBeVisible();
    }
  });

  test("keeps saved setup actions and export format labels aligned to the migration contract", async ({ page }) => {
    const frame = await loadPrototype(page);

    await expect(frame.locator("#presetBrowserLabel")).toHaveText("Preview Saved Setup");
    await expect(frame.locator("#favorites")).toBeHidden();

    for (const action of savedSetupActions) {
      await expect(frame.getByRole("button", { name: action })).toBeVisible();
    }

    for (const format of exportFormats) {
      await expect(frame.locator("#exportFormatSelect option").filter({ hasText: format })).toHaveCount(1);
    }
  });

  test("keeps hidden native inspector panel order and required controls aligned to the migration contract", async ({ page }) => {
    await page.goto("/");
    const shadow = page.locator('[data-migration-shadow="native-regions"]');

    const nativePanelLabels = await shadow.locator('[data-native-inspector-panel] .major-group-header strong').evaluateAll(
      (labels) => labels.map((label) => label.textContent)
    );

    expect(nativePanelLabels).toEqual(inspectorPanels.map((panel) => panel.label));

    await expect(shadow.locator("label").filter({ hasText: "Color Usage by Mode" })).toHaveCount(1);
    for (const label of brandPanelRequiredLabels) {
      await expect(shadow.locator(`label:text-is("${label}")`)).toHaveCount(1);
    }
    for (const scope of ["Light", "Dark", "Brand"]) {
      await expect(shadow.locator(`label:text-is("${scope}")`)).toHaveCount(1);
    }
    for (const override of [
      "Hero Background",
      "Eyebrow",
      "Headline",
      "Body",
      "CTA Background",
      "CTA Text",
      "Secondary Link"
    ]) {
      await expect(shadow.locator(`label:text-is("${override}")`)).toHaveCount(1);
    }

    await expect(shadow.locator('label:text-is("Hero Layout")')).toHaveCount(1);
    await expect(shadow.locator('label:text-is("CTA → Text Link Gap")')).toHaveCount(1);
    await expect(shadow.locator('label:text-is("Preview Saved Setup")')).toHaveCount(1);
    await expect(shadow.locator('label:text-is("Preset Name")')).toHaveCount(1);
    await expect(shadow.locator('label:text-is("Import Mode")')).toHaveCount(1);
    await expect(shadow.locator('label:text-is("Export Source")')).toHaveCount(1);
    await expect(shadow.locator('label:text-is("Implementation Preview")')).toHaveCount(1);

    for (const format of exportFormats) {
      await expect(shadow.locator("#nativeExportFormatSelect option").filter({ hasText: format })).toHaveCount(1);
    }
  });

  test("covers the final hidden native parity control inventory", async ({ page }) => {
    await page.goto("/");
    const shadow = page.locator('[data-migration-shadow="native-regions"]');

    for (const preset of viewportPresets) {
      await expect(shadow.locator(`button[data-viewport="${preset.value}"]`)).toHaveText(preset.label);
    }

    for (const mode of previewModes) {
      await expect(shadow.locator(`#native${mode}Btn`)).toHaveText(mode);
    }

    await expect(shadow.locator("#nativeCanvasStage")).toHaveAttribute("data-pan-x", "0");
    await expect(shadow.locator("#nativeCanvasStage")).toHaveAttribute("data-pan-y", "0");
    await expect(shadow.locator("#nativeOverlayToggleBtn")).toHaveText("Bounds");

    for (const control of responsiveTypeControls) {
      await expect(shadow.locator(`[data-native-type-control="${control.id}"]`)).toHaveCount(1);
      await expect(shadow.locator(`[data-native-type-output="${control.id}"]`)).toHaveText(`${control.value}px`);
    }

    for (const control of layoutRangeControls) {
      await expect(shadow.locator(`[data-native-layout-control="${control.id}"]`)).toHaveCount(1);
      await expect(shadow.locator(`[data-native-layout-output="${control.id}"]`)).toHaveText(`${control.value}px`);
    }

    for (const override of elementColorOverrides) {
      await expect(shadow.locator(`[data-native-color-override="${override}"]`)).toHaveCount(1);
      await expect(shadow.locator(`[data-override-chip="${override}"]`)).toHaveCount(1);
    }

    for (const target of heroContrastAuditTargets) {
      await expect(shadow.locator(`[data-native-contrast-target="${target}"]`)).toContainText(target);
    }

    for (const action of [...savedSetupActions, ...exportActions]) {
      await expect(shadow.locator("button").filter({ hasText: action })).toHaveCount(1);
    }

    await expect(shadow.locator("#nativePaletteSourceMeta")).toContainText(brandReferenceDisclaimer);
    await expect(shadow.locator("#nativePaletteChipGrid [data-native-palette-chip]")).toHaveCount(6);
  });

  test("hydrates hidden native Type panel and preserves responsive type controls", async ({ page }) => {
    const frame = await loadPrototype(page);
    const shadow = page.locator('[data-migration-shadow="native-regions"]');

    const prototypeFontCategories = await frame.locator("#headerCategorySelect option").evaluateAll((options) =>
      options.slice(0, 4).map((option) => option.textContent)
    );
    const nativeFontCategories = await shadow.locator("#nativeCategorySelect option").evaluateAll((options) =>
      options.slice(0, 4).map((option) => option.textContent)
    );
    expect(nativeFontCategories).toEqual(prototypeFontCategories);

    await expect(shadow.locator('[data-native-type-output="headlineDesktop"]')).toHaveText(
      `${responsiveTypeAnchors.headlineDesktop}px`
    );
    await expect(shadow.locator('[data-native-type-output="headlineMobile"]')).toHaveText(
      `${responsiveTypeAnchors.headlineMobile}px`
    );
    await expect(shadow.locator("#nativeResponsiveTypeMeta")).toContainText("40px → 60px headline");

    await shadow.locator('[data-native-type-control="headlineDesktop"]').evaluate((node) => {
      const input = node as HTMLInputElement;
      input.value = "72";
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.dispatchEvent(new Event("change", { bubbles: true }));
    });
    await expect(shadow.locator('[data-native-type-output="headlineDesktop"]')).toHaveText("72px");
    await expect(shadow.locator("#nativeResponsiveTypeMeta")).toContainText("40px → 72px headline");

    await shadow.locator("#nativeCategorySelect").evaluate((node) => {
      const select = node as HTMLSelectElement;
      select.selectedIndex = 1;
      select.dispatchEvent(new Event("change", { bubbles: true }));
    });
    await expect(shadow.locator("#nativePairSelect option").first()).toHaveText("1. Playfair Display & Source Sans Pro");
    await expect(shadow.locator("#nativeTypePairCounter")).toHaveText("1 / 91");
  });

  test("shares hidden native type selection state between header and Type panel", async ({ page }) => {
    await page.goto("/");
    const shadow = page.locator('[data-migration-shadow="native-regions"]');

    await shadow.locator("#nativeCategorySelect").evaluate((node) => {
      const select = node as HTMLSelectElement;
      select.selectedIndex = 1;
      select.dispatchEvent(new Event("change", { bubbles: true }));
    });
    await expect(shadow.locator("#nativeHeaderCategorySelect")).toHaveValue("Editorial & High-Contrast");
    await expect(shadow.locator("#nativeHeaderPairSelect option").first()).toHaveText("1. Playfair Display & Source Sans Pro");

    await shadow.locator("#nativeHeaderPairSelect").evaluate((node) => {
      const select = node as HTMLSelectElement;
      select.selectedIndex = 2;
      select.dispatchEvent(new Event("change", { bubbles: true }));
    });
    await expect(shadow.locator("#nativePairSelect")).toHaveValue("DM Serif Display & DM Sans");
    await expect(shadow.locator("#nativeTypePairCounter")).toHaveText("3 / 91");
  });

  test("preserves hidden native Layout panel order, labels, and stateful controls", async ({ page }) => {
    await page.goto("/");
    const shadow = page.locator('[data-migration-shadow="native-regions"]');

    const layoutFieldLabels = await shadow
      .locator('[data-native-inspector-panel="layout"] .field > label')
      .evaluateAll((labels) => labels.map((label) => label.textContent));
    expect(layoutFieldLabels).toEqual([
      "Hero Layout",
      ...layoutRangeControls.map((control) => control.label),
      "CTA Radius"
    ]);

    const heroLayoutField = shadow.locator('[data-native-inspector-panel="layout"] .field').first();
    const heroLayoutChildTags = await heroLayoutField.locator(":scope > *").evaluateAll((children) =>
      children.map((child) => child.tagName)
    );
    expect(heroLayoutChildTags.slice(0, 2)).toEqual(["LABEL", "DIV"]);

    for (const option of heroLayoutOptions) {
      await expect(shadow.locator(`[data-native-layout-option="${option}"]`)).toHaveCount(1);
    }
    await expect(shadow.locator('[data-native-layout-option="Left"]')).toHaveClass(/active/);
    await shadow.locator('[data-native-layout-option="Centered"]').evaluate((node) => {
      (node as HTMLButtonElement).click();
    });
    await expect(shadow.locator('[data-native-layout-option="Centered"]')).toHaveClass(/active/);

    await expect(shadow.locator('[data-native-layout-output="heroPaddingXDesktop"]')).toHaveText(
      `${layoutControlDefaults.heroPaddingXDesktop}px`
    );
    await shadow.locator('[data-native-layout-control="heroPaddingXDesktop"]').evaluate((node) => {
      const input = node as HTMLInputElement;
      input.value = "64";
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.dispatchEvent(new Event("change", { bubbles: true }));
    });
    await expect(shadow.locator('[data-native-layout-output="heroPaddingXDesktop"]')).toHaveText("64px");

    for (const option of ctaRadiusOptions) {
      await expect(shadow.locator(`[data-native-cta-radius="${option}"]`)).toHaveCount(1);
    }
    await expect(shadow.locator('[data-native-cta-radius="Circle"]')).toHaveClass(/active/);
    await shadow.locator('[data-native-cta-radius="Square"]').evaluate((node) => {
      (node as HTMLButtonElement).click();
    });
    await expect(shadow.locator('[data-native-cta-radius="Square"]')).toHaveClass(/active/);
  });

  test("scopes hidden native Brand overrides by Color Usage and resets active usage", async ({ page }) => {
    await page.goto("/");
    const shadow = page.locator('[data-migration-shadow="native-regions"]');

    await expect(shadow.locator("#nativeColorUsageLightSelect")).toHaveValue("Minimal");
    await expect(shadow.locator("#nativeColorUsageDarkSelect")).toHaveValue("Minimal");
    await expect(shadow.locator("#nativeColorUsageBrandSelect")).toHaveValue("Campaign");

    await shadow.locator('[data-native-color-override="Headline"]').evaluate((node) => {
      const select = node as HTMLSelectElement;
      select.value = "Brand";
      select.dispatchEvent(new Event("change", { bubbles: true }));
    });
    await expect(shadow.locator('[data-native-color-override="Headline"]')).toHaveValue("Brand");
    await expect(shadow.locator('[data-override-chip="Headline"]')).toHaveAttribute("title", "Headline: Brand");

    await shadow.locator("#nativeColorUsageLightSelect").evaluate((node) => {
      const select = node as HTMLSelectElement;
      select.value = "Editorial";
      select.dispatchEvent(new Event("change", { bubbles: true }));
    });
    await expect(shadow.locator("#nativeColorOverrideScopeMeta")).toContainText("Editorial usage");
    await expect(shadow.locator('[data-native-color-override="Headline"]')).toHaveValue("Auto");

    await shadow.locator("#nativeColorUsageLightSelect").evaluate((node) => {
      const select = node as HTMLSelectElement;
      select.value = "Minimal";
      select.dispatchEvent(new Event("change", { bubbles: true }));
    });
    await expect(shadow.locator('[data-native-color-override="Headline"]')).toHaveValue("Brand");

    await shadow.locator("#nativeResetColorOverridesBtn").evaluate((node) => {
      (node as HTMLButtonElement).click();
    });
    await expect(shadow.locator('[data-native-color-override="Headline"]')).toHaveValue("Auto");
  });

  test("preserves hidden native saved setup workflow state", async ({ page }) => {
    await page.goto("/");
    const shadow = page.locator('[data-migration-shadow="native-regions"]');

    await expect(shadow.locator("#nativePresetBrowserLabel")).toHaveText("Preview Saved Setup");
    await expect(shadow.locator("#nativePresetBrowserSelect option")).toHaveText("No saved setups yet");
    await expect(shadow.locator("#nativeFavCount")).toHaveText("0 presets");
    await expect(shadow.locator("#nativeFavoriteLimitMeta")).toHaveText("0 / 20 saved");

    for (const action of presetBrowserActions) {
      await expect(shadow.locator("button").filter({ hasText: action })).toHaveCount(1);
    }

    await shadow.locator("#nativePresetNameInput").evaluate((node) => {
      const input = node as HTMLInputElement;
      input.value = "Native Saved Setup";
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.dispatchEvent(new Event("change", { bubbles: true }));
    });
    await shadow.locator("button").filter({ hasText: "Save Active Setup" }).evaluate((node) => {
      (node as HTMLButtonElement).click();
    });
    await expect(shadow.locator("#nativePresetBrowserSelect option")).toHaveText("Native Saved Setup");
    await expect(shadow.locator("#nativeFavoriteSelect option").last()).toHaveText("Native Saved Setup");
    await expect(shadow.locator("#nativeFavCount")).toHaveText("1 presets");
    await expect(shadow.locator("#nativeFavoriteLimitMeta")).toHaveText("1 / 20 saved");

    await shadow.locator("button").filter({ hasText: "Duplicate" }).evaluate((node) => {
      (node as HTMLButtonElement).click();
    });
    await expect(shadow.locator("#nativePresetBrowserSelect option")).toHaveCount(2);
    await expect(shadow.locator("#nativePresetBrowserSelect option").last()).toHaveText("Native Saved Setup Copy");

    await shadow.locator("button").filter({ hasText: "Previous" }).evaluate((node) => {
      (node as HTMLButtonElement).click();
    });
    await expect(shadow.locator("#nativePresetNameInput")).toHaveValue("Native Saved Setup");

    await shadow.locator("button").filter({ hasText: "Next" }).evaluate((node) => {
      (node as HTMLButtonElement).click();
    });
    await expect(shadow.locator("#nativePresetNameInput")).toHaveValue("Native Saved Setup Copy");

    await shadow.locator("button").filter({ hasText: "Delete" }).evaluate((node) => {
      (node as HTMLButtonElement).click();
    });
    await expect(shadow.locator("#nativePresetBrowserSelect option")).toHaveCount(1);

    await shadow.locator("button").filter({ hasText: "Clear Presets" }).evaluate((node) => {
      (node as HTMLButtonElement).click();
    });
    await expect(shadow.locator("#nativePresetBrowserSelect option")).toHaveText("No saved setups yet");
    await expect(shadow.locator("#nativeFavCount")).toHaveText("0 presets");
  });

  test("preserves hidden native preset library and export package controls", async ({ page }) => {
    await page.goto("/");
    const shadow = page.locator('[data-migration-shadow="native-regions"]');

    for (const mode of presetLibraryImportModes) {
      await expect(shadow.locator("#nativePresetImportMode option").filter({ hasText: mode.label })).toHaveCount(1);
    }

    for (const action of exportActions) {
      await expect(shadow.locator("button").filter({ hasText: action })).toHaveCount(1);
    }

    await expect(shadow.locator("#nativeTokenOutput")).toContainText("Responsive type anchors");
    await expect(shadow.locator("#nativeTokenOutput")).toContainText("Hero X Padding behavior");
    await expect(shadow.locator("#nativeTokenOutput")).toContainText("Color usage by mode");
    await expect(shadow.locator("#nativeTokenOutput")).toContainText("Manual color overrides");
    await expect(shadow.locator("#nativeTokenOutput")).toContainText("Multi-mode color snapshots");
    await expect(shadow.locator("#nativeTokenOutput")).toContainText(brandReferenceDisclaimer);

    await shadow.locator("#nativeExportFormatSelect").evaluate((node) => {
      const select = node as HTMLSelectElement;
      select.value = "json";
      select.dispatchEvent(new Event("change", { bubbles: true }));
    });
    await expect(shadow.locator("#nativeExportStatus")).toHaveText("Previewing JSON.");
    await expect(shadow.locator("#nativeTokenOutput")).toContainText('"responsiveType"');
    await expect(shadow.locator("#nativeTokenOutput")).toContainText('"heroPadding"');

    await shadow.locator("#nativePresetImportMode").evaluate((node) => {
      const select = node as HTMLSelectElement;
      select.value = "replace";
      select.dispatchEvent(new Event("change", { bubbles: true }));
    });
    await shadow.locator("button").filter({ hasText: "Import Preset Library" }).evaluate((node) => {
      (node as HTMLButtonElement).click();
    });
    await expect(shadow.locator("#nativeExportStatus")).toHaveText("Import mode: replace.");

    await shadow.locator("button").filter({ hasText: "Reset App Settings" }).evaluate((node) => {
      (node as HTMLButtonElement).click();
    });
    await expect(shadow.locator("#nativeExportFormatSelect")).toHaveValue("ai");
    await expect(shadow.locator("#nativePresetImportMode")).toHaveValue("merge");
  });
});
