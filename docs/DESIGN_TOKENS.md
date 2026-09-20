# Chatty Bunny Design Tokens V2

Chatty Bunny exposes a stable semantic color contract through `--cb-*` CSS custom properties. Import the package stylesheet once, then override tokens after the import:

```css
@import "chatty-bunny/styles.css";

:root {
  --cb-primary: #7c3aed;
  --cb-primary-hover: #6d28d9;
  --cb-primary-pressed: #5b21b6;
  --cb-primary-soft: #ede9fe;
  --cb-primary-subtle: #f5f3ff;
  --cb-primary-border: #ddd6fe;
  --cb-focus-ring: rgba(124, 58, 237, 0.2);
}
```

All tokens in this document are public and may be overridden. Override semantic tokens by role rather than copying component selectors. The default values preserve the original Chatty Bunny appearance.

## Brand

| Token | Meaning | Default | Typical use | Override |
| --- | --- | --- | --- | --- |
| `--cb-primary` | Primary brand/action color | `#0a7cff` | Primary actions, selected controls | Yes |
| `--cb-primary-hover` | Primary hover color | `#006fe8` | Pointer hover state | Yes |
| `--cb-primary-pressed` | Primary pressed color | `#005fc7` | Active/pressed state | Yes |
| `--cb-primary-soft` | Stronger primary-tinted surface | `#e6f1ff` | Progress tracks, selected indicators | Yes |
| `--cb-primary-subtle` | Light primary-tinted surface | `#f2f7ff` | Information surfaces, hover backgrounds | Yes |
| `--cb-primary-border` | Primary-tinted border | `#cfe4ff` | Informational outlines and controls | Yes |

## Surface and text

| Token | Meaning | Default | Typical use | Override |
| --- | --- | --- | --- | --- |
| `--cb-page` | Page background | `#f7fafe` | Application canvas | Yes |
| `--cb-surface` | Base elevated surface | `#ffffff` | Cards, inputs, dialogs | Yes |
| `--cb-surface-soft` | Subtle interactive surface | `#fafbfc` | List hover state | Yes |
| `--cb-surface-muted` | Muted neutral surface | `#f5f7fa` | Neutral and inactive regions | Yes |
| `--cb-surface-placeholder` | Loading placeholder surface | `#e5eaf2` | Skeleton blocks | Yes |
| `--cb-text` | Default body text | `#26344a` | Inherited content color | Yes |
| `--cb-text-strong` | Strong heading text | `#0f2749` | Titles and high-emphasis copy | Yes |
| `--cb-text-muted` | Secondary text | `#68758a` | Descriptions and metadata | Yes |
| `--cb-text-subtle` | Tertiary text | `#8a96a8` | Hints, placeholders, inactive icons | Yes |
| `--cb-text-on-primary` | Text on strong color fills | `#ffffff` | Primary and status buttons | Yes |

## Borders

| Token | Meaning | Default | Typical use | Override |
| --- | --- | --- | --- | --- |
| `--cb-border` | Default divider/border | `#e5eaf2` | Cards, lists, input outlines | Yes |
| `--cb-border-strong` | Strong neutral border | `#d4dbe6` | Controls and inactive steps | Yes |

## Status

| Token | Meaning | Default | Typical use | Override |
| --- | --- | --- | --- | --- |
| `--cb-success` | Success emphasis | `#22c55e` | Icons and strong success states | Yes |
| `--cb-success-text` | Success text on soft surfaces | `#166534` | Explanatory success copy | Yes |
| `--cb-success-soft` | Success surface | `#ecfdf3` | Correct answers and notifications | Yes |
| `--cb-success-border` | Success border | `#bbf7d0` | Success tags and notices | Yes |
| `--cb-warning` | Warning emphasis | `#f59e0b` | Warning icons and strong states | Yes |
| `--cb-warning-text` | Warning text on soft surfaces | `#b86900` | Warning tags and actions | Yes |
| `--cb-warning-soft` | Warning surface | `#fff8e6` | Warning and reward surfaces | Yes |
| `--cb-warning-border` | Warning border | `#fde7aa` | Warning tags and notices | Yes |
| `--cb-danger` | Danger emphasis | `#f04438` | Errors and destructive actions | Yes |
| `--cb-danger-hover` | Danger hover color | `#d92d20` | Destructive button hover | Yes |
| `--cb-danger-pressed` | Danger pressed/text color | `#b42318` | Destructive active state | Yes |
| `--cb-danger-soft` | Danger surface | `#fff1f0` | Error and incorrect-answer surfaces | Yes |
| `--cb-danger-border` | Danger border | `#ffd0cc` | Error tags and notices | Yes |

## Disabled, focus, and overlays

| Token | Meaning | Default | Typical use | Override |
| --- | --- | --- | --- | --- |
| `--cb-disabled-bg` | Standard disabled fill | `#e5eaf2` | Disabled controls and icons | Yes |
| `--cb-disabled-emphasis-bg` | Strong disabled fill | `#d4dbe6` | Large disabled action controls | Yes |
| `--cb-disabled-surface` | Disabled container surface | `#f5f7fa` | Disabled cards and fields | Yes |
| `--cb-disabled-text` | Disabled content | `#8a96a8` | Disabled labels and icons | Yes |
| `--cb-disabled-border` | Disabled border | `#d4dbe6` | Disabled fields and cards | Yes |
| `--cb-focus-ring` | Standard keyboard focus ring | `rgba(10, 124, 255, 0.2)` | Buttons and controls | Yes |
| `--cb-focus-ring-soft` | Subtle contained focus ring | `rgba(10, 124, 255, 0.1)` | Inputs and search fields | Yes |
| `--cb-overlay` | Dialog/sheet backdrop | `rgba(15, 39, 73, 0.5)` | Modal overlays | Yes |
| `--cb-code-bg` | Code example surface | `#0f2749` | Documentation code blocks | Yes |
| `--cb-code-text` | Code example text | `#d7e7ff` | Documentation code blocks | Yes |
| `--cb-shadow-soft` | Low-elevation shadow | `0 4px 16px rgba(15, 39, 73, 0.06)` | Cards and small badges | Yes |
| `--cb-shadow-floating` | Floating-layer shadow | `0 12px 32px rgba(15, 39, 73, 0.12)` | Dialogs, sheets, callouts | Yes |

## Tailwind CSS 4 utilities

The package maps V2 tokens through `@theme inline`. Consumers using the package stylesheet can use semantic utilities such as:

```tsx
<div className="border border-border bg-surface text-text-strong" />
<button className="bg-primary text-on-primary hover:bg-primary-hover" />
<p className="border-success-border bg-success-soft text-success" />
```

Existing utilities such as `bg-brand`, `text-brand-deep`, `text-muted`, and `border-line` remain available for compatibility. New component source uses the V2 semantic utilities.

## V1 compatibility aliases

The following existing tokens remain supported. V2 defaults reference them where applicable, so an existing theme that only overrides V1 tokens continues to work.

| Existing token | V2 role |
| --- | --- |
| `--cb-brand` | Source for `--cb-primary` |
| `--cb-brand-hover` | Source for `--cb-primary-hover` |
| `--cb-brand-pressed` | Source for `--cb-primary-pressed` |
| `--cb-deep` | Source for `--cb-text-strong` and `--cb-code-bg` |
| `--cb-soft` | Source for `--cb-primary-subtle` |
| `--cb-page` | Same V2 page role |
| `--cb-text` | Same V2 body-text role |
| `--cb-muted` | Source for `--cb-text-muted` |
| `--cb-subtle` | Source for `--cb-text-subtle` and `--cb-disabled-text` |
| `--cb-line` | Source for `--cb-border`, `--cb-disabled-bg`, and placeholder surfaces |
| `--cb-success` | Same V2 success role |
| `--cb-warning` | Same V2 warning role |
| `--cb-danger` | Same V2 danger role |

## Color migration audit

Audit scope: `src/components/**/*.{ts,tsx}` before Design Token V2.

| Result | Count |
| --- | ---: |
| Hardcoded color occurrences found | 150 |
| Hex occurrences | 145 |
| `rgb` / `rgba` occurrences | 5 |
| Files affected | 43 |
| Occurrences migrated to semantic tokens | 148 |
| Intentionally retained occurrences | 2 |

The two retained values are the blue and gold decorative achievement-medallion rings in `AchievementBadge`. They are component-specific artwork accents (`#A9CFFF` and `#FDE68A`), not reusable semantic states, so promoting them to global theme tokens would create one-off API surface.

Concrete values in `src/theme.css` are token defaults rather than unscoped component colors. Documentation swatches, SVG mask source colors, and the separately licensed mascot sprite are excluded from the component-source audit.
