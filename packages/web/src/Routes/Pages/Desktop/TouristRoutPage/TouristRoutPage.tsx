import React from 'react';
import {useParams} from 'react-router';

import TouristRoutContainer from 'src/Components/TouristRout/TouristRoutContainer';

const TouristRoutPage = () => {
	const {id} = useParams() as {id: string};

	return <TouristRoutContainer id={id === 'new' ? undefined : Number(id)} />;
};

export default TouristRoutPage;
