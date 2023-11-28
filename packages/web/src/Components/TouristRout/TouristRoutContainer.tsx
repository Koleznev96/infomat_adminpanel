import React from 'react';
import {isUndefined} from 'lodash';

import {selectRoutesData} from '@infomat/core/src/Redux/Routes/Selectors/selectRoutesData';
import {useStoreSelector} from '@infomat/core/src/Hooks/useStoreSelector';
import Page from '@infomat/uikit/src/Page/Page';
import {selectRoutesIsLoading} from '@infomat/core/src/Redux/Routes/Selectors/selectRoutesIsLoading';
import {routesClientToServerActions} from '@infomat/core/src/Redux/Routes/Actions/routesClientToServerActions';
import useActionDispatcher from '@infomat/core/src/Hooks/useActionDispatcher';

import useRouterLinkForMui from 'src/Utils/Navigation/useRouterLinkForMui';
import {Routes} from 'src/Routes/Routes';

import TouristRout from './TouristRout';

const TouristRoutContainer = ({id}: TTouristRoutContainerProps) => {
	const routesVM = useStoreSelector(selectRoutesData);
	const isLoading = useStoreSelector(selectRoutesIsLoading);
	const onDelete = useActionDispatcher(routesClientToServerActions.deleteCategory);
	const onUpdate = useActionDispatcher(routesClientToServerActions.updateCategory);
	const onCreate = useActionDispatcher(routesClientToServerActions.createCategory);
	const RoutesLink = useRouterLinkForMui(Routes.touristRoutes);

	const dataVM = isUndefined(id) ? undefined : routesVM;

	return (
		<Page
			isLoading={isLoading || (isUndefined(dataVM) && !isUndefined(id))}
			backLink={RoutesLink}
			label={isUndefined(id) ? 'Создание маршрута' : 'Редактирование маршрута'}
		>
			<TouristRout id={id} routesVM={dataVM} onSubmit={isUndefined(id) ? onCreate : onUpdate} onDelete={onDelete} />
		</Page>
	);
};

type TTouristRoutContainerProps = {
	id?: number;
};

export default TouristRoutContainer;
