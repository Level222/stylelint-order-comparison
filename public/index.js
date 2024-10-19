import getPackageDataWithDynamicStatsList from './get-package-data-with-dynamic-stats-list.js';
import setUpGrid from './set-up-grid.js';

const gridElement = document.getElementById('grid');
const ordersElement = document.getElementById('orders');

if (!gridElement || !ordersElement) {
  throw new TypeError('Failed to find element.');
}

getPackageDataWithDynamicStatsList().then((packageDataWithDynamicStatsList) => {
  setUpGrid(gridElement, ordersElement, packageDataWithDynamicStatsList);
});
