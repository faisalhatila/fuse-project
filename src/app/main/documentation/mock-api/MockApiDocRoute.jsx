import { lazy } from 'react';

const MockApiDoc = lazy(() => import('./MockApiDoc'));
/**
 * Mock Api Doc Route
 */
const MockApiDocRoute = {
	path: 'documentation',
	children: [
		{
			path: 'mock-api',
			element: <MockApiDoc />
		}
	]
};
export default MockApiDocRoute;
