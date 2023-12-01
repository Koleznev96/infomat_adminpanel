import React, {useCallback} from 'react';
import _ from 'lodash';

import PropertyHandler from '@infomat/core/src/Types/PropertyHandler';
import PageListIteration from '@infomat/uikit/src/PageListIteration/PageListIteration';
import SelectField from '@infomat/uikit/src/Fields/SelectField/SelectField';

import useRouterLinkForMui from 'src/Utils/Navigation/useRouterLinkForMui';
import {Routes} from 'src/Routes/Routes';

import SpecialPlaceItemContainer from './SpecialPlaceItem/SpecialPlaceItemContainer';
import style from './SpecialPlacesList.module.scss';

const filtersConst = [
	{title: 'Все объекты', id: 'null'},
	{title: 'Туалет', id: 'WC'},
	{title: 'Фотозона', id: 'PHOTO_ZONE'},
];

const SpecialPlacesList = ({
	getData,
	specialPlaceIds,
	error,
	currentPage,
	totalPage,
	size,
	isLoading,
	search,
	type,
}: TSpecialPlacesListProps) => {
	const SpecialPlaceCreateLink = useRouterLinkForMui(Routes.specialPlace());

	const filterChange = useCallback(
		(value: string) => {
			getData({page: 0, type: value === 'null' ? null : value});
		},
		[getData],
	);

	const valueFilter = !type ? 'null' : type;

	return (
		<PageListIteration
			numberPages={totalPage}
			startSearch={search}
			isLoading={isLoading}
			isEmptyList={_.isEmpty(specialPlaceIds)}
			getData={getData}
			labelAdd="Добавить объект"
			addLink={SpecialPlaceCreateLink}
			startCrrentPageNumber={currentPage}
			startValueLimit={size}
			FilterComponent={
				<div className={style.filter}>
					<SelectField items={filtersConst} value={valueFilter} onChange={(e) => filterChange(String(e))} />
				</div>
			}
		>
			<div className={style.container}>
				{_.map(specialPlaceIds, (id) => (
					<SpecialPlaceItemContainer key={id} id={id} />
				))}
			</div>
		</PageListIteration>
	);
};

type TSpecialPlacesListProps = {
	specialPlaceIds?: number[];
	currentPage: number;
	isLoading?: boolean;
	search: string;
	size: number;
	totalPage: number;
	error?: string;
	type?: string | null;
	getData: PropertyHandler<{page?: number; size?: number; search?: string; type?: string | null}>;
};

export default SpecialPlacesList;
