import React from 'react';
import {isUndefined} from 'lodash';

import {useStoreSelector} from '@infomat/core/src/Hooks/useStoreSelector';
import Page from '@infomat/uikit/src/Page/Page';
import useActionDispatcher from '@infomat/core/src/Hooks/useActionDispatcher';
import {selectEventsData} from '@infomat/core/src/Redux/Events/Selectors/selectEventsData';
import {selectEventsIsLoading} from '@infomat/core/src/Redux/Events/Selectors/selectEventsIsLoading';
import {eventsClientToServerActions} from '@infomat/core/src/Redux/Events/Actions/eventsClientToServerActions';

import useRouterLinkForMui from 'src/Utils/Navigation/useRouterLinkForMui';
import {Routes} from 'src/Routes/Routes';

import EventObject from './EventObject';

const EventObjectContainer = ({id}: TEventObjectContainerProps) => {
	const eventsObjectVM = useStoreSelector(selectEventsData);
	const isLoading = useStoreSelector(selectEventsIsLoading);
	const onDelete = useActionDispatcher(eventsClientToServerActions.deleteCategory);
	const onUpdate = useActionDispatcher(eventsClientToServerActions.updateCategory);
	const onCreate = useActionDispatcher(eventsClientToServerActions.createCategory);
	const EventsLink = useRouterLinkForMui(Routes.touristObjects);

	const dataVM = isUndefined(id) ? undefined : eventsObjectVM;

	return (
		<Page
			isLoading={isLoading || (isUndefined(dataVM) && !isUndefined(id))}
			backLink={EventsLink}
			label={isUndefined(id) ? 'Создание мероприятия' : 'Редактирование мероприятия'}
		>
			<EventObject
				id={id}
				eventsObjectVM={dataVM}
				onSubmit={isUndefined(id) ? onCreate : onUpdate}
				onDelete={onDelete}
			/>
		</Page>
	);
};

type TEventObjectContainerProps = {
	id?: number;
};

export default EventObjectContainer;
