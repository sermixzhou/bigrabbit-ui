# P0.5 Core Stabilization Report

Date: 2026-09-21

Scope: P0.5 only. This pass stabilizes existing foundations and intentionally does not start Phase 1 or Phase 2 feature work.

## Outcome

Chatty Bunny now presents itself as an **AI-ready React UI system for modern consumer apps**, while retaining its learning-product components as a first-class specialization. The public visual language remains unchanged; this pass focuses on interaction contracts, semantics, localization, regression safety, and packaging.

## Architecture decisions

### One overlay foundation

`Select`, `Combobox`, `DropdownMenu`, `Popover`, and `Tooltip` now share the internal `overlay-foundation` module. It is built on `@floating-ui/react` and provides:

- fixed-position portals with offset, flip, viewport shifting, and available-height sizing;
- automatic position updates during ancestor scroll, element resize, and layout movement;
- outside-press and Escape dismissal;
- non-modal focus management and focus return;
- one trigger composition path that clones a valid child and composes its ref, events, classes, ARIA attributes, and disabled behavior;
- no wrapper button and no duplicate trigger focus stop.

The five public components keep their own domain semantics and keyboard behavior. `DropdownMenu` retains menu-item roving focus; `Select` and `Combobox` retain listbox active-option navigation; `Tooltip` makes only a non-interactive intrinsic trigger itself focusable instead of adding a second element.

### Lightweight component localization

`ChattyBunnyProvider` owns component-system messages only. It supports `zh-CN` and `en`, plus partial message overrides. Message resolution is:

1. explicit component property;
2. provider message override;
3. selected locale dictionary.

The default locale is `zh-CN` to preserve existing behavior. Product and business content—titles, descriptions, options, brand copy, and lesson content—stays outside the provider. Brand defaults remain brand-owned rather than being folded into system localization.

### Choice semantics

`ChoiceGroup` is the semantic companion to `ChoiceCard`:

- single selection renders one `radiogroup`, radio children, roving tab focus, and Arrow/Home/End navigation;
- multiple selection renders one group containing checkbox children;
- controlled and uncontrolled values are supported;
- standalone `ChoiceCard` remains a native toggle button with `aria-pressed`, avoiding a radio or checkbox without an owning group.

## Dependencies and bundle impact

- Runtime: `@floating-ui/react@0.27.20`. It is declared as a package dependency and externalized from Chatty Bunny's library artifacts, preventing a private duplicate in every entry chunk. The package-owned ESM overlay foundation is 2.12 kB / 1.09 kB gzip. Consumer bundlers can tree-shake Floating UI according to the overlays actually imported.
- Development only: `@playwright/test@1.63.0`. It does not enter consumer artifacts.
- Provider shared ESM chunk: 4.02 kB / 1.73 kB gzip.
- ChoiceGroup shared ESM chunk: 10.49 kB / 3.36 kB gzip; this is a shared Rollup chunk and is not a clean incremental-cost measurement.
- CSS: 42.54 kB / 8.20 kB gzip.
- `npm pack --dry-run`: about 439 kB packed and 737 kB unpacked. Compared with the last known main-branch dry-run package size of about 427.8 kB, the packed increase is about 11.3 kB (roughly 2.6%), excluding repository-only Playwright screenshots.

## Regression foundation

Unit and interaction coverage includes provider precedence, trigger ref/handler/ARIA composition, the absence of nested buttons, standalone and grouped ChoiceCard semantics, keyboard selection, and existing component behavior.

Playwright visual regression is independent of Vitest and stores 24 baselines:

- viewports: 375×812, 430×932, 768×1024, and 1440×1000;
- states: default, selected, disabled, error, loading;
- open overlays: DropdownMenu, Popover, Tooltip, Select, and Combobox;
- collision fixtures place triggers at opposite viewport edges.

Commands:

```bash
npm run test:visual
npm run test:visual:update
```

Snapshot updates should be reviewed visually and generated in the same browser/platform environment used by the team.

## Verification

- `npm run typecheck` — passed.
- `npm test` — 10 files, 52 tests passed.
- `npm run test:visual` — 24 tests passed across four viewports.
- `npm run build:package` — ESM, CommonJS, CSS, and declarations built.
- `npm run build:site` — documentation site built.
- `npm pack --dry-run --json` — package contents and metadata validated.

## Compatibility and migration notes

There are no intended source-level breaking changes. Existing explicit labels and controlled component props remain valid, and the default locale preserves the previous Chinese UI strings.

Two semantic corrections are observable:

- A standalone `ChoiceCard` is now exposed as a toggle button instead of an orphaned radio/checkbox. Wrap related cards in `ChoiceGroup` when radio or checkbox semantics are required.
- The Select trigger follows the ARIA select-only combobox pattern and is discoverable as `role="combobox"`, not merely as a generic button.

Overlay content now renders in a portal. Code that relied on an overlay being a DOM descendant of its visual container should use roles, IDs, callbacks, or document-level queries instead. Visual styling and public component names are preserved.

## Explicitly deferred

No Phase 1 or Phase 2 component expansion is included. Additional product features, new component families, and broader design changes remain out of scope for this stabilization pass.
