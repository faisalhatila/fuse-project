import { lazy } from 'react';

const CalendarApp = lazy(() => import('./CalendarApp'));
/**
 * The Calendar App Route.
 */
const CalendarAppRoute = {
	path: 'apps/calendar',
	element: <CalendarApp />
};
export default CalendarAppRoute;
