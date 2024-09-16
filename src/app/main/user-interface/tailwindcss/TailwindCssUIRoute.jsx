import { lazy } from 'react';

const TailwindCssUI = lazy(() => import('./TailwindCssUI'));
const TailwindCssUIRoute = {
	path: 'ui/tailwindcss',
	element: <TailwindCssUI />
};
export default TailwindCssUIRoute;
