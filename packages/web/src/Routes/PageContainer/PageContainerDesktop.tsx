import React, {ReactNode, useEffect} from 'react';
import {SnackbarProvider} from 'notistack';
import {YMaps} from '@pbe/react-yandex-maps';
import {useDispatch} from 'react-redux';

import VerticalHeightUnitAdjuster from 'src/Components/VerticalHeightUnitAdjuster';
import DocumentTitleContainer from 'src/Containers/DocumentTitleContainer';
import {userClientOnlyActions} from '@infomat/core/src/Redux/User/Actions/userClientOnlyActions';

import NotifierContainer from 'src/Containers/NotifierContainer';

const PageContainerDesktop = ({children}: TPageContainerProps) => {
	const dispatch = useDispatch();

	useEffect(() => {
		const handleOnline = () => {
			dispatch(userClientOnlyActions.updateNetworkStatus(navigator.onLine));
		};

		window.addEventListener('online', handleOnline);
		window.addEventListener('offline', handleOnline);

		return () => {
			window.removeEventListener('online', handleOnline);
			window.removeEventListener('offline', handleOnline);
		};
	}, [dispatch]);

	return (
		<>
			<DocumentTitleContainer />
			<VerticalHeightUnitAdjuster />
			<SnackbarProvider
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
			>
				<YMaps query={{lang: 'ru_RU', apikey: 'f89a7ec4-649c-4e9e-b286-86fd506b69bb'}}>
					<NotifierContainer />
					{children}
				</YMaps>
			</SnackbarProvider>
			{/* <WebNotificationContainer /> */}
		</>
	);
};

type TPageContainerProps = {
	children?: ReactNode;
	isOverscrollBehaviorContain?: boolean;
};

export default PageContainerDesktop;
