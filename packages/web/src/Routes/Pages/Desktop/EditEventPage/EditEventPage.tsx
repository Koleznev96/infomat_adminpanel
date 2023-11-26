import React from 'react';
import {useParams} from 'react-router';

import EventObjectContainer from 'src/Components/EventObject/EventObjectContainer';

const EditEventPage = () => {
	const {id} = useParams() as {id: string};
	return <EventObjectContainer id={id === 'new' ? undefined : Number(id)} />;
};

export default EditEventPage;
