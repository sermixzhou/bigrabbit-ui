# Component API

Chatty Bunny components are controlled React components. They emit events and never perform routing, data fetching, authorization, recording, audio playback, or learning business logic on their own.

Import the stylesheet once near your application entry:

```tsx
import "chatty-bunny/styles.css";
```

Import from the root for convenience or from a category entry for the smallest dependency graph:

```tsx
import { Button } from "chatty-bunny";
import { Input, Switch } from "chatty-bunny/forms";
import { WordHeader } from "chatty-bunny/learning";
```

All native HTML attributes not replaced by a component-specific property are forwarded to the root element.

## Localization

`ChattyBunnyProvider` supplies lightweight component-owned messages without introducing an application i18n framework. The supported locales are `zh-CN` and `en`; `zh-CN` remains the default for backwards compatibility.

```tsx
import { ChattyBunnyProvider } from "chatty-bunny";

<ChattyBunnyProvider locale="en" messages={{ loading: "Working…" }}>
  <App />
</ChattyBunnyProvider>
```

`messages` is a partial `ChattyBunnyMessages` dictionary. Resolution order is: explicit component property, provider override, selected locale dictionary. Product content such as titles, descriptions, option labels, brand names, and learning copy remains application-owned.

## Icons

### `Icon`

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | `IconName` | required | Name from the exported `iconNames` list. |
| `size` | `16 \| 20 \| 24 \| 32` | `24` | Visual icon size in pixels. |
| `className` | `string` | — | Additional utility classes. |

Icons are decorative by default. Put interactive icons inside `IconButton` so the accessible name and 44px target are preserved.

## Primitives

### `Button`

| Property | Type | Default |
| --- | --- | --- |
| `variant` | `"primary" \| "secondary" \| "ghost"` | `"primary"` |
| `size` | `"large" \| "medium"` | `"large"` |
| `loading` | `boolean` | `false` |
| `icon` | `IconName` | — |
| `block` | `boolean` | `true` |

Extends native button attributes. Loading buttons are disabled and announce the localized `loading` message. Override it per button with `loadingLabel`.

### `IconButton`

| Property | Type | Default |
| --- | --- | --- |
| `icon` | `IconName` | required |
| `label` | `string` | required |
| `variant` | `"plain" \| "soft" \| "outlined"` | `"plain"` |
| `selected` | `boolean` | — |
| `iconSize` | `16 \| 20 \| 24 \| 32` | `24` |

### `Chip`

| Property | Type | Default |
| --- | --- | --- |
| `selected` | `boolean` | — |
| `variant` | `"neutral" \| "info" \| "success" \| "warning"` | `"neutral"` |
| `icon` | `IconName` | — |
| `onSelectedChange` | `(selected: boolean) => void` | — |

### `Tag`

| Property | Type | Default |
| --- | --- | --- |
| `variant` | `Semantic` | `"neutral"` |
| `size` | `"medium" \| "small"` | `"medium"` |
| `icon` | `IconName` | — |

`Semantic` is `neutral | info | success | warning | error`.

### `Badge`

| Property | Type | Default |
| --- | --- | --- |
| `variant` | `Semantic` | `"info"` |
| `dot` | `boolean` | `false` |

### `Progress`

| Property | Type | Default |
| --- | --- | --- |
| `value` | `number` | required |
| `max` | `number` | `100` |
| `size` | `"standard" \| "slim"` | `"standard"` |
| `state` | `"default" \| "success" \| "error"` | `"default"` |
| `label` | `string` | — |
| `showValue` | `boolean` | `false` |

### `StepIndicator`

| Property | Type | Default |
| --- | --- | --- |
| `items` | `{ label: string; value?: string }[]` | required |
| `current` | `number` | `0` |

## Forms

### `Input`

Extends native input attributes except `size`.

| Property | Type | Default |
| --- | --- | --- |
| `label` | `string` | — |
| `helper` | `string` | — |
| `errorMessage` | `string` | — |
| `clearable` | `boolean` | `true` |
| `onClear` | `() => void` | — |

### `Search`

Extends native input attributes except `type`.

| Property | Type | Default |
| --- | --- | --- |
| `loading` | `boolean` | `false` |
| `onClear` | `() => void` | — |

### `Radio` and `Checkbox`

| Property | Type | Default |
| --- | --- | --- |
| `label` | `string` | required |
| `value` | `string` | — |
| `checked` | `boolean` | — |
| `disabled` | `boolean` | — |
| `onChange` | `(checked: boolean) => void` | — |

### `Switch`

Uses the same controlled properties as `Checkbox`, without `value`, and exposes native `role="switch"` semantics.

### `Segment` and `Tabs`

| Property | Type | Default |
| --- | --- | --- |
| `items` | `{ label: string; value: string; disabled?: boolean }[]` | required |
| `value` | `string` | required |
| `onChange` | `(value: string) => void` | — |
| `disabled` | `boolean` | — |
| `variant` | `"line" \| "pill"` | Tabs only: `"line"` |

### Core form components

| Component | Important properties | Notes |
| --- | --- | --- |
| `Textarea` | native textarea attributes, `label`, `helper`, `errorMessage`, `showCount` | Character count is shown when `showCount` and `maxLength` are set. |
| `Select` | `options`, `value`, `onChange`, `placeholder`, `leadingIcon`, field messages | Custom single-select listbox with disabled options and arrow-key navigation. |
| `Combobox` | `options`, `value`, `onChange`, `onQueryChange`, `loading`, `emptyMessage`, `clearable` | Searchable listbox; override `filterOption` for custom/local filtering. |
| `PasswordInput` | native input attributes except `type`, plus Input field messages | Includes an accessible show/hide control and defaults to `current-password` autocomplete. |
| `Slider` | native range attributes, `label`, `showValue`, `formatValue` | Uses a touch-sized range control while preserving native range semantics. |
| `FileUpload` | native file attributes, `files`, `loading`, `errorMessage`, `maxSizeLabel`, `onFilesSelected` | Handles click/drop selection UI only; it never uploads files. |

`SelectOption` is `{ value: string; label: string; disabled?: boolean }` and is shared by `Select` and `Combobox`.

`DemoForm` is a deprecated demo-only state helper. Its root export remains temporarily available for backwards compatibility, but new applications should not use it.

## Data Display

| Component | Important properties |
| --- | --- |
| `Avatar` | `src`, `alt`, `initials`, `size`, `shape`, `status` |
| `Accordion` | `items`, `type`, `value`, `defaultValue`, `onValueChange` |
| `StatCard` | `label`, `value`, `icon`, `trend`, `supportingText`, `progress`, `state` |
| `ChoiceCard` | `value`, `title`, `description`, `media`, `badge`, `trailing`, `selected`, `selectionMode` |
| `ChoiceGroup` | `selectionMode`, `value`, `defaultValue`, `onValueChange`, accessible label |

`Avatar` sizes are `small | medium | large`; status is `online | away | busy | offline`. Accordion supports controlled and uncontrolled single/multiple expansion. A standalone `ChoiceCard` is a native toggle button (`aria-pressed`). Inside `ChoiceGroup`, single selection exposes one `radiogroup` with roving arrow-key focus and multiple selection exposes one `group` containing checkboxes.

## Cards

### `Card`

| Property | Type | Default |
| --- | --- | --- |
| `title` | `string` | — |
| `description` | `string` | — |
| `variant` | `"default" \| "soft"` | `"default"` |
| `padding` | `"standard" \| "large"` | `"standard"` |
| `shadow` | `"none" \| "soft" \| "floating"` | `"none"` |
| `state` | `"default" \| "selected" \| "disabled"` | `"default"` |
| `footer` | `ReactNode` | — |

### Semantic cards

| Component | Required properties | Optional properties |
| --- | --- | --- |
| `LearningProgressCard` | `title`, `subtitle`, `value` | `max`, `icon`, `state` |
| `UnitCard` | `unit`, `title`, `description`, `progress` | `icon`, `state` |
| `WordCard` | `word`, `phonetic`, `meaning` | `favorite`, `state` |
| `ReviewCard` | `title`, `description`, `count` | `icon`, `state` |
| `AchievementCard` | `title`, `description` | `icon`, `state` |

Semantic card state is `default | current | completed | locked | disabled`. Components extend native button attributes.

## Lists

### `ListItem`

| Property | Type | Default |
| --- | --- | --- |
| `leadingIcon` | `IconName` | — |
| `title` | `string` | required |
| `description` | `string` | — |
| `trailing` | `ReactNode` | — |
| `arrow` | `boolean` | `true` |
| `state` | `default \| current \| selected \| completed \| locked \| disabled` | `default` |

`WordListItem` adds `index`, `word`, `meaning`, and `status`. `SettingListItem` adds `icon` and `value`.

## Navigation

### `TopNavigation`

| Property | Type | Default |
| --- | --- | --- |
| `title` | `string` | required |
| `subtitle` | `string` | — |
| `back` | `boolean` | `true` |
| `actionIcon` | `IconName` | — |
| `actionLabel` | `string` | `"更多"` |
| `align` | `"left" \| "center"` | `"center"` |
| `onBack` | `() => void` | — |
| `onAction` | `() => void` | — |

### `BottomTabBar`

| Property | Type | Default |
| --- | --- | --- |
| `items` | `{ label; value; icon; badge? }[]` | required |
| `value` | `string` | required |
| `onChange` | `(value: string) => void` | — |

### `Navbar`

`brand`, `items`, and `action` compose the desktop shell. `open`, `defaultOpen`, and `onOpenChange` control the mobile menu. Each item supports `label`, `href`, `active`, `disabled`, and `onClick`.

### `Sidebar`

`header`, `groups`, and `footer` compose the sidebar. `collapsed` controls the desktop compact state; `mobileOpen` and `onMobileOpenChange` control its mobile drawer adaptation. `onSelect` receives the selected item value.

## Overlays

| Component | Important properties | Dismissal |
| --- | --- | --- |
| `DropdownMenu` | `trigger`, `items`, `open`, `onOpenChange`, `align` | Item select, click outside, Escape |
| `Popover` | `trigger`, `children`, `placement`, `open`, `onOpenChange`, `showCloseButton` | Render-function close, close button, click outside, Escape |
| `Tooltip` | `content`, `children`, `placement`, `delay`, `disabled` | Pointer leave, blur, Escape |

Dropdown items support icons, disabled/destructive state, and separators. Popover placement and Tooltip placement are `top | bottom | left | right`.

All five floating components—`Select`, `Combobox`, `DropdownMenu`, `Popover`, and `Tooltip`—share one Floating UI foundation. It provides portals, offset, viewport collision shifting/flipping, scroll/resize updates, outside-click and Escape dismissal, focus return, and composed trigger props. A valid trigger element is cloned rather than wrapped, so its original ref, event handlers, ARIA attributes, disabled state, and single focus stop are preserved.

## Learning

| Component | Key properties | Events |
| --- | --- | --- |
| `QuizOption` | `prefix`, `label`, `description`, `state` | Native `onClick` |
| `AudioButton` | `label`, `playing`, `size` | Native `onClick` |
| `PronunciationButton` | `state`, `label` | Native `onClick` |
| `WordHeader` | `word`, `phonetic`, `meaning`, `playing`, `favorite`, `disabled` | `onAudio`, `onFavorite` |
| `ExampleSentence` | `sentence`, `translation`, `playing`, `disabled` | `onAudio` |
| `DifferenceBlock` | `firstWord`, `firstDescription`, `secondWord`, `secondDescription` | — |
| `CollocationItem` | `phrase`, `translation`, `selected` | `onClick` |
| `FlashCard` | `side`, `word`, `phonetic`, `meaning`, `example` | `onFlip` |
| `AnswerFeedback` | `variant`, `title`, `explanation`, `answer`, `expected`, `actionLabel` | `onAction` |
| `StudyProgress` | `items`, `current`, `title` | — |

Quiz state is `default | selected | correct | incorrect | disabled`. Pronunciation state is `ready | recording | processing | success | retry | disabled`.

## Feedback

### `Toast`

`message`, `variant`, `actionLabel`, `onAction`, `onClose`, and `className`.

### `Modal`

`open`, `title`, `description`, `confirmLabel`, `cancelLabel`, `variant`, `loading`, `inline`, `onConfirm`, `onCancel`, and `onClose`.

### `BottomSheet`

`open`, `title`, `options`, `cancelLabel`, `inline`, `onSelect`, `onCancel`, and `onClose`. Each option contains `label`, `value`, and optional `icon`, `description`, and `disabled`.

### Loading and state components

| Component | Important properties |
| --- | --- |
| `Skeleton` | `variant`, `rows`, `animated` |
| `Loading` | `label`, `size`, `fullScreen` |
| `StatePanel` | `icon`, `mascot`, `title`, `description`, actions |
| `EmptyState` | `title`, `description`, actions |
| `ErrorState` | `title`, `description`, actions |
| `PermissionState` | `title`, `description`, actions |
| `LockedState` | `title`, `description`, actions |
| `OnboardingHint` | `step`, `total`, `title`, `description`, labels and actions |

## Brand

Brand assets have a separate license. See `BRAND_LICENSE.md` before using the default mascot in an end product.

### `Mascot`

| Property | Type | Default |
| --- | --- | --- |
| `state` | `MascotState` | `"welcome"` |
| `size` | `"small" \| "medium" \| "large" \| "xlarge"` | `"medium"` |
| `label` | `string` | `"大嘴小兔"` |
| `decorative` | `boolean` | `false` |
| `spriteSrc` | `string` | provider value or none |

Mascot state is `welcome | learning | thinking | success | error | encourage | empty | locked | sleep | celebrate`.

Use `MascotProvider` to supply one sprite sheet to every nested brand component:

```tsx
import mascotSprite from "chatty-bunny/mascot.png";
import { MascotProvider } from "chatty-bunny/brand";

<MascotProvider spriteSrc={mascotSprite}>
  <App />
</MascotProvider>
```

### Other brand components

| Component | Important properties |
| --- | --- |
| `BrandLogo` | `variant`, `size`, `name`, `tagline` |
| `MascotCallout` | `message`, `supportingText`, `state`, `placement` |
| `AchievementBadge` | `label`, `description`, `icon`, `variant`, `state`, `size` |
| `StreakBadge` | `days`, `label`, `state` |

## Styling and customization

The CSS exposes stable semantic `--cb-*` Design Tokens V2. Override them after importing the package stylesheet:

```css
@import "chatty-bunny/styles.css";

:root {
  --cb-primary: #7c3aed;
  --cb-primary-hover: #6d28d9;
  --cb-primary-pressed: #5b21b6;
  --cb-primary-subtle: #f5f3ff;
  --cb-primary-border: #ddd6fe;
  --cb-focus-ring: rgba(124, 58, 237, 0.2);
}
```

The original `--cb-brand`, `--cb-deep`, `--cb-muted`, and `--cb-line` variables remain supported as compatibility aliases. See [Design Tokens V2](./DESIGN_TOKENS.md) for the full token table, Tailwind utility mapping, defaults, and migration audit.

Do not override internal selectors. Prefer component properties, `className`, and the public CSS variables.

## P1 interaction components

### Actions

Import these components from `chatty-bunny/actions` or the package root.

| Component | Important properties | Behavior |
| --- | --- | --- |
| `ButtonGroup` | `orientation`, `attached`, native div attributes | Groups any related controls without forcing a button type. |
| `Toggle` | `pressed`, `onPressedChange`, `icon`, `size`, `variant`, `disabled` | Controlled toggle button with `aria-pressed`; use `value` inside `ToggleGroup`. |
| `ToggleGroup` | `type`, `value`, `defaultValue`, `onValueChange`, `orientation` | Single or multiple tool-state selection with arrow keys and roving focus. |
| `Link` | native anchor attributes, `variant`, `externalIndicator`, `disabled`, `icon` | Router-independent anchor styling for inline, standalone, or subtle links. |

`Segment` changes the view of one content region. `ToggleGroup` represents a group of active tools or states. `ButtonGroup` only provides grouping and layout.

### Forms

| Component | Important properties | Notes |
| --- | --- | --- |
| `NumberInput` | `value`, `defaultValue`, `min`, `max`, `step`, `onValueChange`, field messages | Allows manual decimal/negative input; clamps to `min`/`max` on blur or step actions and never renders `NaN`. |
| `OTPInput` | `length`, `value`, `onChange`, `onComplete`, `mode`, `errorMessage`, `name` | Supports numeric/alphanumeric entry, paste, backspace, arrow navigation, auto-advance, and one-time-code autocomplete. |
| `FormField` | `label`, `description`, `helper`, `errorMessage`, `required`, `controlId` | Clones one control to associate its id and ARIA descriptions; it is not tied to `Input`. |

Use the built-in `label`, `helper`, and `errorMessage` properties when a single `Input`, `Textarea`, `Select`, or other field is sufficient. Use `FormField` for custom/native controls or when one shared field wrapper owns the messages. Do not provide both sets of labels/messages, which would duplicate visible and accessible content.

### Navigation

| Component | Important properties | Behavior |
| --- | --- | --- |
| `Breadcrumb` | `items`, `separator`, `maxItems`, `ariaLabel` | Items support `label`, `href`, `onClick`, and `current`; long paths collapse to first, ellipsis, and last. |
| `Pagination` | `page`, `totalPages`, `onChange`, `siblingCount`, `boundaryCount`, `compact`, labels | Emits page changes only; it never fetches data or changes a URL. |
| `NavigationMenu` | `items`, `value`, `defaultValue`, `onValueChange`, `ariaLabel` | Uses a collision-aware desktop menu and a stacked native disclosure layout on mobile. |

`NavigationMenu` describes destinations and secondary navigation content. `Navbar` remains the overall page shell.

### Overlays

| Component | Important properties | Notes |
| --- | --- | --- |
| `Drawer` | `open`, `onOpenChange`, `side`, `size`, `title`, `description`, `footer`, `overlay` | Portal, focus trap, Escape, outside press, scroll lock, and focus return are provided by the shared overlay foundation. Prefer `BottomSheet` on mobile when the task naturally belongs at the bottom edge. |
| `AlertDialog` | `open`, `onOpenChange`, `title`, `description`, labels, `loading`, `destructive`, callbacks | Reserved for critical confirmation. Cancel receives initial focus; loading prevents duplicate actions. Outside press is intentionally disabled, while Escape closes the dialog. |

### Data display

| Component | Important properties | Notes |
| --- | --- | --- |
| `Table` | `density`, `striped`, `hover`, `wrapperClassName` | Native responsive table wrapper. Compose with `TableCaption`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, and `TableCell`; `TableBody` accepts `emptyContent`. |
| `Timeline` | `items` | Vertical, mobile-first list. Each item accepts `title`, `description`, `timestamp`, `icon`, and `state`. |
| `ActionCard` | `title`, `description`, `icon`/`media`, `badge`, `trailing`, `href`/`onClick`, `disabled`, `selected` | Renders an anchor, button, or noninteractive article according to the supplied action. It is for navigation/action, not selection. |
| `ProfileCard` | `avatar`/`media`, `name`, `subtitle`, `description`, `metadata`, `status`, `tags`, `actions`, `orientation` | Generic profile presentation for people, pets, teams, creators, or roles; it does not add fake button semantics. |

`Table` is intentionally not a data grid. Sorting, filtering, selection, server pagination, resizing, and virtualization stay in application composition.
