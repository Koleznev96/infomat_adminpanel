import React from 'react';
import _ from 'lodash';

import PropertyHandler from '@infomat/core/src/Types/PropertyHandler';
import PageListIteration from '@infomat/uikit/src/PageListIteration/PageListIteration';

import useRouterLinkForMui from 'src/Utils/Navigation/useRouterLinkForMui';
import {Routes} from 'src/Routes/Routes';

import CategoryObjectItemContainer from './CategoryObjectItem/CategoryObjectItemContainer';
import style from './CategoryObjectsList.module.scss';

const CategoryObjectsList = ({
	getData,
	categoryObjectIds,
	error,
	currentPage,
	totalPage,
	size,
	isLoading,
	search,
}: TCategoryObjectsListProps) => {
	const TouristObjectCreateLink = useRouterLinkForMui(Routes.categoryObject());

	return (
		<PageListIteration
			numberPages={totalPage}
			startSearch={search}
			isLoading={isLoading}
			isEmptyList={_.isEmpty(categoryObjectIds)}
			getData={getData}
			labelAdd="Добавить объект"
			addLink={TouristObjectCreateLink}
			startCrrentPageNumber={currentPage}
			startValueLimit={size}
		>
			<div className={style.container}>
				{_.map(categoryObjectIds, (id) => (
					<CategoryObjectItemContainer key={id} id={id} />
				))}
			</div>
		</PageListIteration>
	);
};

type TCategoryObjectsListProps = {
	categoryObjectIds?: number[];
	currentPage: number;
	isLoading?: boolean;
	search: string;
	size: number;
	totalPage: number;
	error?: string;
	getData: PropertyHandler<{page?: number; size?: number; search?: string}>;
};

export default CategoryObjectsList;
