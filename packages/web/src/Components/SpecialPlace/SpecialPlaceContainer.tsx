import React from 'react';
import {isUndefined} from 'lodash';

import {useStoreSelector} from '@infomat/core/src/Hooks/useStoreSelector';
import {selectSpecialPlacesData} from '@infomat/core/src/Redux/SpecialPlace/Selectors/selectSpecialPlacesData';
import {specialPlacesClientToServerActions} from '@infomat/core/src/Redux/SpecialPlace/Actions/specialPlacesClientToServerActions';
import useActionDispatcher from '@infomat/core/src/Hooks/useActionDispatcher';
import {selectSpecialPlacesIsLoading} from '@infomat/core/src/Redux/SpecialPlace/Selectors/selectSpecialPlacesIsLoading';
import Page from '@infomat/uikit/src/Page/Page';

import useRouterLinkForMui from 'src/Utils/Navigation/useRouterLinkForMui';
import {Routes} from 'src/Routes/Routes';

import SpecialPlace from './SpecialPlace';

const SpecialPlaceContainer = ({id}: TSpecialPlaceContainerProps) => {
	const specialPlaceVM = useStoreSelector(selectSpecialPlacesData);
	const isLoading = useStoreSelector(selectSpecialPlacesIsLoading);
	const onDelete = useActionDispatcher(specialPlacesClientToServerActions.deleteCategory);
	const onUpdate = useActionDispatcher(specialPlacesClientToServerActions.updateCategory);
	const onCreate = useActionDispatcher(specialPlacesClientToServerActions.createCategory);
	const SpecialPlacesLink = useRouterLinkForMui(Routes.specialPlaces);

	const dataVM = isUndefined(id) ? undefined : specialPlaceVM;

	return (
		<Page
			isLoading={isLoading || (isUndefined(dataVM) && !isUndefined(id))}
			backLink={SpecialPlacesLink}
			label={isUndefined(id) ? 'Создание объекта' : 'Редактирование объекта'}
		>
			<SpecialPlace
				id={id}
				specialPlaceVM={dataVM}
				onSubmit={isUndefined(id) ? onCreate : onUpdate}
				onDelete={onDelete}
			/>
		</Page>
	);
};

type TSpecialPlaceContainerProps = {
	id?: number;
};

export default SpecialPlaceContainer;
