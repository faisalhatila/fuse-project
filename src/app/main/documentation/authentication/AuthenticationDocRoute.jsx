import { lazy } from 'react';
import DocumentationPageLayout from '../DocumentationPageLayout';

const AuthenticationDoc = lazy(() => import('./AuthenticationDoc'));
/**
 * Authentication Doc Route
 */
const AuthenticationDocRoute = {
	path: 'documentation/authentication',
	element: <DocumentationPageLayout />,
	children: [
		{
			path: '',
			element: <AuthenticationDoc />
		}
	]
};
export default AuthenticationDocRoute;
