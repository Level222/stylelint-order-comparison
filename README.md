# Stylelint Order Comparison

A comparison of packages that provide properties order for [stylelint-order](https://github.com/hudochenkov/stylelint-order)

Visit <https://level222.github.io/stylelint-order-comparison/public/> to see the comparison.

## Features

- A rich table using [AG Grid](https://www.ag-grid.com/)
- Properties list and count grouped by inclusion in [Known CSS properties](https://github.com/known-css/known-css-properties/public/) and whether they begin with vendor prefixes
- Order details displayed when rows in the table are selected

## Create With Your Own Data

1. Clone the repository using the `--recursive` option to include submodules.

2. Install dependencies:

    ```shell
    npm install
    ```

3. Update `scripts/create-package-data-list/package-info-list.js`.

4. Create an updated `data/package-data-list.json`:

    ```shell
    npm run create-package-data-list
    ```

5. To view the HTML page, open `public/index.html`.
