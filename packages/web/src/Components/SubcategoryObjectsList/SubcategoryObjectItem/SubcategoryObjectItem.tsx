import React, {useCallback, useState} from 'react';
import {Grid, SelectChangeEvent, Typography} from '@mui/material';
import {map} from 'lodash';

import PropertyHandler from '@infomat/core/src/Types/PropertyHandler';
import ActionMenuItem from '@infomat/uikit/src/ActionMenu/ActionMenuItem/ActionMenuItem';

import useRouterLinkForMui from 'src/Utils/Navigation/useRouterLinkForMui';
import {Routes} from 'src/Routes/Routes';

import style from './SubcategoryObjectItem.module.scss';

type TSubcategory = {
	id: string;
	label: string;
	background: string;
	icon: string;
};

const SubcategoryObjectItem = ({onDelete, categoryObjectVM}: TSubcategoryObjectItemProps) => {
	const CategoryObjectEditLink = useRouterLinkForMui(Routes.subcategoryObject(categoryObjectVM.id));

	return (
		<div className={style.container}>
			<div className={style.box}>
				<img src={categoryObjectVM.background} className={style.layout} />
				<img src={categoryObjectVM.icon} className={style.icon} />
			</div>
			<Typography className={style.label}>{categoryObjectVM.label}</Typography>
			<ActionMenuItem editLink={CategoryObjectEditLink} onDelete={onDelete} />
		</div>
	);
};

type TSubcategoryObjectItemProps = {
	categoryObjectVM: TSubcategory;
	onDelete?: PropertyHandler;
};

export default SubcategoryObjectItem;
