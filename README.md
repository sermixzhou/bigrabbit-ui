# Chatty Bunny / 大嘴小兔 UI

An open-source React component library for learning products, built with TypeScript and Tailwind CSS 4.

[Documentation](https://sermixzhou.github.io/chatty-bunny/) · [Component API](./docs/API.md) · [Design Tokens](./docs/DESIGN_TOKENS.md) · [Changelog](./CHANGELOG.md) · [Contributing](./CONTRIBUTING.md)

## Why Chatty Bunny?

- Learning-focused components such as word headers, quiz options, pronunciation controls, study progress, and answer feedback.
- Responsive behavior for mobile, tablet, and desktop layouts.
- Controlled React APIs with TypeScript declarations.
- Keyboard focus, native semantics, reduced-motion support, and 44px minimum targets.
- CSS-first design tokens powered by Tailwind CSS 4.
- Tree-shakeable ESM and CommonJS outputs with category entry points.

## Install

```bash
npm install chatty-bunny
```

Import the stylesheet once:

```tsx
import "chatty-bunny/styles.css";
```

The default mascot artwork is separately licensed and opt-in. Import it only for permitted demonstration use, or pass your own sprite:

```tsx
import mascotSprite from "chatty-bunny/mascot.png";
import { MascotProvider } from "chatty-bunny/brand";

<MascotProvider spriteSrc={mascotSprite}>
  <App />
</MascotProvider>
```

Then use the components:

```tsx
import { Button, Progress, WordHeader } from "chatty-bunny";

export function Lesson() {
  return (
    <main className="space-y-4">
      <WordHeader
        word="father"
        phonetic="/ˈfɑːðər/"
        meaning="n. 父亲；爸爸"
      />
      <Progress value={40} label="学习进度" showValue />
      <Button>继续学习</Button>
    </main>
  );
}
```

## On-demand imports

Importing from a category entry point keeps the dependency graph focused and makes tree-shaking explicit:

```tsx
import { Button, Chip } from "chatty-bunny/primitives";
import { Input, Switch } from "chatty-bunny/forms";
import { Avatar, ChoiceCard } from "chatty-bunny/data-display";
import { Popover, Tooltip } from "chatty-bunny/overlays";
import { QuizOption, WordHeader } from "chatty-bunny/learning";
```

Available entries:

```text
chatty-bunny
chatty-bunny/icon
chatty-bunny/primitives
chatty-bunny/forms
chatty-bunny/cards
chatty-bunny/navigation
chatty-bunny/learning
chatty-bunny/feedback
chatty-bunny/brand
chatty-bunny/data-display
chatty-bunny/overlays
chatty-bunny/styles.css
```

## Customize the theme

Override the public CSS variables after the library stylesheet:

```css
@import "chatty-bunny/styles.css";

:root {
  --cb-primary: #0a7cff;
  --cb-primary-hover: #006fe8;
  --cb-primary-pressed: #005fc7;
  --cb-primary-subtle: #f2f7ff;
  --cb-primary-border: #cfe4ff;
  --cb-page: #f7fafe;
  --cb-surface: #ffffff;
  --cb-text: #26344a;
  --cb-text-muted: #68758a;
  --cb-border: #e5eaf2;
}
```

See the complete [Design Tokens V2 reference](./docs/DESIGN_TOKENS.md), including V1 compatibility aliases and state tokens.

## Local development

```bash
npm install
npm run dev
```

Useful commands:

```bash
npm run typecheck      # Check app and package types
npm test               # Run component tests
npm run test:coverage  # Run tests with coverage thresholds
npm run build:package  # Build npm package into dist/
npm run build:site     # Build documentation into site-dist/
npm run check          # Run every release check
```

## Package structure

```text
src/
├── assets/             # General-purpose MIT-licensed icons
├── components/         # Publishable React components and tests
├── app/                # Documentation website
├── lib/                # Shared internal helpers
├── index.ts            # npm root entry
├── package.css         # Component-only Tailwind CSS build entry
├── styles.css          # Documentation website CSS entry
└── theme.css           # Public tokens and shared component utilities
brand/
└── mascot-states.png   # Separately licensed opt-in artwork
```

The library build produces ESM, CommonJS, CSS, assets, and declaration maps. React and React DOM remain peer dependencies.

## Design principles

1. One primary task and one primary CTA per page.
2. Use hierarchy before decoration.
3. Keep status color paired with an icon or explanation.
4. Use cards only for independent units, grouping, or state.
5. Keep business logic outside reusable UI components.
6. Test every interactive target with mouse, keyboard, and touch-sized layouts.

## Brand assets

The component source and general-purpose icons are MIT licensed. The Chatty Bunny name, logo, mascot, sprite sheet, and illustrations use a separate brand license. Use the `spriteSrc` property on `Mascot` to supply artwork you own for production projects.

Read [BRAND_LICENSE.md](./BRAND_LICENSE.md) and [NOTICE](./NOTICE) before using brand assets.

## Contributing and security

- Read [CONTRIBUTING.md](./CONTRIBUTING.md) before opening a pull request.
- Follow the [Code of Conduct](./CODE_OF_CONDUCT.md).
- Report vulnerabilities according to [SECURITY.md](./SECURITY.md).

## License

- Source code: [MIT](./LICENSE)
- Brand assets: [Chatty Bunny Brand Asset License](./BRAND_LICENSE.md)
