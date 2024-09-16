import { lazy } from 'react';
import DocumentationPageLayout from '../DocumentationPageLayout';

const ChangelogDoc = lazy(() => import('./ChangelogDoc'));
/**
 * Changelog Doc Route
 */
const ChangelogDocRoute = {
	path: 'documentation/changelog',
	element: <DocumentationPageLayout />,
	children: [
		{
			path: '',
			element: <ChangelogDoc />
		}
	]
};
export default ChangelogDocRoute;
