// @ts-ignore
import stylelintOrderRules from 'stylelint-order/rules/index.js';
import strictlyNormalizeRuleSettings from './strictly-normalize-rule-settings.js';

/**
 * @param {string} packageFilePath
 * @returns {string}
 */
const extractPackageName = (packageFilePath) => {
  const match = packageFilePath.match(/^((?:@[^/]+\/)?[^/]+)/);

  if (!match) {
    throw new TypeError('Failed to extract package name.');
  }

  return match[1];
};

/**
 * @param {string} packageFilePath
 * @returns {Promise<import('../../utils/types.js').PackageInfo>}
 */
export const importPackageInfoFromConfig = async (packageFilePath) => {
  const name = extractPackageName(packageFilePath);

  /**
   * @type {import('../../stylelint/types/stylelint/index.mjs').Config}
   */
  const config = (await import(packageFilePath)).default;

  const { rules } = config;

  if (!rules) {
    throw new TypeError(`Missing rules.${name}`);
  }

  const rawPropertiesOrder = rules['order/properties-order'];

  if (!rawPropertiesOrder) {
    throw new TypeError('Missing rule order/properties-order.');
  }

  const { primaryOption, secondaryOptions } = strictlyNormalizeRuleSettings(
    rawPropertiesOrder,
    stylelintOrderRules['properties-order'],
  );

  return {
    name,
    type: 'config',
    primaryOption,
    secondaryOptions,
  };
};

/**
 * @param {string} packageName
 * @returns {Promise<import('../../utils/types.js').PackageInfo>}
 */
export const importPackageInfoLikeRationalOrder = async (packageName) => {
  /**
   * @type {() => import('../../utils/types.js').PropertiesOrderGroup[]}
   */
  const configCreator = (await import(`${packageName}/config/configCreator.js`)).default;

  return {
    name: packageName,
    type: 'config',
    primaryOption: configCreator(),
    secondaryOptions: undefined,
  };
};
