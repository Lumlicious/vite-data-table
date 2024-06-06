# Data Table Challenge

[Vercel Preview](https://vite-data-table.vercel.app/)

## Tech Stack

- Vite
- React (18.2)
- Typescript
- SCSS + BEM
- Vitest / React Testing Library
- V8 coverage (100% for the component)
- eslint (js, react, jsx, typescript rules)
- Prettier
- Vercel (preview deployment)

## Instructions

Clone and use `npm install` to install dependencies

To run dev mode:
`npm run dev`

To run tests:
`npm run test`

To run coverage:
`npm run coverage`

## Notes

- The dataset lacks unique identifiers for individual items, necessitating the use of array indices for item tracking. This approach is suboptimal as it introduces the risk of mismatches between selected items and the actual dataset, especially if the dataset is dynamically updated.
- Per the requirements, only items with an 'available' status can be downloaded. Consequently, checkboxes are disabled for rows corresponding to non-available items. If the dataset contains any non-available items, toggling the 'select all' functionality will render the checkbox in an indeterminate state.
- Vite was selected as the build tool due to its provision of a development environment closely resembling vanilla React, filling the gap left by the deprecation of create-react-app. Vite's ecosystem includes a nice built-in testing library as well.
- The specifications mention "reusable" components, though it was unclear if this implied support for multiple data schemas. The current implementation is restricted to a single data schema, but it is designed for straightforward refactoring to support multiple schemas if needed.
- All requirements were accounted for in the component tests.
