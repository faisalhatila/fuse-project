import { lazy } from 'react';

const CryptoDashboardApp = lazy(() => import('./CryptoDashboardApp'));
/**
 * Crypto Dashboard App Route
 */
const CryptoDashboardAppRoute = {
	path: 'dashboards/crypto',
	element: <CryptoDashboardApp />
};
export default CryptoDashboardAppRoute;
