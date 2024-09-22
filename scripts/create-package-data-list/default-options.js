/**
 * @type {import('../../utils/types.js').PropertiesOrderSecondaryOptionsRequired}
 */
export const defaultPropertiesOrderSecondaryOptions = {
  unspecified: 'ignore',
  emptyLineBeforeUnspecified: 'threshold',
  emptyLineMinimumPropertyThreshold: 0,
  disableFix: false,
  message: undefined,
  url: undefined,
  reportDisables: false,
  severity: 'error',
};

/**
 * @type {import('type-fest').Except<import('../../utils/types.js').PropertiesOrderGroupRequired, 'properties'>}
 */
export const defaultPropertiesOrderGroupOptions = {
  groupName: undefined,
  emptyLineBefore: undefined,
  noEmptyLineBetween: false,
  order: undefined,
};
