import { lazy } from 'react';

const NotificationsApp = lazy(() => import('./NotificationsApp'));
/**
 * The Notifications App Route.
 */
const NotificationsAppRoute = {
	path: 'apps/notifications',
	children: [
		{
			path: '',
			element: <NotificationsApp />,
			exact: true
		}
	]
};
export default NotificationsAppRoute;
