import { lazy } from 'react';

const FinanceDashboardApp = lazy(() => import('./FinanceDashboardApp'));
/**
 * Finance Dashboard App Route
 */
const FinanceDashboardAppRoute = {
	path: 'dashboards/finance',
	element: <FinanceDashboardApp />
};
export default FinanceDashboardAppRoute;
