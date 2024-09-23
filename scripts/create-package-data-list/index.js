import fs from 'node:fs/promises';
import path from 'node:path';
import createPackageData from './create-package-data.js';
import packageInfoList from './package-info-list.js';

const packageDataList = await Promise.all(packageInfoList.map(createPackageData));
const outPath = path.resolve(import.meta.dirname, '../../data/package-data-list.json');
await fs.writeFile(outPath, `${JSON.stringify(packageDataList)}\n`);
