import React from 'react';
import {useParams} from 'react-router';

import CategoryObjectContainer from 'src/Components/CategoryObject/CategoryObjectContainer';

const CategoryObjectPage = () => {
	const {id} = useParams() as {id: string};
	return <CategoryObjectContainer id={id === 'new' ? undefined : Number(id)} />;
};

export default CategoryObjectPage;
