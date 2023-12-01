import React, {useCallback, useState} from 'react';
import {Grid, SelectChangeEvent, Typography} from '@mui/material';
import {map} from 'lodash';

import PropertyHandler from '@infomat/core/src/Types/PropertyHandler';
import ActionMenuItem from '@infomat/uikit/src/ActionMenu/ActionMenuItem/ActionMenuItem';
import {TSpecialPlaceVM} from '@infomat/core/src/Redux/SpecialPlace/entityAdapter';

import useRouterLinkForMui from 'src/Utils/Navigation/useRouterLinkForMui';
import {Routes} from 'src/Routes/Routes';

import style from './SpecialPlaceItem.module.scss';

const SpecialPlaceItem = ({id, onDelete, specialPlaceVM}: TSpecialPlaceItemProps) => {
	const SpecialPlaceEditLink = useRouterLinkForMui(Routes.specialPlace(id));

	const deleteCategory = useCallback(() => {
		onDelete({id});
	}, [onDelete, id]);

	return (
		<div className={style.container}>
			<div className={style.box} style={{backgroundColor: specialPlaceVM.backgroundColor}}>
				{/* <img src={categoryObjectVM.background.url} className={style.layout} /> */}
				<img src={specialPlaceVM.icon.url} className={style.icon} />
			</div>
			<Typography className={style.label}>{specialPlaceVM.type === 'WC' ? 'Туалет' : 'Фотозона'}</Typography>
			<ActionMenuItem editLink={SpecialPlaceEditLink} onDelete={deleteCategory} />
		</div>
	);
};

type TSpecialPlaceItemProps = {
	id: number;
	specialPlaceVM: TSpecialPlaceVM;
	onDelete: PropertyHandler<{id: number}>;
};

export default SpecialPlaceItem;
