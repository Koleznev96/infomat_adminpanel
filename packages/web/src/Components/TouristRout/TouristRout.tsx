import React, {useCallback, useState} from 'react';
import {Grid, SelectChangeEvent, Typography} from '@mui/material';
import {isUndefined} from 'lodash';

import PropertyHandler from '@infomat/core/src/Types/PropertyHandler';
import ButtonWithTooltip from '@infomat/uikit/src/Button/ButtonWithTooltip';
import ButtonDelete from '@infomat/uikit/src/Button/ButtonDelete';
import TextField from '@infomat/uikit/src/Fields/TextField/TextField';
import SelectField from '@infomat/uikit/src/Fields/SelectField/SelectField';
import IconFiledWithPreview from '@infomat/uikit/src/Fields/IconFiledWithPreview/IconFiledWithPreview';
import SwitchField from '@infomat/uikit/src/Fields/SwitchField/SwitchField';
import SwitchLanguageField from '@infomat/uikit/src/Fields/SwitchLanguageField/SwitchLanguageField';
import RoutesField from '@infomat/uikit/src/Fields/RoutesField/RoutesField';
import RoutesOnMap from '@infomat/uikit/src/RoutesOnMap/RoutesOnMap';

import style from './TouristRout.module.scss';

const names = [{label: 'Черновик'}, {label: 'Опубликован'}];

const TouristRout = ({onSubmit, onDelete}: TTouristRoutProps) => {
	const [labelRu, setLabelRu] = useState('');
	const [labelEng, setLabelEng] = useState('');
	const [category, setCategory] = useState<string | undefined>(undefined);
	const [info, setInfo] = useState<{label: string} | undefined>(names[0]);
	const [leng, setLeng] = useState('ru');
	const [attachBack, onAttachBack] = useState<File | null | string>(null);
	const [attachIcon, onAttachIcon] = useState<File | null | string>(null);

	const isDisabledSave = !labelRu.length || !labelEng.length;

	const onSave = useCallback(() => {
		onSubmit();
	}, []);

	return (
		<Grid container spacing={3}>
			<Grid item container xs={12} md={12} direction="row" justifyContent="space-between" alignItems="flex-end">
				<Grid item container alignItems="flex-end" spacing={3} xs={12} md={9}>
					<Grid item xs={12} md={6}>
						<SelectField
							items={names}
							value={info}
							onChange={setInfo}
							label="Родительская категория*"
							placeholder="Категории объектов"
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<SwitchField label="Добавить в «Рекомендуем»" />
					</Grid>
				</Grid>
				<Grid item container xs={12} md={3} justifyContent="flex-end">
					<SwitchLanguageField onChange={setLeng} value={leng} />
				</Grid>
			</Grid>
			<Grid item container xs={12} md={12} gap={3}>
				<IconFiledWithPreview onAttach={onAttachBack} file={attachBack} label="Загрузить подложку 56х56" />
				<IconFiledWithPreview onAttach={onAttachIcon} file={attachIcon} label="Загрузить иконку 30х30" />
			</Grid>
			<Grid item xs={12} md={6}>
				<TextField
					label={'Цвет маршрута (HEX, с решёткой)*'}
					variant="outlined"
					tabIndex={1}
					onChange={(e) => setLabelRu(e.target.value)}
					value={labelRu}
					placeholder="#78DBE2"
				/>
			</Grid>
			<Grid item container spacing={1.5}>
				<Grid item container>
					<Typography className={style.label}>Информация о маршруте</Typography>
				</Grid>
				<Grid item container spacing={3}>
					<Grid item container xs={12} md={6} direction="column" gap={1.5}>
						<TextField
							label={'Название*'}
							variant="outlined"
							tabIndex={1}
							onChange={(e) => setLabelRu(e.target.value)}
							value={labelRu}
							placeholder="Название объекта"
						/>
						<TextField
							label={'Номер телефона'}
							variant="outlined"
							tabIndex={1}
							onChange={(e) => setLabelRu(e.target.value)}
							value={labelRu}
							placeholder="Телефон"
						/>
					</Grid>
					<Grid item container xs={12} md={6} direction="column" gap={1.5}>
						<TextField
							label={'Режим работы'}
							variant="outlined"
							tabIndex={2}
							onChange={(e) => setLabelEng(e.target.value)}
							value={labelEng}
							placeholder="Режим работы"
						/>
						<TextField
							label={'Сайт'}
							variant="outlined"
							tabIndex={2}
							onChange={(e) => setLabelEng(e.target.value)}
							value={labelEng}
							placeholder="Сайт"
						/>
					</Grid>
				</Grid>
			</Grid>
			<Grid item container xs={12} md={12}>
				<TextField
					label={'Описание'}
					variant="outlined"
					multiline
					tabIndex={1}
					onChange={(e) => setLabelEng(e.target.value)}
					value={labelEng}
					rows={8}
					placeholder="Описание"
				/>
			</Grid>
			{/* <Grid item container xs={12} md={6}>
				<RoutesField label="Создание маршрута" label="Создание маршрута" />
			</Grid> */}
			<Grid item container xs={12} md={12}>
				<RoutesOnMap labelMap="Маршрут на карте" label="Создание маршрута" />
			</Grid>
			<Grid item container gap={1.5}>
				<ButtonWithTooltip onClick={onSave} disabled={isDisabledSave} tabIndex={3}>
					Сохранить
				</ButtonWithTooltip>
				{!isUndefined(onDelete) && (
					<ButtonDelete onClick={onSave} tabIndex={4}>
						Удалить объект
					</ButtonDelete>
				)}
			</Grid>
		</Grid>
	);
};

type TTouristRoutProps = {
	login?: string;
	onSubmit: PropertyHandler;
	onDelete?: PropertyHandler;
};

export default TouristRout;
