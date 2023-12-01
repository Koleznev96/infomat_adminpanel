import React, {useCallback, useState} from 'react';
import {Grid, SelectChangeEvent, Typography} from '@mui/material';
import {isUndefined} from 'lodash';
import {type Crop} from 'react-image-crop';
import _ from 'lodash';
import cuid from 'cuid';

import PropertyHandler from '@infomat/core/src/Types/PropertyHandler';
import ButtonWithTooltip from '@infomat/uikit/src/Button/ButtonWithTooltip';
import ButtonDelete from '@infomat/uikit/src/Button/ButtonDelete';
import TextField from '@infomat/uikit/src/Fields/TextField/TextField';
import SelectField from '@infomat/uikit/src/Fields/SelectField/SelectField';
import FileFiledWithPreview from '@infomat/uikit/src/Fields/FileFiledWithPreview/FileFiledWithPreview';
import SwitchField from '@infomat/uikit/src/Fields/SwitchField/SwitchField';
import SwitchLanguageField from '@infomat/uikit/src/Fields/SwitchLanguageField/SwitchLanguageField';
import {TPlacesCreate} from '@infomat/core/src/Redux/Places/entityAdapter';
import {TFileCrop, TFrameCrop} from '@infomat/core/src/Types/media';

import style from './TouristObject.module.scss';
import SelectCategoryFieldContainer from '../SelectCategoryField/SelectCategoryFieldContainer';
import GeocodingMapContainer from './GeocodingMap/GeocodingMapContainer';
import {checkUrlsNull} from 'src/Utils/checkFile';

const names = [
	{title: 'Черновик', id: 'DRAFT'},
	{title: 'Опубликован', id: 'PUBLISHED'},
];

const TouristObject = ({onSubmit, onDelete, id, placesObjectVM}: TTouristObjectProps) => {
	const [title, setTitle] = useState(placesObjectVM?.title || '');
	const [titleEn, setTitleEn] = useState(placesObjectVM?.titleEn || '');
	const [recommended, setRecommended] = useState(placesObjectVM?.recommended || false);
	const [subcategoryId, setSubcategoryId] = useState(placesObjectVM?.subcategory?.id || undefined);
	const [status, setStatus] = useState(placesObjectVM?.status || 'DRAFT');
	const [phone, setPhone] = useState(placesObjectVM?.phone || '');
	const [email, setEmail] = useState(placesObjectVM?.email || '');
	const [website, setWebsite] = useState(placesObjectVM?.website || '');
	const [description, setDescription] = useState(placesObjectVM?.description || '');
	const [descriptionEn, setDescriptionEn] = useState(placesObjectVM?.descriptionEn || '');
	const [address, setAddress] = useState(placesObjectVM?.address || undefined);
	const [workingHours, setWorkingHours] = useState(placesObjectVM?.workingHours || '');
	const [workingHoursEn, setWorkingHoursEn] = useState(placesObjectVM?.workingHoursEn || '');
	const [frames, setFrames] = useState<TFrameCrop[]>([]);
	const [cover, setCover] = useState<TFileCrop>(placesObjectVM?.cover || {url3x2: null});
	const [photos, setPhotos] = useState<TFileCrop[]>(placesObjectVM?.photos || []);
	const [photoIdsForRemoving, setPhotoIdsForRemoving] = useState<number[]>([]);
	const [linkForQrCode, setLinkForQrCode] = useState(placesObjectVM?.linkForQrCode || '');
	const [leng, setLeng] = useState('ru');
	const [coverFrame, setCoverFrame] = useState<TFrameCrop | undefined>(placesObjectVM?.coverFrame || undefined);

	const titleValue = leng === 'ru' ? title : titleEn;
	const setTitleValue = leng === 'ru' ? setTitle : setTitleEn;
	const descriptionValue = leng === 'ru' ? description : descriptionEn;
	const setDescriptionValue = leng === 'ru' ? setDescription : setDescriptionEn;
	const workingHoursValue = leng === 'ru' ? workingHours : workingHoursEn;
	const setWorkingHoursValue = leng === 'ru' ? setWorkingHours : setWorkingHoursEn;

	const isDisabledSave =
		checkUrlsNull([cover]) ||
		!title.length ||
		_.isUndefined(address) ||
		!address.address?.length ||
		_.isUndefined(subcategoryId);

	const onSave = useCallback(() => {
		onSubmit({
			id,
			photoIdsForRemoving,
			photos,
			cover,
			frames,
			title,
			titleEn: titleEn.length ? titleEn : undefined,
			description,
			descriptionEn: descriptionEn.length ? descriptionEn : undefined,
			recommended,
			subcategoryId,
			workingHours,
			status,
			phone,
			email,
			website,
			address,
			linkForQrCode,
			workingHoursEn,
			coverFrame,
		});
	}, [
		id,
		photoIdsForRemoving,
		photos,
		cover,
		frames,
		title,
		titleEn,
		description,
		descriptionEn,
		recommended,
		subcategoryId,
		status,
		phone,
		email,
		website,
		onSubmit,
		coverFrame,
		workingHours,
		address,
		linkForQrCode,
		workingHoursEn,
	]);

	const onAttachAndCrop = useCallback(
		(index: number, file: File | null, crop?: Crop) => {
			const id = photos[index]?.id;
			if (file === null && !_.isUndefined(id)) {
				const photoIdsForRemovingNew = [...photoIdsForRemoving];
				photoIdsForRemovingNew.push(id);
				setPhotoIdsForRemoving(photoIdsForRemovingNew);
			}
			const videosNew = [...photos];
			if (_.isUndefined(videosNew[index])) {
				do {
					videosNew.push({url3x2: null});
				} while (_.isUndefined(videosNew[index]));
			}
			const partName = cuid();
			videosNew[index] = {url3x2: file, partName: file !== null ? partName : undefined};
			setPhotos(videosNew);

			const framesNew = [...frames];
			if (_.isUndefined(framesNew[index])) {
				do {
					framesNew.push({partName: null});
				} while (_.isUndefined(framesNew[index]));
			}

			if (file !== null && crop) {
				framesNew[index] = {partName, x: crop.x, y: crop.y, width: crop?.width, height: crop.height};
			} else {
				framesNew[index] = {partName: null};
			}
			setFrames(framesNew);
		},
		[setPhotos, photos, photoIdsForRemoving, setPhotoIdsForRemoving, setFrames, frames],
	);

	const onAttachBackground = useCallback(
		(index: number, file: File | null, crop?: Crop) => {
			setCover({url3x2: file});
			if (file !== null && crop) {
				setCoverFrame({partName: 'cover', x: crop.x, y: crop.y, width: crop?.width, height: crop.height});
			} else {
				setCoverFrame(undefined);
			}
		},
		[setCover],
	);

	return (
		<Grid container spacing={3}>
			<Grid item container xs={12} md={12} direction="row" justifyContent="space-between" alignItems="flex-end">
				<Grid item container alignItems="flex-end" spacing={3} xs={12} md={9}>
					<Grid item xs={12} md={6}>
						<SelectField items={names} value={status} onChange={(e) => setStatus(String(e))} />
					</Grid>
					<Grid item xs={12} md={6}>
						<SwitchField
							checked={recommended}
							onChange={(e) => {
								setRecommended(Boolean(e.target.checked));
							}}
							label="Добавить в «Рекомендуем»"
						/>
					</Grid>
				</Grid>
				<Grid item container xs={12} md={3} justifyContent="flex-end">
					<SwitchLanguageField onChange={setLeng} value={leng} />
				</Grid>
			</Grid>
			<Grid item xs={12} md={12}>
				<FileFiledWithPreview
					totalFiles={1}
					isImageAllowed
					onAttachAndCrop={onAttachBackground}
					label="Обложка объекта*"
					files={[cover]}
				/>
			</Grid>
			<Grid item xs={12} md={12}>
				<FileFiledWithPreview
					totalFiles={4}
					isImageAllowed
					onAttachAndCrop={onAttachAndCrop}
					label="Фотографии объекта"
					files={photos}
				/>
			</Grid>
			<Grid item container spacing={1.5}>
				<Grid item container>
					<Typography className={style.label}>Информация об объекте</Typography>
				</Grid>
				<Grid item container spacing={3}>
					<Grid item container xs={12} md={6} direction="column" gap={1.5}>
						<TextField
							label={leng === 'ru' ? 'Название на русском языке*' : 'Название на английском языке'}
							variant="outlined"
							tabIndex={1}
							onChange={(e) => setTitleValue(e.target.value)}
							value={titleValue}
							placeholder="Название"
						/>
						<TextField
							label={'Номер телефона'}
							variant="outlined"
							type="tel"
							tabIndex={2}
							onChange={(e) => setPhone(e.target.value)}
							value={phone}
							placeholder="Телефон"
						/>
						<TextField
							label={'Почта'}
							variant="outlined"
							tabIndex={3}
							onChange={(e) => setEmail(e.target.value)}
							value={email}
							type="email"
							placeholder="Почта"
						/>
						<TextField
							label={'QR-код (ссылка) на объект в приложении «Мой Смоленск»'}
							variant="outlined"
							tabIndex={2}
							onChange={(e) => setLinkForQrCode(e.target.value)}
							value={linkForQrCode}
							placeholder="QR-код (ссылка)"
						/>
					</Grid>
					<Grid item container xs={12} md={6} direction="column" gap={1.5}>
						<SelectCategoryFieldContainer
							onChange={setSubcategoryId}
							value={subcategoryId}
							isShowSubcategory
							label="Категория объекта*"
							placeholder="Категория объекта"
						/>
						<TextField
							label={leng === 'ru' ? 'Режим работы на русском языке' : 'Режим работы на английском языке'}
							variant="outlined"
							tabIndex={2}
							onChange={(e) => setWorkingHoursValue(e.target.value)}
							value={workingHoursValue}
							placeholder="Режим работы"
						/>
						<TextField
							label={'Сайт'}
							variant="outlined"
							tabIndex={2}
							onChange={(e) => setWebsite(e.target.value)}
							value={website}
							placeholder="Сайт"
						/>
					</Grid>
				</Grid>
			</Grid>
			<Grid item container xs={12} md={12}>
				<TextField
					label={leng === 'ru' ? 'Описание на русском языке' : 'Описание на английском языке'}
					variant="outlined"
					multiline
					tabIndex={1}
					onChange={(e) => setDescriptionValue(e.target.value)}
					value={descriptionValue}
					rows={8}
					placeholder="Описание"
				/>
			</Grid>
			<Grid item container xs={12} md={12}>
				{/* <AddressWithMapField /> */}
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

type TTouristObjectProps = {
	id?: number;
	placesObjectVM?: TPlacesCreate;
	onSubmit: PropertyHandler<TPlacesCreate>;
	onDelete: PropertyHandler<{id: number}>;
};

export default TouristObject;
