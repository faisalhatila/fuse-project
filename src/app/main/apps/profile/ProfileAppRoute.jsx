import { lazy } from 'react';

const ProfileApp = lazy(() => import('./ProfileApp'));
/**
 * The Profile App Route.
 */
const ProfileAppRoute = {
	path: 'apps/profile',
	element: <ProfileApp />
};
export default ProfileAppRoute;
