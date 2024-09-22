import { pick } from '../../utils/helpers.js';
import { defaultPropertiesOrderGroupOptions } from './default-options.js';

/**
 * @param {import("../../utils/types.js").PropertiesOrderPrimaryOption} primaryOption
 * @returns {import("../../utils/types.js").PropertiesOrderGroupRequired[]}
 */
const normalizePropertiesOrderPrimaryOptions = (primaryOption) => {
  /**
   * @type {import('../../utils/types.js').PropertiesOrderGroupRequired[]}
   */
  const groups = [];
  let isPrevItemString = false;

  for (const item of primaryOption) {
    const isItemString = typeof item === 'string';

    if (isItemString) {
      if (isPrevItemString) {
        groups[groups.length - 1].properties.push(item);
      } else {
        groups.push({
          properties: [item],
          ...defaultPropertiesOrderGroupOptions,
        });
      }
    } else {
      groups.push(
        // Omit extra properties
        pick(
          { ...defaultPropertiesOrderGroupOptions, ...item },
          ['properties', 'groupName', 'emptyLineBefore', 'noEmptyLineBetween', 'order'],
        ),
      );
    }

    isPrevItemString = isItemString;
  };

  return groups;
};

export default normalizePropertiesOrderPrimaryOptions;
