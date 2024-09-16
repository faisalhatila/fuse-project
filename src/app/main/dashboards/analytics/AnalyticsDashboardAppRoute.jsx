import { lazy } from 'react';

const AnalyticsDashboardApp = lazy(() => import('./AnalyticsDashboardApp'));
/**
 * The Analytics Dashboard App Route
 */
const AnalyticsDashboardAppRoute = {
	path: 'dashboards/analytics',
	element: <AnalyticsDashboardApp />
};
export default AnalyticsDashboardAppRoute;
