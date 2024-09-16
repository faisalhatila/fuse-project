import { lazy } from 'react';

const MaintenancePage = lazy(() => import('./MaintenancePage'));
/**
 * Maintenance Page Route
 */
const MaintenancePageRoute = {
	path: 'pages/maintenance',
	element: <MaintenancePage />
};
export default MaintenancePageRoute;
