import React, {useCallback, useState} from 'react';
import {Grid, SelectChangeEvent, Typography} from '@mui/material';
import {map} from 'lodash';

import PropertyHandler from '@infomat/core/src/Types/PropertyHandler';
import ActionMenuItem from '@infomat/uikit/src/ActionMenu/ActionMenuItem/ActionMenuItem';

import useRouterLinkForMui from 'src/Utils/Navigation/useRouterLinkForMui';
import {Routes} from 'src/Routes/Routes';

import style from './SubcategoryObjectItem.module.scss';
import {TSubcategoryObjectVM} from '@infomat/core/src/Redux/SubcategoryObject/entityAdapter';

const SubcategoryObjectItem = ({id, onDelete, subcategoryObjectVM}: TSubcategoryObjectItemProps) => {
	const CategoryObjectEditLink = useRouterLinkForMui(Routes.subcategoryObject(id));

	const deleteCategory = useCallback(() => {
		onDelete({id});
	}, [onDelete, id]);

	return (
		<div className={style.container}>
			<div className={style.box} style={{backgroundColor: subcategoryObjectVM.category.backgroundColor}}>
				{/* <img src={subcategoryObjectVM.category.background.url} className={style.layout} /> */}
				<img src={subcategoryObjectVM.icon.url} className={style.icon} />
			</div>
			<Typography className={style.label}>{subcategoryObjectVM.title}</Typography>
			<ActionMenuItem editLink={CategoryObjectEditLink} onDelete={deleteCategory} />
		</div>
	);
};

type TSubcategoryObjectItemProps = {
	id: number;
	subcategoryObjectVM: TSubcategoryObjectVM;
	onDelete: PropertyHandler<{id: number}>;
};

export default SubcategoryObjectItem;
