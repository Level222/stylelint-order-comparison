/**
 * @template {object} TObj
 * @template {keyof TObj} TKeys
 * @param {TObj} obj
 * @param {TKeys[]} properties
 */
export const pick = (obj, properties) => /** @type {Pick<TObj, TKeys>} */(
  Object.fromEntries(
    properties.flatMap((property) => property in obj ? [[property, obj[property]]] : []),
  )
);
