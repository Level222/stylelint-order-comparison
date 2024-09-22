import normalizeRuleSettings from '../../stylelint/lib/normalizeRuleSettings.mjs';

/**
 * @template T
 * @template {object} O
 * @param {import('../../stylelint/types/stylelint/index.mjs').ConfigRuleSettings<T, O>} rawSettings
 * @param {import('../../stylelint/types/stylelint/index.mjs').Rule<T, O>} rule
 * @return {{
 *   primaryOption: T;
 *   secondaryOptions: O | undefined;
 * }}
 */
const strictlyNormalizeRuleSettings = (rawSettings, rule) => {
  const result = normalizeRuleSettings(rawSettings, rule);

  if (result === null) {
    throw new TypeError('Failed to normalize rule settings');
  }

  const [primaryOption, secondaryOptions] = result;

  return { primaryOption, secondaryOptions };
};

export default strictlyNormalizeRuleSettings;
