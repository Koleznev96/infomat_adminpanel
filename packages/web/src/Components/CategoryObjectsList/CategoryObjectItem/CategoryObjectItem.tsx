import React, {useCallback, useState} from 'react';
import {Grid, SelectChangeEvent, Typography} from '@mui/material';
import {map} from 'lodash';

import PropertyHandler from '@infomat/core/src/Types/PropertyHandler';
import ActionMenuItem from '@infomat/uikit/src/ActionMenu/ActionMenuItem/ActionMenuItem';

import useRouterLinkForMui from 'src/Utils/Navigation/useRouterLinkForMui';
import {Routes} from 'src/Routes/Routes';

import style from './CategoryObjectItem.module.scss';

type TCategoryObject = {
	id: string;
	label: string;
	background: string;
	icon: string;
};

const CategoryObjectItem = ({onDelete, categoryObjectVM}: TCategoryObjectItemProps) => {
	const CategoryObjectEditLink = useRouterLinkForMui(Routes.categoryObject(categoryObjectVM.id));

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

type TCategoryObjectItemProps = {
	categoryObjectVM: TCategoryObject;
	onDelete?: PropertyHandler;
};

export default CategoryObjectItem;
