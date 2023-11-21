import React from 'react';
import {useParams} from 'react-router';

import EventsListContainer from 'src/Components/EventsList/EventsListContainer';

const EventsListPage = () => {
	const {id} = useParams() as {id: string};
	return <EventsListContainer id={id} />;
};

export default EventsListPage;
