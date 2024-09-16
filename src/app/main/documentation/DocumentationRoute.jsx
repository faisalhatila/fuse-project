import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const DocumentationPageLayout = lazy(() => import('./DocumentationPageLayout'));
/**
 * Documentation Route
 */
const DocumentationRoute = {
	path: 'documentation',
	element: <DocumentationPageLayout />,
	children: [
		{
			path: '',
			element: <Navigate to="getting-started/introduction" />
		}
	]
};
export default DocumentationRoute;
