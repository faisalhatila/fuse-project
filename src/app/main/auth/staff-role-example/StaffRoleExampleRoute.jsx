import StaffRoleExample from './StaffRoleExample';
import authRoles from '../../../auth/authRoles';
/**
 * StaffRoleExampleConfig
 */
const StaffRoleExampleRoute = {
	path: 'auth/staff-role-example',
	element: <StaffRoleExample />,
	auth: authRoles.staff // ['admin','staff']
};
export default StaffRoleExampleRoute;
