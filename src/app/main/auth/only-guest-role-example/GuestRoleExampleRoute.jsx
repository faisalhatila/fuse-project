import GuestRoleExample from './GuestRoleExample';
import authRoles from '../../../auth/authRoles';
/**
 * GuestRoleExampleRoute
 */
const GuestRoleExampleRoute = {
	path: 'auth/guest-role-example',
	element: <GuestRoleExample />,
	auth: authRoles.onlyGuest // ['guest']
};
export default GuestRoleExampleRoute;
