import fs from 'node:fs/promises';
import path from 'node:path';
import { all as allKnownProperties } from 'known-css-properties';
// @ts-ignore
import vendor from 'stylelint-order/utils/vendor.js';
import { pick } from '../../utils/helpers.js';
import { defaultPropertiesOrderSecondaryOptions } from './default-options.js';
import normalizePropertiesOrderPrimaryOptions from './normalize-properties-order-primary-option.js';

/**
 * @param {string} name
 * @returns {Promise<import('type-fest').PackageJson>}
 */
const getPackageJson = async (name) => {
  const filePath = path.resolve(import.meta.dirname, '../../node_modules', name, 'package.json');
  return JSON.parse(await fs.readFile(filePath, 'utf8'));
};

/**
 * @param {string} propertyName
 * @returns {import('../../utils/types.js').PropertyDetail}
 */
const createPropertyDetail = (propertyName) => ({
  propertyName,
  isKnown: allKnownProperties.includes(propertyName),
  isVendor: !!vendor.prefix(propertyName),
});

/**
 * @param {import('../../utils/types.js').PackageInfo} packageInfo
 * @returns {Promise<import('../../utils/types.js').PackageData>}
 */
const createPackageData = async (packageInfo) => {
  const {
    name,
    type,
    primaryOption,
    secondaryOptions: partialSecondaryOptions,
  } = packageInfo;
  const { version, license } = await getPackageJson(name);

  const groups = normalizePropertiesOrderPrimaryOptions(primaryOption)
    .map(({ properties, ...restOptions }) => ({
      propertyDetails: properties.map(createPropertyDetail),
      ...restOptions,
    }));

  // Omit extra properties
  const secondaryOptionsNoJson = pick(
    { ...defaultPropertiesOrderSecondaryOptions, ...partialSecondaryOptions },
    [
      'emptyLineBeforeUnspecified',
      'emptyLineMinimumPropertyThreshold',
      'unspecified',
      'disableFix',
      'message',
      'url',
      'reportDisables',
      'severity',
    ],
  );

  const secondaryOptions = {
    ...secondaryOptionsNoJson,
    message: secondaryOptionsNoJson.message && String(secondaryOptionsNoJson.message),
  };

  return { name, type, version, license, groups, secondaryOptions };
};

export default createPackageData;
