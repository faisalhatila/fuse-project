import { lazy } from 'react';

const NotesApp = lazy(() => import('./NotesApp'));
/**
 * The Notes App Route
 */
const NotesAppRoute = {
	path: 'apps/notes',
	children: [
		{
			path: '',
			element: <NotesApp />,
			exact: true
		},
		{
			path: ':filter',
			element: <NotesApp />,
			children: [
				{
					path: ':id'
				}
			]
		}
	]
};
export default NotesAppRoute;
