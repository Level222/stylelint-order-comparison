/**
 * @param {string} name
 * @returns {Promise<number>}
 */
const getWeeklyDownloads = async (name) => {
  const url = `https://api.npmjs.org/downloads/point/last-week/${encodeURIComponent(name).replace(/^%40/, '@')}`;
  const response = await fetch(url);

  if (!response.ok) {
    let errorText;

    try {
      errorText = (await response.json()).error;
    } catch {
      errorText = `${response.status} ${response.statusText}`;
    }

    throw new Error(errorText);
  }

  return (await response.json()).downloads;
};

/**
 * @returns {Promise<import('../utils/types.js').PackageDataWithDynamicStats[]>}
 */
const getPackageDataWithDynamicStatsList = async () => {
  const response = await fetch('../data/package-data-list.json');

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  /**
   * @type {import('type-fest').Jsonify<import('../utils/types.js').PackageData>[]}
   */
  const jsonifiedPackageDataList = await response.json();

  // Set undefined to properties that do not exist in json and add dynamic stats
  return Promise.all(
    jsonifiedPackageDataList.map(async (
      { groups, secondaryOptions: { message, url, ...restSecondaryOptions }, version, license, ...restPackageData },
    ) => ({
      groups: groups.map(
        ({ groupName, emptyLineBefore, order, ...restGroupOptions }) => ({
          groupName,
          emptyLineBefore,
          order,
          ...restGroupOptions,
        }),
      ),
      secondaryOptions: {
        message,
        url,
        ...restSecondaryOptions,
      },
      version,
      license,
      weeklyDownloads: await getWeeklyDownloads(restPackageData.name),
      ...restPackageData,
    }),
    ),
  );
};

export default getPackageDataWithDynamicStatsList;
