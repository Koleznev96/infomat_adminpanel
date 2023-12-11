import React, {useCallback, useState} from 'react';
import {Grid, Typography} from '@mui/material';
import _ from 'lodash';

import PropertyHandler from '@infomat/core/src/Types/PropertyHandler';
import ButtonWithTooltip from '@infomat/uikit/src/Button/ButtonWithTooltip';
import ButtonDelete from '@infomat/uikit/src/Button/ButtonDelete';
import TextField from '@infomat/uikit/src/Fields/TextField/TextField';
import SelectField from '@infomat/uikit/src/Fields/SelectField/SelectField';
import IconFiledWithPreview from '@infomat/uikit/src/Fields/IconFiledWithPreview/IconFiledWithPreview';
import SwitchLanguageField from '@infomat/uikit/src/Fields/SwitchLanguageField/SwitchLanguageField';
import ColorPicker from '@infomat/uikit/src/Fields/ColorPicker/ColorPicker';
import {TRoutesCreate} from '@infomat/core/src/Redux/Routes/entityAdapter';
import {TFile, TFileLocal} from '@infomat/core/src/Types/media';

import ItemRoutesMapContainer from 'src/Components/ItemRoutesMap/ItemRoutesMapContainer';

import style from './TouristRout.module.scss';
import {checkUrlsNull} from 'src/Utils/checkFile';

const names = [
	{title: 'Черновик', id: 'DRAFT'},
	{title: 'Опубликован', id: 'PUBLISHED'},
];

const TouristRout = ({onSubmit, onDelete, routesVM, id}: TTouristRoutProps) => {
	const [title, setTitle] = useState(routesVM?.title || '');
	const [titleEn, setTitleEn] = useState(routesVM?.titleEn || '');
	const [status, setStatus] = useState(routesVM?.status || 'DRAFT');
	const [description, setDescription] = useState(routesVM?.description || '');
	const [descriptionEn, setDescriptionEn] = useState(routesVM?.descriptionEn || '');
	const [backgroundColor, setBackgroundColor] = useState(routesVM?.backgroundColor || '');
	const [routeColor, setRouteColor] = useState(routesVM?.routeColor || '');
	const [length, setLength] = useState(routesVM?.length || '');
	const [lengthEn, setLengthEn] = useState(routesVM?.lengthEn || '');
	const [duration, setDuration] = useState(routesVM?.duration || '');
	const [durationEn, setDurationEn] = useState(routesVM?.durationEn || '');
	const [type, setType] = useState(routesVM?.type || '');
	const [typeEn, setTypeEn] = useState(routesVM?.typeEn || '');
	const [icon, onIcon] = useState<TFile | TFileLocal>(routesVM?.icon || {url: null});
	const [stops, setStops] = useState(
		routesVM?.stops
			? _.sortBy(routesVM?.stops, [
					function (o) {
						return o.sequenceNumber;
					},
			  ])
			: [],
	);
	const [leng, setLeng] = useState('ru');

	const titleValue = leng === 'ru' ? title : titleEn;
	const setTitleValue = leng === 'ru' ? setTitle : setTitleEn;
	const descriptionValue = leng === 'ru' ? description : descriptionEn;
	const setDescriptionValue = leng === 'ru' ? setDescription : setDescriptionEn;
	const lengthValue = leng === 'ru' ? length : lengthEn;
	const setLengthValue = leng === 'ru' ? setLength : setLengthEn;
	const durationValue = leng === 'ru' ? duration : durationEn;
	const setDurationValue = leng === 'ru' ? setDuration : setDurationEn;
	const typeValue = leng === 'ru' ? type : typeEn;
	const setTypeValue = leng === 'ru' ? setType : setTypeEn;

	const isDisabledSave =
		checkUrlsNull([icon]) ||
		!title.length ||
		!routeColor.length ||
		!backgroundColor.length ||
		!length.length ||
		!duration?.length ||
		!type.length ||
		_.isEmpty(stops) ||
		!stops.length ||
		stops.length < 2 ||
		_.size(_.filter(stops, (item) => !!item.place)) < 2;

	const onSave = useCallback(() => {
		onSubmit({
			id,
			title,
			titleEn: titleEn.length ? titleEn : undefined,
			description,
			descriptionEn: descriptionEn.length ? descriptionEn : undefined,
			status,
			backgroundColor,
			routeColor,
			length,
			lengthEn: lengthEn.length ? lengthEn : undefined,
			duration,
			durationEn: durationEn.length ? durationEn : undefined,
			type,
			typeEn: typeEn.length ? typeEn : undefined,
			icon,
			stops: stops
				? _.map(stops, (item, index) => ({
						placeId: item.place?.id,
						sequenceNumber: index + 1,
						address: !item.address ? undefined : item.address,
				  }))
				: undefined,
		});
	}, [
		id,
		title,
		titleEn,
		description,
		descriptionEn,
		status,
		backgroundColor,
		routeColor,
		length,
		lengthEn,
		duration,
		durationEn,
		type,
		typeEn,
		icon,
		stops,
	]);

	return (
		<Grid container spacing={3}>
			<Grid item container xs={12} md={12} direction="row" justifyContent="space-between" alignItems="flex-end">
				<Grid item container alignItems="flex-end" spacing={3} xs={12} md={9}>
					<Grid item xs={12} md={6}>
						<SelectField items={names} value={status} onChange={(e) => setStatus(String(e))} />
					</Grid>
				</Grid>
				<Grid item container xs={12} md={3} justifyContent="flex-end">
					<SwitchLanguageField onChange={setLeng} value={leng} />
				</Grid>
			</Grid>
			<Grid item container xs={12} md={12} gap={3}>
				<IconFiledWithPreview onAttach={onIcon} file={icon} label="Загрузить иконку 30х30*" />
			</Grid>
			<Grid item container spacing={1.5}>
				<Grid item xs={12} md={6}>
					<ColorPicker label="Цвет подложки (HEX, с решёткой)*" value={backgroundColor} setValue={setBackgroundColor} />
				</Grid>
				<Grid item xs={12} md={6}>
					<ColorPicker label={'Цвет маршрута (HEX, с решёткой)*'} value={routeColor} setValue={setRouteColor} />
				</Grid>
			</Grid>
			<Grid item container spacing={1.5}>
				<Grid item container>
					<Typography className={style.label}>Информация о маршруте</Typography>
				</Grid>
				<Grid item container spacing={3}>
					<Grid item container xs={12} md={6} direction="column" gap={1.5}>
						<TextField
							label={leng === 'ru' ? 'Название на русском языке*' : 'Название на английском языке'}
							variant="outlined"
							tabIndex={1}
							onChange={(e) => setTitleValue(e.target.value)}
							value={titleValue}
							placeholder="Название маршрута"
						/>
						<TextField
							label={leng === 'ru' ? 'Продолжительность на русском языке*' : 'Продолжительность на английском языке'}
							variant="outlined"
							tabIndex={2}
							onChange={(e) => setDurationValue(e.target.value)}
							value={durationValue}
							placeholder="Например: 2-2,5 часа"
						/>
					</Grid>
					<Grid item container xs={12} md={6} direction="column" gap={1.5}>
						<TextField
							label={leng === 'ru' ? 'Протяженность на русском языке*' : 'Протяженность на английском языке'}
							variant="outlined"
							tabIndex={3}
							onChange={(e) => setLengthValue(e.target.value)}
							value={lengthValue}
							placeholder="Например: 5 км"
						/>
						<TextField
							label={leng === 'ru' ? 'Тип маршрута на русском языке*' : 'Тип маршрута на английском языке'}
							variant="outlined"
							tabIndex={4}
							onChange={(e) => setTypeValue(e.target.value)}
							value={typeValue}
							placeholder="Автомобильный, пешеходный или автомобильно-пешеходный"
						/>
					</Grid>
				</Grid>
			</Grid>
			<Grid item container xs={12} md={12}>
				<TextField
					label={'Описание'}
					variant="outlined"
					multiline
					tabIndex={5}
					onChange={(e) => setDescriptionValue(e.target.value)}
					value={descriptionValue}
					rows={8}
					placeholder="Описание"
				/>
			</Grid>
			<Grid item container xs={12} md={12}>
				<ItemRoutesMapContainer
					labelMap="Маршрут на карте"
					label="Создание маршрута*"
					value={stops}
					setValue={setStops}
					routeColor={routeColor}
				/>
			</Grid>
			<Grid item container gap={1.5}>
				<ButtonWithTooltip onClick={onSave} disabled={isDisabledSave} tabIndex={6}>
					Сохранить
				</ButtonWithTooltip>
				{!_.isUndefined(id) && (
					<ButtonDelete onClick={() => onDelete({id})} tabIndex={7}>
						Удалить объект
					</ButtonDelete>
				)}
			</Grid>
		</Grid>
	);
};

type TTouristRoutProps = {
	id?: number;
	routesVM?: TRoutesCreate;
	onSubmit: PropertyHandler<TRoutesCreate>;
	onDelete: PropertyHandler<{id: number}>;
};

export default TouristRout;
