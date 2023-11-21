import React, {ReactNode} from 'react';
import {SnackbarProvider} from 'notistack';
import {YMaps} from '@pbe/react-yandex-maps';

import VerticalHeightUnitAdjuster from 'src/Components/VerticalHeightUnitAdjuster';
// import NotifierContainer from 'src/Containers/NotifierContainer';
// import WebNotificationContainer from 'src/Components/WebNotifications/WebNotificationContainer';
import DocumentTitleContainer from 'src/Containers/DocumentTitleContainer';

const PageContainerDesktop = ({children}: TPageContainerProps) => (
	<>
		<DocumentTitleContainer />
		<VerticalHeightUnitAdjuster />
		<SnackbarProvider
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'center',
			}}
		>
			<YMaps query={{lang: 'ru_RU', apikey: 'f89a7ec4-649c-4e9e-b286-86fd506b69bb'}}>
				{/* <NotifierContainer /> */}
				{children}
			</YMaps>
		</SnackbarProvider>
		{/* <WebNotificationContainer /> */}
	</>
);

type TPageContainerProps = {
	children?: ReactNode;
	isOverscrollBehaviorContain?: boolean;
};

export default PageContainerDesktop;
