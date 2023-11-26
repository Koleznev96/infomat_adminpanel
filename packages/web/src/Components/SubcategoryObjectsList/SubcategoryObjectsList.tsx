import React, {useCallback, useState} from 'react';
import {Typography} from '@mui/material';
import _ from 'lodash';

import PropertyHandler from '@infomat/core/src/Types/PropertyHandler';
import PageListIteration from '@infomat/uikit/src/PageListIteration/PageListIteration';
import SelectField from '@infomat/uikit/src/Fields/SelectField/SelectField';

import useRouterLinkForMui from 'src/Utils/Navigation/useRouterLinkForMui';
import {Routes} from 'src/Routes/Routes';

import SubcategoryObjectItemContainer from './SubcategoryObjectItem/SubcategoryObjectItemContainer';
import style from './SubcategoryObjectsList.module.scss';

const filtersConst = [
	{title: 'Категории объектов', id: 0},
	{title: 'Все объекты', id: 1},
];

const SubcategoryObjectsList = ({
	getData,
	setIndexFilter,
	subcategoryObjectIds,
	subcategoryGroupedVMs,
	indexFilter,
	currentPage,
	totalPage,
	size,
	isLoading,
	search,
}: TSubcategoryObjectsListProps) => {
	const TouristObjectCreateLink = useRouterLinkForMui(Routes.subcategoryObject());
	const [filter, setFilter] = useState(indexFilter || 0);

	const filterChange = useCallback(
		(value: number) => {
			setIndexFilter(value);
			setFilter(value);
		},
		[setIndexFilter, setFilter],
	);

	const isShowCat = filter === 0;

	return (
		<PageListIteration
			numberPages={totalPage}
			startSearch={search}
			isLoading={isLoading}
			isEmptyList={_.isEmpty(subcategoryObjectIds)}
			getData={getData}
			labelAdd="Добавить объект"
			addLink={TouristObjectCreateLink}
			startCrrentPageNumber={currentPage}
			startValueLimit={size}
			FilterComponent={
				<div className={style.filter}>
					<SelectField items={filtersConst} value={filter} onChange={(e) => filterChange(Number(e))} />
				</div>
			}
		>
			<div className={style.container}>
				{isShowCat
					? _.map(subcategoryGroupedVMs, ({title, ids}, index) => (
							<div key={index} className={style.item}>
								<Typography className={style.itemLabel}>{title}</Typography>
								{_.map(ids, (id) => (
									<SubcategoryObjectItemContainer key={id} id={id} />
								))}
							</div>
					  ))
					: _.map(subcategoryObjectIds, (id) => <SubcategoryObjectItemContainer key={id} id={id} />)}
			</div>
		</PageListIteration>
	);
};

type TSubcategoryObjectsListProps = {
	subcategoryObjectIds?: number[];
	currentPage: number;
	isLoading?: boolean;
	search: string;
	size: number;
	totalPage: number;
	error?: string;
	indexFilter: number;
	subcategoryGroupedVMs?: {title: string; ids: number[]}[];
	setIndexFilter: PropertyHandler<number>;
	getData: PropertyHandler<{page?: number; size?: number; search?: string}>;
};

export default SubcategoryObjectsList;
