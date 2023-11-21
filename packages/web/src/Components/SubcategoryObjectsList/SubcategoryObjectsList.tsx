import React, {useCallback, useState} from 'react';
import _, {map} from 'lodash';

import PropertyHandler from '@infomat/core/src/Types/PropertyHandler';
import PageListIteration from '@infomat/uikit/src/PageListIteration/PageListIteration';
import SelectField from '@infomat/uikit/src/Fields/SelectField/SelectField';

import useRouterLinkForMui from 'src/Utils/Navigation/useRouterLinkForMui';
import {Routes} from 'src/Routes/Routes';

import SubcategoryObjectItemContainer from './SubcategoryObjectItem/SubcategoryObjectItemContainer';
import style from './SubcategoryObjectsList.module.scss';
import {SelectChangeEvent, Typography} from '@mui/material';

// const itemIdsConst = [{id: '11', values: ['asds', 'sdfg', 'dsfg', '896', 'cxvb']}, {id: '22', values: ['as2ds', 'sdfg2', 'ds2fg', '8926', 'cxv3b']}];
const itemIdsConst = ['asds', 'sdfg', 'dsfg', '896', 'cxvb', 'q', 'a', 's', 'd'];

const itemLabelsIds = [
	{
		label: 'fdgsdfg',
		ids: ['q', 'a', 's', 'd'],
	},
	{
		label: 'fdgsdfg',
		ids: ['q', 'a', 's', 'd'],
	},
	{
		label: 'fdgsdfg',
		ids: ['q', 'a', 's', 'd'],
	},
];

const filtersConst = [{label: 'Категории объектов'}, {label: 'Все объекты'}];

const SubcategoryObjectsList = ({onSubmit, onDelete, itemIds = itemIdsConst}: TSubcategoryObjectsListProps) => {
	const TouristObjectCreateLink = useRouterLinkForMui(Routes.subcategoryObject());
	const [search, setSearch] = useState('');
	const [filter, setFilter] = useState(filtersConst[0]);

	const filterChange = ({label}: {label: string}) => {
		setFilter({label});
	};

	const isShowCat = filter.label === filtersConst[0].label;

	return (
		<PageListIteration
			onLoadPage={_.noop}
			changeValueLimit={_.noop}
			labelAdd="Добавить объект"
			chengeSearch={setSearch}
			addLink={TouristObjectCreateLink}
			FilterComponent={
				<div className={style.filter}>
					<SelectField isFilterItems items={filtersConst} value={filter} onChange={filterChange} />
				</div>
			}
		>
			<div className={style.container}>
				{isShowCat
					? map(itemLabelsIds, ({label, ids}, index) => (
							<div key={index} className={style.item}>
								<Typography className={style.itemLabel}>{label}</Typography>
								{map(ids, (id) => (
									<SubcategoryObjectItemContainer key={id} id={id} />
								))}
							</div>
					  ))
					: map(itemIds, (id) => <SubcategoryObjectItemContainer key={id} id={id} />)}
			</div>
		</PageListIteration>
	);
};

type TSubcategoryObjectsListProps = {
	login?: string;
	onSubmit: PropertyHandler;
	onDelete?: PropertyHandler;
	itemIds?: string[];
};

export default SubcategoryObjectsList;
