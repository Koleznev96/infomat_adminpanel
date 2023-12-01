import React, {useCallback, useState} from 'react';
import {Grid} from '@mui/material';
import {isUndefined} from 'lodash';

import PropertyHandler from '@infomat/core/src/Types/PropertyHandler';
import ButtonWithTooltip from '@infomat/uikit/src/Button/ButtonWithTooltip';
import ButtonDelete from '@infomat/uikit/src/Button/ButtonDelete';
import IconFiledWithPreview from '@infomat/uikit/src/Fields/IconFiledWithPreview/IconFiledWithPreview';
import {TSpecialPlaceCreate} from '@infomat/core/src/Redux/SpecialPlace/entityAdapter';
import ColorPicker from '@infomat/uikit/src/Fields/ColorPicker/ColorPicker';
import SelectField from '@infomat/uikit/src/Fields/SelectField/SelectField';
import GeocodingMapContainer from '../TouristObject/GeocodingMap/GeocodingMapContainer';

const names = [
	{title: 'Туалет', id: 'WC'},
	{title: 'Фотозона', id: 'PHOTO_ZONE'},
];

const SpecialPlace = ({onSubmit, onDelete, specialPlaceVM, id}: TSpecialPlaceProps) => {
	const [type, setType] = useState(specialPlaceVM?.type || names[0].id);
	const [backgroundColor, onBackgroundColor] = useState(specialPlaceVM?.backgroundColor || undefined);
	const [icon, onIcon] = useState(specialPlaceVM?.icon || {url: null});
	const [address, setAddress] = useState(specialPlaceVM?.address || undefined);

	const isDisabledSave =
		isUndefined(address) ||
		!address.address?.length ||
		icon.url === null ||
		backgroundColor === undefined ||
		!backgroundColor.length;

	const onSave = useCallback(() => {
		onSubmit({id, type, backgroundColor, icon, address});
	}, [id, type, backgroundColor, icon, address, onSubmit]);

	return (
		<Grid container spacing={3}>
			<Grid item container xs={12} md={12} gap={3}>
				<IconFiledWithPreview onAttach={onIcon} file={icon} label="Загрузить иконку 30х30*" />
			</Grid>
			<Grid item xs={12} md={6}>
				<ColorPicker label="Цвет подложки (HEX, с решёткой)*" value={backgroundColor} setValue={onBackgroundColor} />
			</Grid>
			<Grid item xs={12} md={6}>
				<SelectField label="Тип*" items={names} value={type} onChange={(e) => setType(String(e))} />
			</Grid>
			<Grid item container xs={12} md={12}>
				<GeocodingMapContainer label="Адрес*" placeholder="Адрес" value={address} setValue={setAddress} />
			</Grid>
			<Grid item container gap={1.5}>
				<ButtonWithTooltip onClick={onSave} disabled={isDisabledSave} tabIndex={3}>
					Сохранить
				</ButtonWithTooltip>
				{!isUndefined(id) && (
					<ButtonDelete onClick={() => onDelete({id})} tabIndex={4}>
						Удалить объект
					</ButtonDelete>
				)}
			</Grid>
		</Grid>
	);
};

type TSpecialPlaceProps = {
	onSubmit: PropertyHandler<TSpecialPlaceCreate>;
	onDelete: PropertyHandler<{id: number}>;
	specialPlaceVM?: TSpecialPlaceCreate;
	id?: number;
};

export default SpecialPlace;
