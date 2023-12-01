import React, {useCallback, useState} from 'react';
import {Grid, Typography} from '@mui/material';
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
import SwitchLanguageField from '@infomat/uikit/src/Fields/SwitchLanguageField/SwitchLanguageField';
import {TEventsCreate} from '@infomat/core/src/Redux/Events/entityAdapter';
import {TFileCrop, TFrameCrop} from '@infomat/core/src/Types/media';
import DateRangField from '@infomat/uikit/src/Fields/DateRangField/DateRangField';
import TimeRangField from '@infomat/uikit/src/Fields/TimeRangField/TimeRangField';

import style from './EventObject.module.scss';
import GeocodingMapContainer from '../TouristObject/GeocodingMap/GeocodingMapContainer';
import {checkUrlsNull} from 'src/Utils/checkFile';

const names = [
	{title: 'Черновик', id: 'DRAFT'},
	{title: 'Опубликован', id: 'PUBLISHED'},
];

const EventObject = ({onSubmit, onDelete, id, eventsObjectVM}: TEventObjectProps) => {
	const [title, setTitle] = useState(eventsObjectVM?.title || '');
	const [titleEn, setTitleEn] = useState(eventsObjectVM?.titleEn || '');
	const [status, setStatus] = useState(eventsObjectVM?.status || 'DRAFT');
	const [phone, setPhone] = useState(eventsObjectVM?.phone || '');
	const [email, setEmail] = useState(eventsObjectVM?.email || '');
	const [website, setWebsite] = useState(eventsObjectVM?.website || '');
	const [description, setDescription] = useState(eventsObjectVM?.description || '');
	const [descriptionEn, setDescriptionEn] = useState(eventsObjectVM?.descriptionEn || '');
	const [address, setAddress] = useState(eventsObjectVM?.address || undefined);
	const [frames, setFrames] = useState<TFrameCrop[]>([]);
	const [cover, setCover] = useState<TFileCrop>(eventsObjectVM?.cover || {url3x2: null});
	const [photos, setPhotos] = useState<TFileCrop[]>(eventsObjectVM?.photos || []);
	const [photoIdsForRemoving, setPhotoIdsForRemoving] = useState<number[]>([]);
	const [leng, setLeng] = useState('ru');
	const [coverFrame, setCoverFrame] = useState<TFrameCrop | undefined>(eventsObjectVM?.coverFrame || undefined);
	const [startDate, setstartDate] = useState(eventsObjectVM?.startDate || '');
	const [endDate, setendDate] = useState(eventsObjectVM?.endDate || '');
	const [startTime, setstartTime] = useState(eventsObjectVM?.startTime || '');
	const [endTime, setendTime] = useState(eventsObjectVM?.endTime || '');
	const [linkForQrCode, setLinkForQrCode] = useState(eventsObjectVM?.linkForQrCode || '');

	const titleValue = leng === 'ru' ? title : titleEn;
	const setTitleValue = leng === 'ru' ? setTitle : setTitleEn;
	const descriptionValue = leng === 'ru' ? description : descriptionEn;
	const setDescriptionValue = leng === 'ru' ? setDescription : setDescriptionEn;

	const isDisabledSave =
		checkUrlsNull([cover]) ||
		!title.length ||
		_.isUndefined(address) ||
		!address.address?.length ||
		!startDate.length ||
		!startTime.length;

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
			status,
			phone,
			email,
			website,
			address,
			startDate,
			startTime,
			endDate: endDate.length ? endDate : undefined,
			endTime: endTime.length ? endTime : undefined,
			linkForQrCode,
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
		status,
		phone,
		email,
		website,
		onSubmit,
		coverFrame,
		address,
		startDate,
		startTime,
		endDate,
		endTime,
		linkForQrCode,
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
				<Grid item container alignItems="flex-end" xs={12} md={9}>
					<Grid item container alignItems="flex-end" xs={12} md={4}>
						<SelectField items={names} value={status} onChange={(e) => setStatus(String(e))} />
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
						<DateRangField
							label="Дата мероприятия*"
							startValue={startDate}
							endValue={endDate}
							setEndValue={setendDate}
							setStartValue={setstartDate}
						/>
						<TimeRangField
							label="Время мероприятия*"
							startValue={startTime}
							endValue={endTime}
							setEndValue={setendTime}
							setStartValue={setstartTime}
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

type TEventObjectProps = {
	id?: number;
	eventsObjectVM?: TEventsCreate;
	onSubmit: PropertyHandler<TEventsCreate>;
	onDelete: PropertyHandler<{id: number}>;
};

export default EventObject;
