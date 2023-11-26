import React from 'react';
import {isUndefined} from 'lodash';

import {selectPlacesData} from '@infomat/core/src/Redux/Places/Selectors/selectPlacesData';
import {useStoreSelector} from '@infomat/core/src/Hooks/useStoreSelector';
import Page from '@infomat/uikit/src/Page/Page';
import {selectPlacesIsLoading} from '@infomat/core/src/Redux/Places/Selectors/selectPlacesIsLoading';
import {placesClientToServerActions} from '@infomat/core/src/Redux/Places/Actions/placesClientToServerActions';
import useActionDispatcher from '@infomat/core/src/Hooks/useActionDispatcher';

import useRouterLinkForMui from 'src/Utils/Navigation/useRouterLinkForMui';
import {Routes} from 'src/Routes/Routes';

import TouristObject from './TouristObject';

const TouristObjectContainer = ({id}: TTouristObjectContainerProps) => {
	const placesObjectVM = isUndefined(id) ? undefined : useStoreSelector(selectPlacesData);
	const isLoading = useStoreSelector(selectPlacesIsLoading);
	const onDelete = useActionDispatcher(placesClientToServerActions.deleteCategory);
	const onUpdate = useActionDispatcher(placesClientToServerActions.updateCategory);
	const onCreate = useActionDispatcher(placesClientToServerActions.createCategory);
	const PlacesLink = useRouterLinkForMui(Routes.touristObjects);

	return (
		<Page
			isLoading={isLoading || (isUndefined(placesObjectVM) && !isUndefined(id))}
			backLink={PlacesLink}
			label={isUndefined(id) ? 'Создание объекта' : 'Редактирование объекта'}
		>
			<TouristObject
				id={id}
				placesObjectVM={placesObjectVM}
				onSubmit={isUndefined(id) ? onCreate : onUpdate}
				onDelete={onDelete}
			/>
		</Page>
	);
};

type TTouristObjectContainerProps = {
	id?: number;
};

export default TouristObjectContainer;
