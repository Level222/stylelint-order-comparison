/**
 * @typedef {{
 *   properties: string[];
 *   emptyLineBefore?: 'always' | 'never' | 'threshold';
 *   noEmptyLineBetween?: boolean;
 *   groupName?: string;
 *   order?: 'flexible';
 * }} PropertiesOrderGroup
 */

/**
 * @typedef {WithUndefined<
 *   Required<PropertiesOrderGroup>,
 *   'groupName' | 'emptyLineBefore' | 'order'
 * >} PropertiesOrderGroupRequired
 */

/**
 * @typedef {(string | PropertiesOrderGroup)[]} PropertiesOrderPrimaryOption
 */

/**
 * @typedef {import('stylelint-define-config').SecondaryOptions & {
 *   unspecified?: 'top' | 'bottom' | 'bottomAlphabetical' | 'ignore';
 *   emptyLineBeforeUnspecified?: 'always' | 'never' | 'threshold';
 *   emptyLineMinimumPropertyThreshold?: number;
 * }} PropertiesOrderSecondaryOptions
 */

/**
 * @typedef {import('type-fest').OverrideProperties<PropertiesOrderSecondaryOptions, {
 *   message?: string;
 * }>} PropertiesOrderSecondaryOptionsJson
 */

/**
 * @template {PropertiesOrderSecondaryOptions | PropertiesOrderSecondaryOptionsJson} T
 * @typedef {WithUndefined<
 *   Required<T>,
 *   'message' | 'url'
 * >} PropertiesOrderSecondaryOptionsRequiredFactory
 */

/**
 * @typedef {PropertiesOrderSecondaryOptionsRequiredFactory<
 *   PropertiesOrderSecondaryOptions
 * >} PropertiesOrderSecondaryOptionsRequired
 */

/**
 * @typedef {PropertiesOrderSecondaryOptionsRequiredFactory<
 *   PropertiesOrderSecondaryOptionsJson
 * >} PropertiesOrderSecondaryOptionsJsonRequired
 */

/**
 * @typedef {{
 *   name: string;
 *   type: 'config' | 'order';
 *   primaryOption: PropertiesOrderPrimaryOption;
 *   secondaryOptions: PropertiesOrderSecondaryOptions | undefined;
 * }} PackageInfo
 */

/**
 * @typedef {{
 *   propertyName: string;
 *   isKnown: boolean;
 *   isVendor: boolean;
 * }} PropertyDetail
 */

/**
 * @typedef {(
 *   & Pick<
 *     PackageInfo,
 *     'name' | 'type'
 *   >
 *   & {
 *     groups: (
 *       & import('type-fest').Except<PropertiesOrderGroupRequired, 'properties'>
 *       & { propertyDetails: PropertyDetail[] }
 *     )[];
 *     secondaryOptions: PropertiesOrderSecondaryOptionsJsonRequired;
 *     version: string | undefined;
 *     license: string | undefined;
 *   }
 * )} PackageData
 */

/**
 * @typedef {PackageData & {
 *   weeklyDownloads: number;
 * }} PackageDataWithDynamicStats
 */

/**
 * @template T
 * @template {keyof T} K
 * @typedef {import('type-fest').Except<T, K> & { [P in K]: T[P] | undefined }} WithUndefined
 */
