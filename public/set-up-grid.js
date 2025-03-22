import { createGrid, themeQuartz } from 'ag-grid-community';

/**
 * @typedef {{
 *   properties: string[];
 *   isKnown: boolean;
 *   isVendor: boolean;
 * }} FilteredProperties
 */

/**
 * @typedef {import('../utils/types.js').PackageDataWithDynamicStats & {
 *   filteredPropertiesList: FilteredProperties[];
 * }} RowData
 */

/**
 * @param {import('../utils/types.js').PackageData['groups']} groups
 * @param {(propertyDetail: import('../utils/types.js').PropertyDetail) => boolean} [filter]
 */
const getGroupsProperties = (groups, filter) => (
  groups.flatMap(({ propertyDetails }) => (
    propertyDetails.flatMap((propertyDetail) => (
      !filter || filter(propertyDetail) ? [propertyDetail.propertyName] : []
    ))
  ))
);

/**
 * @template {keyof HTMLElementTagNameMap} T
 * @param {T | `${T}.${string}`} tagNameWithClassNames
 * @param {Partial<
 *   Omit<
 *     Pick<HTMLElementTagNameMap[T], import('type-fest').WritableKeysOf<HTMLElementTagNameMap[T]>>,
 *     'className'
 *   >
 * >} [properties]
 * @param {(Node | string)[]} [children]
 * @returns {HTMLElementTagNameMap[T]}
 */
const el = (tagNameWithClassNames, properties = {}, children = []) => {
  const [tagName, ...classNames] = tagNameWithClassNames.split('.');

  const element = Object.assign(
    document.createElement(/** @type {T} */(tagName)),
    properties,
    classNames.length && { className: classNames.join(' ') },
  );

  element.replaceChildren(...children);

  return element;
};

/**
 * @param {RowData} rowDataItem
 */
const createOrderDetail = (rowDataItem) => (
  el('div.order-detail', {}, [
    el('div.package-name', {}, [rowDataItem.name]),
    el('ol.group-list', {}, rowDataItem.groups
      .map(({ propertyDetails, groupName, ...restOptions }, groupIndex) => (
        el('li.group', {}, [
          el('details', { open: true }, [
            el('summary.group-name', {}, [groupName || `Group ${groupIndex + 1}`]),
            el('ul.group-option-list', {}, Object.entries(restOptions)
              .map(([optionName, optionValue]) => (
                el('li.group-option', {}, [el('code', {}, [`${optionName}: ${JSON.stringify(optionValue)}`])])
              ))),
            el('ol.group-properties', {}, propertyDetails.map(({ propertyName }) => (
              el('li.property', {}, [el('code', {}, [propertyName])])
            ))),
          ]),
        ])
      ))),
  ])
);

const numberFormat = Intl.NumberFormat();

/**
 * @param {HTMLElement} gridElement
 * @param {HTMLElement} ordersElement
 * @param {import('../utils/types.js').PackageDataWithDynamicStats[]} packageDataWithDynamicStatsList
 */
const setUpGrid = (gridElement, ordersElement, packageDataWithDynamicStatsList) => {
  /**
   * @type {RowData[]}
   */
  const rowData = packageDataWithDynamicStatsList.map((packageDataWithDynamicStats) => ({
    ...packageDataWithDynamicStats,
    filteredPropertiesList: [
      { isKnown: true, isVendor: false },
      { isKnown: false, isVendor: false },
      { isKnown: true, isVendor: true },
      { isKnown: false, isVendor: true },
    ].map(({ isKnown, isVendor }) => ({
      isKnown,
      isVendor,
      properties: getGroupsProperties(packageDataWithDynamicStats.groups, (propertyDetail) => (
        isKnown === propertyDetail.isKnown && isVendor === propertyDetail.isVendor
      )),
    })),
  }));

  /**
   * @param {import('ag-grid-community').AgGlobalEvent<
   *   import('ag-grid-community').AgEventType,
   *   RowData
   * >} event
   */
  const handleSelectionChange = (event) => {
    /**
     * @type {RowData[]}
     */
    const selectedRowNodes = [];

    event.api.forEachNodeAfterFilterAndSort((rowNode) => {
      if (rowNode.isSelected() && rowNode.data) {
        selectedRowNodes.push(rowNode.data);
      }
    });

    ordersElement.replaceChildren(
      selectedRowNodes.length
        ? el('div.order-detail-list', {}, selectedRowNodes.map(createOrderDetail))
        : el('div.orders-info', {}, ['Select the checkboxes to view the detailed order']),
    );
  };

  gridElement.replaceChildren();

  createGrid(gridElement, {
    theme: themeQuartz,
    rowData,
    columnTypes: {
      formattedNumber: {
        /**
         * @type {import('ag-grid-community').ValueFormatterFunc<RowData, number>}
         */
        valueFormatter: (params) => (
          typeof params.value === 'number' ? numberFormat.format(params.value) : ''
        ),
      },
    },
    defaultColDef: {
      filter: true,
      floatingFilter: true,
    },
    columnDefs: [
      {
        field: 'name',
        pinned: true,
        /**
         * @param {{ value: RowData['name'] | null | undefined }} params
         */
        cellRenderer: (params) => {
          return params.value && el('a', {
            href: `https://www.npmjs.com/package/${params.value}`,
            target: '_blank',
            rel: 'noreferrer',
          }, [params.value]);
        },
      },
      { field: 'version', filter: false },
      { field: 'license' },
      { field: 'weeklyDownloads', type: ['formattedNumber'], sort: 'desc' },
      { field: 'type' },
      {
        headerName: 'Group Count',
        cellDataType: 'number',
        valueGetter: (p) => p.data?.groups.length,
        type: ['formattedNumber'],
      },
      {
        headerName: 'All Properties Count',
        cellDataType: 'number',
        valueGetter: (p) => p.data && new Set(getGroupsProperties(p.data.groups)).size,
        type: ['formattedNumber'],
      },
      ...[
        { headerName: 'Known Properties', isKnown: true, isVendor: false },
        { headerName: 'Unknown Properties', isKnown: false, isVendor: false },
        { headerName: 'Known Vendor Properties', isKnown: true, isVendor: true },
        { headerName: 'Unknown Vendor Properties', isKnown: false, isVendor: true },
      ].map(
        /** @returns {import('ag-grid-community').ColGroupDef<RowData>} */
        ({ headerName, isKnown, isVendor }) => {
          /**
           * @param {FilteredProperties} filteredProperties
           */
          const isFilteredPropertiesMatch = (filteredProperties) => (
            filteredProperties.isKnown === isKnown && filteredProperties.isVendor === isVendor
          );

          return {
            headerName,
            children: [
              {
                headerName: `${headerName} Count`,
                cellDataType: 'number',
                valueGetter: (p) => {
                  if (!p.data) {
                    return;
                  }

                  const findResult = p.data.filteredPropertiesList.find(isFilteredPropertiesMatch);
                  return findResult && new Set(findResult.properties).size;
                },
                type: ['formattedNumber'],
                openByDefault: true,
              },
              ...[
                ...new Set(rowData.flatMap((rowDataItem) => (
                  rowDataItem.filteredPropertiesList.find(isFilteredPropertiesMatch)?.properties ?? []
                ))),
              ]
                .toSorted()
                .map(
                  /** @returns {import('ag-grid-community').ColDef<RowData>} */
                  (property) => ({
                    headerName: property,
                    cellDataType: 'boolean',
                    valueGetter: (p) => (
                      p.data && p.data.filteredPropertiesList.find(isFilteredPropertiesMatch)?.properties.includes(property)
                    ),
                    columnGroupShow: 'open',
                  }),
                ),
            ],
          };
        },
      ),
      {
        headerName: 'Secondary Options',
        children: [
          {
            columnGroupShow: 'closed',
            filter: false,
            valueGetter: () => '{ ... }',
          },
          ...(/** @satisfies {import('ag-grid-community').NestedFieldPaths<RowData>[]} */([
            'secondaryOptions.unspecified',
            'secondaryOptions.emptyLineBeforeUnspecified',
            'secondaryOptions.emptyLineMinimumPropertyThreshold',
            'secondaryOptions.disableFix',
            'secondaryOptions.message',
            'secondaryOptions.url',
            'secondaryOptions.reportDisables',
            'secondaryOptions.severity',
          ]).map(
            /** @returns {import('ag-grid-community').ColDef<RowData>} */
            (field) => ({
              field,
              headerName: field.replace(/.*\./, ''),
              columnGroupShow: 'open',
            }),
          )),
        ],
      },
    ],
    rowSelection: {
      mode: 'multiRow',
    },
    selectionColumnDef: {
      pinned: true,
    },
    autoSizeStrategy: {
      type: 'fitCellContents',
    },
    floatingFiltersHeight: 40,
    onGridReady: handleSelectionChange,
    onRowSelected: handleSelectionChange,
    onSortChanged: handleSelectionChange,
    onFilterChanged: handleSelectionChange,
  });
};

export default setUpGrid;
