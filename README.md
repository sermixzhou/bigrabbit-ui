# Big Rabbit UI / 大嘴小兔 UI

An open-source React component library for learning products, built with TypeScript and Tailwind CSS 4.

[Documentation](https://sermixzhou.github.io/bigrabbit-ui/) · [Component API](./docs/API.md) · [Changelog](./CHANGELOG.md) · [Contributing](./CONTRIBUTING.md)

## Why Big Rabbit UI?

- Learning-focused components such as word headers, quiz options, pronunciation controls, study progress, and answer feedback.
- Responsive behavior for mobile, tablet, and desktop layouts.
- Controlled React APIs with TypeScript declarations.
- Keyboard focus, native semantics, reduced-motion support, and 44px minimum targets.
- CSS-first design tokens powered by Tailwind CSS 4.
- Tree-shakeable ESM and CommonJS outputs with category entry points.

## Install

```bash
npm install bigrabbit-ui
```

Import the stylesheet once:

```tsx
import "bigrabbit-ui/styles.css";
```

The default mascot artwork is separately licensed and opt-in. Import it only for permitted demonstration use, or pass your own sprite:

```tsx
import mascotSprite from "bigrabbit-ui/mascot.png";
import { MascotProvider } from "bigrabbit-ui/brand";

<MascotProvider spriteSrc={mascotSprite}>
  <App />
</MascotProvider>
```

Then use the components:

```tsx
import { Button, Progress, WordHeader } from "bigrabbit-ui";

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
import { Button, Chip } from "bigrabbit-ui/primitives";
import { Input, Switch } from "bigrabbit-ui/forms";
import { QuizOption, WordHeader } from "bigrabbit-ui/learning";
```

Available entries:

```text
bigrabbit-ui
bigrabbit-ui/icon
bigrabbit-ui/primitives
bigrabbit-ui/forms
bigrabbit-ui/cards
bigrabbit-ui/navigation
bigrabbit-ui/learning
bigrabbit-ui/feedback
bigrabbit-ui/brand
bigrabbit-ui/styles.css
```

## Customize the theme

Override the public CSS variables after the library stylesheet:

```css
@import "bigrabbit-ui/styles.css";

:root {
  --br-brand: #0a7cff;
  --br-brand-hover: #006fe8;
  --br-brand-pressed: #005fc7;
  --br-deep: #0f2749;
  --br-page: #f7fafe;
  --br-text: #26344a;
  --br-muted: #68758a;
  --br-line: #e5eaf2;
}
```

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

The component source and general-purpose icons are MIT licensed. The Big Rabbit name, logo, mascot, sprite sheet, and illustrations use a separate brand license. Use the `spriteSrc` property on `Mascot` to supply artwork you own for production projects.

Read [BRAND_LICENSE.md](./BRAND_LICENSE.md) and [NOTICE](./NOTICE) before using brand assets.

## Contributing and security

- Read [CONTRIBUTING.md](./CONTRIBUTING.md) before opening a pull request.
- Follow the [Code of Conduct](./CODE_OF_CONDUCT.md).
- Report vulnerabilities according to [SECURITY.md](./SECURITY.md).

## License

- Source code: [MIT](./LICENSE)
- Brand assets: [Big Rabbit Brand Asset License](./BRAND_LICENSE.md)
