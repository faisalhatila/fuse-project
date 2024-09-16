import authRoles from 'src/app/auth/authRoles';
import AdminRoleExample from './AdminRoleExample';
/**
 * The AdminRoleExample Route
 */
const AdminRoleExampleRoute = {
	path: 'auth/admin-role-example',
	element: <AdminRoleExample />,
	auth: authRoles.admin // ['admin']
};
export default AdminRoleExampleRoute;
