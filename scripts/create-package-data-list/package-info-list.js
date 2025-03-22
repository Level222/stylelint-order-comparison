// @ts-ignore
import stylelintOrderRules from 'stylelint-order/rules/index.js';
import stylelintSemanticGroups from 'stylelint-semantic-groups';
import { importPackageInfoFromConfig, importPackageInfoLikeRationalOrder } from './package-info-importers.js';
import strictlyNormalizeRuleSettings from './strictly-normalize-rule-settings.js';

/**
 * @type {import('../../utils/types.js').PackageInfo[]}
 */
const packageInfoList = [
  ...await Promise.all([
    'stylelint-config-recess-order',
    'stylelint-config-idiomatic-order',
    'stylelint-config-clean-order',
    'stylelint-config-property-sort-order-smacss',
    'stylelint-config-concentric-order',
    'stylelint-config-neon-order/order.js',
    'stylelint-order-htmlacademy/index.js',
    '@pragmatics/stylelint-config-order',
    '@jothsa/stylelint-config-idiomatic-order',
    'stylelint-logical-order',
    'stylelint-config-pretty-order',
    '@qxy/stylelint-config-order',
    'stylelint-config-hudochenkov/order.js',
  ].map(importPackageInfoFromConfig)),
  ...await Promise.all([
    'stylelint-config-rational-order',
    'stylelint-config-rational-order-fix',
    '@1024pix/stylelint-config-rational-order',
    '@zilahir/stylelint-config-rational-order',
    'stylelint-config-rational-declaration',
    '@web-io/stylelint-config-rational-order',
  ].map(importPackageInfoLikeRationalOrder)),
  {
    name: 'stylelint-semantic-groups',
    type: 'order',
    ...strictlyNormalizeRuleSettings(
      /** @type {any} */(stylelintSemanticGroups.propertyOrdering),
      stylelintOrderRules['properties-order'],
    ),
  },
];

export default packageInfoList;
