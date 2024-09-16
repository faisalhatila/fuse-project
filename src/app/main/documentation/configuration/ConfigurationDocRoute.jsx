import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import DocumentationPageLayout from '../DocumentationPageLayout';

const SettingsDoc = lazy(() => import('./settings/SettingsDoc'));
const RoutingDoc = lazy(() => import('./routing/RoutingDoc'));
const NavigationDoc = lazy(() => import('./navigation/NavigationDoc'));
/**
 * Configuration Doc Route
 */
const ConfigurationDocRoute = {
	path: 'documentation/configuration',
	element: <DocumentationPageLayout />,
	children: [
		{
			path: '',
			element: <Navigate to="settings" />
		},
		{
			path: 'settings',
			element: <SettingsDoc />
		},
		{
			path: 'routing',
			element: <RoutingDoc />
		},
		{
			path: 'navigation',
			element: <NavigationDoc />
		}
	]
};
export default ConfigurationDocRoute;
