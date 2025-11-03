## AI Assurance

This is a reference page to keep some important areas where focused to find and study the patterns from Quality Engineering principles in AI Assurance

# Project Structure for `the-qexai`

└── **the-qexai/**
    ├── **--version/**
    │   └── **_/**
    │       ├── applypatch-msg
    │       ├── commit-msg
    │       ├── h
    │       ├── husky.sh
    │       ├── post-applypatch
    │       ├── post-checkout
    │       ├── post-commit
    │       ├── post-merge
    │       ├── post-rewrite
    │       ├── pre-applypatch
    │       ├── pre-auto-gc
    │       ├── pre-commit
    │       ├── pre-merge-commit
    │       ├── pre-push
    │       ├── pre-rebase
    │       └── prepare-commit-msg
    ├── **app/**
    │   ├── **api/**
    │   │   └── **site/**
    │   │       ├── **cards/**
    │   │       │   └── route.ts
    │   │       ├── **footer/**
    │   │       │   └── route.ts
    │   │       ├── **header/**
    │   │       │   └── route.ts
    │   │       └── **hero/**
    │   │           └── route.ts
    │   ├── **data/**
    │   │   ├── dataForCards.json
    │   │   ├── footerData.json
    │   │   ├── headerData.json
    │   │   └── heroData.json
    │   ├── globals.css
    │   ├── layout.tsx
    │   ├── **lib/**
    │   │   ├── getFooterData.ts
    │   │   ├── getHeaderData.ts
    │   │   └── getHeroData.ts
    │   ├── page.tsx
    │   └── **ui/**
    │       ├── **features/**
    │       │   ├── **cards/**
    │       │   │   ├── Card.tsx
    │       │   │   ├── CardItem.tsx
    │       │   │   └── Cards.module.css
    │       │   ├── **header-footer/**
    │       │   │   ├── Footer.tsx
    │       │   │   └── Header.tsx
    │       │   └── **hero/**
    │       │       ├── Hero.module.css
    │       │       └── Hero.tsx
    │       ├── fonts.ts
    │       └── ui.global.css
    ├── commitlint.config.js
    ├── eslint.config.mjs
    ├── next-env.d.ts
    ├── next.config.ts
    ├── package.json
    ├── **playwright-report/**
    │   └── index.html
    ├── playwright.config.ts
    ├── pnpm-lock.yaml
    ├── postcss.config.js
    ├── **public/**
    │   ├── TheQexAI.ico
    │   ├── favicon.ico
    │   ├── file.svg
    │   ├── globe.svg
    │   ├── next.svg
    │   ├── og-image.png
    │   ├── vercel.svg
    │   └── window.svg
    ├── tailwind.config.ts
    ├── **test-results/**
    ├── **tests/**
    │   └── example.spec.ts
    ├── tsconfig.json
    └── README.md
