import React, {useCallback, useState} from 'react';
import {Grid, SelectChangeEvent, Typography} from '@mui/material';
import {isUndefined} from 'lodash';
import {type Crop} from 'react-image-crop';
import {map} from 'lodash';

import Page from '@infomat/uikit/src/Page/Page';
import PropertyHandler from '@infomat/core/src/Types/PropertyHandler';
import ButtonWithTooltip from '@infomat/uikit/src/Button/ButtonWithTooltip';
import ButtonDelete from '@infomat/uikit/src/Button/ButtonDelete';
import TextField from '@infomat/uikit/src/Fields/TextField/TextField';
import SelectField from '@infomat/uikit/src/Fields/SelectField/SelectField';
import FileFiledWithPreview from '@infomat/uikit/src/Fields/FileFiledWithPreview/FileFiledWithPreview';
import SwitchField from '@infomat/uikit/src/Fields/SwitchField/SwitchField';
import SwitchLanguageField from '@infomat/uikit/src/Fields/SwitchLanguageField/SwitchLanguageField';
import AddressWithMapField from '@infomat/uikit/src/Fields/AddressWithMapField/AddressWithMapField';
import useRouterLinkForMui from 'src/Utils/Navigation/useRouterLinkForMui';

import {Routes} from 'src/Routes/Routes';

import style from './EventObject.module.scss';

const names = [{label: 'Черновик'}, {label: 'Опубликован'}];
const fileInitial = [{file: null}, {file: null}, {file: null}, {file: null}];

type fileCrop = {
	crop?: Crop;
	file: File | null | string;
};

const EventObject = ({onSubmit, onDelete}: TEventObjectProps) => {
	const [labelRu, setLabelRu] = useState('');
	const [labelEng, setLabelEng] = useState('');
	const [category, setCategory] = useState<{label: string} | undefined>(undefined);
	const [info, setInfo] = useState<{label: string} | undefined>(names[0]);
	const [leng, setLeng] = useState('ru');
	const [background, setBackground] = useState<fileCrop>({file: null});
	const [images, setImages] = useState<fileCrop[]>(fileInitial);
	const files = map(images, (item) => item.file);
	const backLink = useRouterLinkForMui(Routes.events);

	const isDisabledSave = !labelRu.length || !labelEng.length;

	const onSave = useCallback(() => {
		onSubmit();
	}, []);

	const handleChange = (event: SelectChangeEvent<any>) => {
		const {
			target: {value},
		} = event;
		setCategory(value);
	};

	const handleInfo = (event: SelectChangeEvent<any>) => {
		const {
			target: {value},
		} = event;
		setInfo(value);
	};

	const onAttachAndCrop = useCallback(
		(index: number, file: File | null, crop?: Crop) => {
			const imagesNew = [...images];
			imagesNew[index] = {file, crop};
			setImages(imagesNew);
		},
		[setImages, images],
	);

	const onAttachAndCropBackground = useCallback(
		(index: number, file: File | null, crop?: Crop) => {
			setBackground({file, crop});
		},
		[setBackground, images],
	);

	return (
		<Page backLink={backLink} label="Редактирование мероприятия">
			<Grid container spacing={3}>
				<Grid item container xs={12} md={12} direction="row" justifyContent="space-between" alignItems="flex-end">
					<Grid item container alignItems="flex-end" spacing={3} xs={12} md={7}>
						<SelectField items={names} value={info} onChange={setInfo} placeholder="Категории объектов" />
					</Grid>
					<Grid item container xs={12} md={5} justifyContent="flex-end">
						<SwitchLanguageField onChange={setLeng} value={leng} />
					</Grid>
				</Grid>
				<Grid item xs={12} md={12}>
					<FileFiledWithPreview
						isImageAllowed
						onAttachAndCrop={onAttachAndCropBackground}
						label="Обложка объекта"
						files={[background.file]}
					/>
				</Grid>
				<Grid item xs={12} md={12}>
					<FileFiledWithPreview
						isImageAllowed
						onAttachAndCrop={onAttachAndCrop}
						label="Фотографии объекта"
						files={files}
					/>
				</Grid>
				<Grid item container spacing={1.5}>
					<Grid item container>
						<Typography className={style.label}>Информация об объекте</Typography>
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
							<TextField
								label={'Почта'}
								variant="outlined"
								tabIndex={1}
								onChange={(e) => setLabelRu(e.target.value)}
								value={labelRu}
								placeholder="Почта"
							/>
							<TextField
								label={'QR-код на мобильное приложение «Мой Смоленск»'}
								variant="outlined"
								tabIndex={2}
								onChange={(e) => setLabelEng(e.target.value)}
								value={labelEng}
								placeholder="Адрес ссылки для генерации QR-кода"
							/>
						</Grid>
						<Grid item container xs={12} md={6} direction="column" gap={1.5}>
							<SelectField
								value={category}
								onChange={setCategory}
								label="Родительская категория*"
								placeholder="Категории объектов"
							/>
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
				<Grid item container xs={12} md={12}>
					<AddressWithMapField />
				</Grid>
				<Grid item container gap={1.5}>
					<ButtonWithTooltip onClick={onSave} disabled={isDisabledSave} tabIndex={3}>
						Сохранить
					</ButtonWithTooltip>
					{!isUndefined(onDelete) && (
						<ButtonDelete onClick={onDelete} tabIndex={4}>
							Удалить объект
						</ButtonDelete>
					)}
				</Grid>
			</Grid>
		</Page>
	);
};

type TEventObjectProps = {
	login?: string;
	onSubmit: PropertyHandler;
	onDelete?: PropertyHandler;
};

export default EventObject;
