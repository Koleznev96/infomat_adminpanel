import React from 'react';
import {useParams} from 'react-router';

import TouristObjectContainer from 'src/Components/TouristObject/TouristObjectContainer';

const TouristObjectPage = () => {
	const {id} = useParams() as {id: string};

	return <TouristObjectContainer id={id === 'new' ? undefined : Number(id)} />;
};

export default TouristObjectPage;
