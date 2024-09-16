import { lazy } from 'react';

const ProjectDashboardApp = lazy(() => import('./ProjectDashboardApp'));
/**
 * Project Dashboard App  Route
 */
const ProjectDashboardAppRoute = {
	path: 'dashboards/project',
	element: <ProjectDashboardApp />
};
export default ProjectDashboardAppRoute;
