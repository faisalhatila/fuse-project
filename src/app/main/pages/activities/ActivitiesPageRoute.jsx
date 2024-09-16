import { lazy } from 'react';

const ActivitiesPage = lazy(() => import('./ActivitiesPage'));
/**
 * The Activities Page Route
 */
const ActivitiesPageRoute = {
	path: 'pages/activities',
	element: <ActivitiesPage />
};
export default ActivitiesPageRoute;
