import { lazy } from 'react';

const FileManagerApp = lazy(() => import('./FileManagerApp'));
/**
 * The File Manager App Route.
 */
const FileManagerAppRoute = {
	path: 'apps/file-manager',
	element: <FileManagerApp />,
	children: [
		{
			element: <FileManagerApp />,
			path: ':folderId'
		}
	]
};
export default FileManagerAppRoute;
