import React, {useState} from 'react';
import {map, noop} from 'lodash';

import PropertyHandler from '@infomat/core/src/Types/PropertyHandler';
import PageListIteration from '@infomat/uikit/src/PageListIteration/PageListIteration';

import useRouterLinkForMui from 'src/Utils/Navigation/useRouterLinkForMui';
import {Routes} from 'src/Routes/Routes';

import CategoryObjectItemContainer from './CategoryObjectItem/CategoryObjectItemContainer';
import style from './CategoryObjectsList.module.scss';

const itemIdsConst = ['asds', 'sdfg', 'dsfg', '896', 'cxvb', 'q', 'a', 's', 'd'];

const CategoryObjectsList = ({onSubmit, onDelete, itemIds = itemIdsConst}: TCategoryObjectsListProps) => {
	const TouristObjectCreateLink = useRouterLinkForMui(Routes.categoryObject());
	const [search, setSearch] = useState('');

	return (
		<PageListIteration
			onLoadPage={noop}
			changeValueLimit={noop}
			labelAdd="Добавить объект"
			chengeSearch={setSearch}
			addLink={TouristObjectCreateLink}
		>
			<div className={style.container}>
				{map(itemIds, (id) => (
					<CategoryObjectItemContainer key={id} id={id} />
				))}
			</div>
		</PageListIteration>
	);
};

type TCategoryObjectsListProps = {
	login?: string;
	onSubmit: PropertyHandler;
	onDelete?: PropertyHandler;
	itemIds?: string[];
};

export default CategoryObjectsList;
