# Contributing to Chatty Bunny

Thank you for helping make learning-product interfaces easier to build.

## Development

```bash
npm install
npm run dev
```

Before submitting a pull request, run:

```bash
npm run check
```

## Component requirements

Every new component must include:

- a typed public API;
- keyboard and screen-reader semantics appropriate to the interaction;
- default, focus-visible, active, and disabled states where applicable;
- responsive behavior at 390px, 768px, and 1440px;
- tests for important behavior rather than implementation details;
- an interactive documentation example and short usage guidance;
- a changelog entry under `Unreleased`.

## Design rules

- Use existing design tokens before introducing a new value.
- Keep a 44×44px minimum interactive target.
- Use status color together with an icon or text explanation.
- Avoid nested cards and decorative shadows.
- Keep business logic outside the component library.

## Pull requests

Keep pull requests focused. Explain the user problem, describe the API, include screenshots for visual changes, and note the validation you performed.

By contributing, you agree that your contribution is licensed under the MIT License. Do not contribute third-party brand assets unless you have permission to relicense them for this repository.
