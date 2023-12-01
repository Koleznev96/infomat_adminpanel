import React from 'react';
import {useParams} from 'react-router';

import SpecialPlaceContainer from 'src/Components/SpecialPlace/SpecialPlaceContainer';

const SpecialPlacePage = () => {
	const {id} = useParams() as {id: string};
	return <SpecialPlaceContainer id={id === 'new' ? undefined : Number(id)} />;
};

export default SpecialPlacePage;
