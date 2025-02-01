import stylelintConfigRationalOrder1024PixConfigCreator from '@1024pix/stylelint-config-rational-order/config/configCreator.js';
import stylelintConfigRationalOrderWebIoConfigCreator from '@web-io/stylelint-config-rational-order/config/configCreator.js';
import stylelintConfigRationalOrderZilahirConfigCreator from '@zilahir/stylelint-config-rational-order/config/configCreator.js';
import stylelintConfigRationalDeclarationConfigCreator from 'stylelint-config-rational-declaration/config/configCreator.js';
import stylelintCOnfigRationalOrderFixConfigCreator from 'stylelint-config-rational-order-fix/config/configCreator.js';
import stylelintConfigRationalOrderConfigCreator from 'stylelint-config-rational-order/config/configCreator.js';
import stylelintOrderRules from 'stylelint-order/rules/index.js';
import stylelintSemanticGroups from 'stylelint-semantic-groups';
import importPackageInfoFromConfig from './import-package-info-from-config.js';
import strictlyNormalizeRuleSettings from './strictly-normalize-rule-settings.js';

const stylelintSemanticGroupsPropertiesOrder = strictlyNormalizeRuleSettings(
  /** @type {any} */(stylelintSemanticGroups.propertyOrdering),
  stylelintOrderRules['properties-order'],
);

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
  {
    name: 'stylelint-config-rational-order',
    type: 'config',
    primaryOption: stylelintConfigRationalOrderConfigCreator(),
    secondaryOptions: undefined,
  },
  {
    name: 'stylelint-semantic-groups',
    type: 'order',
    ...stylelintSemanticGroupsPropertiesOrder,
  },
  {
    name: 'stylelint-config-rational-order-fix',
    type: 'config',
    primaryOption: stylelintCOnfigRationalOrderFixConfigCreator(),
    secondaryOptions: undefined,
  },
  {
    name: '@1024pix/stylelint-config-rational-order',
    type: 'config',
    primaryOption: stylelintConfigRationalOrder1024PixConfigCreator(),
    secondaryOptions: undefined,
  },
  {
    name: '@zilahir/stylelint-config-rational-order',
    type: 'config',
    primaryOption: stylelintConfigRationalOrderZilahirConfigCreator(),
    secondaryOptions: undefined,
  },
  {
    name: 'stylelint-config-rational-declaration',
    type: 'config',
    primaryOption: stylelintConfigRationalDeclarationConfigCreator(),
    secondaryOptions: undefined,
  },
  {
    name: '@web-io/stylelint-config-rational-order',
    type: 'config',
    primaryOption: stylelintConfigRationalOrderWebIoConfigCreator(),
    secondaryOptions: undefined,
  },
];

export default packageInfoList;
