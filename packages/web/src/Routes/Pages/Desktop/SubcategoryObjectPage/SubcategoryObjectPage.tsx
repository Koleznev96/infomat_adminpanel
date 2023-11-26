import React from 'react';
import {useParams} from 'react-router';

import SubcategoryObjectContainer from 'src/Components/SubcategoryObject/SubcategoryObjectContainer';

const SubcategoryObjectPage = () => {
	const {id} = useParams() as {id: string};

	return <SubcategoryObjectContainer id={id === 'new' ? undefined : Number(id)} />;
};

export default SubcategoryObjectPage;
