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

Extends native button attributes. Loading buttons are disabled and announce “加载中”.

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

The CSS exposes stable `--cb-*` custom properties. Override them after importing the package stylesheet:

```css
@import "chatty-bunny/styles.css";

:root {
  --cb-brand: #7c3aed;
  --cb-brand-hover: #6d28d9;
  --cb-brand-pressed: #5b21b6;
  --cb-deep: #24143d;
}
```

Do not override internal selectors. Prefer component properties, `className`, and the public CSS variables.
