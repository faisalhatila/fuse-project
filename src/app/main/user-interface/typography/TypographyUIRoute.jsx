import { lazy } from 'react';

const TypographyUI = lazy(() => import('./TypographyUI'));
const TypographyUIRoute = {
	path: 'ui/typography',
	element: <TypographyUI />
};
export default TypographyUIRoute;
