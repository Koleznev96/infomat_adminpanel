import React, {useCallback, useState} from 'react';
import {Grid, SelectChangeEvent, Typography} from '@mui/material';
import {map} from 'lodash';

import PropertyHandler from '@infomat/core/src/Types/PropertyHandler';
import ActionMenuItem from '@infomat/uikit/src/ActionMenu/ActionMenuItem/ActionMenuItem';
import {TCategoryObjectVM} from '@infomat/core/src/Redux/CategoryObject/entityAdapter';

import useRouterLinkForMui from 'src/Utils/Navigation/useRouterLinkForMui';
import {Routes} from 'src/Routes/Routes';

import style from './CategoryObjectItem.module.scss';

const CategoryObjectItem = ({id, onDelete, categoryObjectVM}: TCategoryObjectItemProps) => {
	const CategoryObjectEditLink = useRouterLinkForMui(Routes.categoryObject(id));

	const deleteCategory = useCallback(() => {
		onDelete({id});
	}, [onDelete, id]);

	return (
		<div className={style.container}>
			<div className={style.box} style={{backgroundColor: categoryObjectVM.backgroundColor}}>
				{/* <img src={categoryObjectVM.background.url} className={style.layout} /> */}
				<img src={categoryObjectVM.icon.url} className={style.icon} />
			</div>
			<Typography className={style.label}>{categoryObjectVM.title}</Typography>
			<ActionMenuItem editLink={CategoryObjectEditLink} onDelete={deleteCategory} />
		</div>
	);
};

type TCategoryObjectItemProps = {
	id: number;
	categoryObjectVM: TCategoryObjectVM;
	onDelete: PropertyHandler<{id: number}>;
};

export default CategoryObjectItem;
