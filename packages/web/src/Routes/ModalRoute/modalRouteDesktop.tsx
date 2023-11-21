import {Route} from 'react-router-dom';
import React, {Suspense, lazy} from 'react';

import {EnumRouteSlugs} from 'src/Routes/EnumRouteSlugs';
import {EnumPageVariant} from 'src/Routes/Pages/Common/EnumPageVariant';

const ReportModalContainer = lazy(() => import('src/Routes/Pages/Common/ReportModal/ReportModalContainer'));

export const modalRouteDesktop = (
	<Route path={EnumRouteSlugs.MODAL}>
		<Route
			path={EnumRouteSlugs.REPORT}
			element={
				<Suspense>
					<ReportModalContainer variant={EnumPageVariant.desktop} />
				</Suspense>
			}
		/>
	</Route>
);
