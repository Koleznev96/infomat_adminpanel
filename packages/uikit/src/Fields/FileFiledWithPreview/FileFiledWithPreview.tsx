import React, {useState, useCallback} from 'react';
import {Typography, Grid, Modal, Box} from '@mui/material';
import classNames from 'classnames';
import _ from 'lodash';
import ReactCrop, {type Crop} from 'react-image-crop';

import {Icon, IconSize, IconType} from '@infomat/uikit/src/Icon';
import MediaAttachment from '@infomat/uikit/src/Media/MediaAttachment/MediaAttachment';
import ServiceFactory from '@infomat/core/src/Services/ServiceFactory';
import PropertyHandler from '@infomat/core/src/Types/PropertyHandler';
import Button from '@infomat/uikit/src/Button/Button';
import VideoPlayer from '@infomat/uikit/src/Media/MediaPlayers/VideoPlayer/VideoPlayer';

import style from './FileFiledWithPreview.module.scss';
import {TVideo} from '@infomat/core/src/Types/media';

export interface ILocalFile {
	uri: string;
	type: string;
	name: string;
}

function getImageDimensions(file: File): Promise<HTMLImageElement> {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => {
			resolve(img);
		};
		img.onerror = () => {
			reject(new Error('Failed to load image'));
		};
		img.src = URL.createObjectURL(file);
	});
}

const FileFiledWithPreview = ({
	label,
	files = [{url: null}],
	onAttach,
	onAttachAndCrop,
	isImageAllowed = false,
	isVideoAllowed = false,
	totalFiles = 1,
	error,
}: TFileFiledWithPreviewProps) => {
	const [errorFile, setErrorFile] = useState<string | null>(null);
	const [crop, setCrop] = useState<Crop>();
	const [imageCrop, setImageCrop] = useState<File | null>(null);
	const [indexCrop, setIndexCrop] = useState<number>(0);

	const onAttachSuccess = useCallback(
		(index: number, file: File) => {
			if (onAttachAndCrop) {
				getImageDimensions(file)
					.then((img) => {
						const {width, height} = img;
						let data: Crop = {
							x: 0,
							y: 16.67,
							height: 66.66,
							width: 100,
							unit: '%',
						};
						if (width !== height) {
							const h = (2 * width) / 3;
							const w = (height * 3) / 2;
							const hi = h > height ? 100 : (h * 100) / height;
							const wi = h > height ? (w * 100) / width : 100;
							data = {
								x: wi < 100 ? (100 - wi) / 2 : 0,
								y: hi < 100 ? (100 - hi) / 2 : 0,
								height: hi,
								width: wi,
								unit: '%',
							};
						}
						setCrop(data);
						setImageCrop(file);
						setIndexCrop(index);
					})
					.catch((error) => {
						console.log('Error:', error);
						setCrop(undefined);
					});
			} else {
				onAttach && onAttach(index, file);
			}
			setCrop(undefined);
		},
		[onAttachAndCrop, onAttach, setImageCrop, setIndexCrop, setCrop],
	);

	const exitCrop = useCallback(() => {
		setImageCrop(null);
	}, [setImageCrop]);

	const saveCropImage = useCallback(() => {
		if (imageCrop)
			getImageDimensions(imageCrop)
				.then((img) => {
					const {width, height} = img;
					if (crop) {
						const data = {
							x: (Math.round(crop?.x) * width) / 100,
							y: (Math.round(crop?.y) * height) / 100,
							height: (Math.round(crop?.height) * height) / 100,
							width: (Math.round(crop?.width) * width) / 100,
							unit: crop.unit,
						};
						onAttachAndCrop && onAttachAndCrop(indexCrop, imageCrop, data);
					}
					setCrop(undefined);
				})
				.catch((error) => {
					console.log('Error:', error);
					setCrop(undefined);
				});

		exitCrop();
	}, [onAttachAndCrop, exitCrop, indexCrop, imageCrop, crop]);

	const remove = useCallback(
		(index: number) => {
			onAttachAndCrop && onAttachAndCrop(index, null, undefined);
			onAttach && onAttach(index, null);
			setCrop(undefined);
		},
		[onAttachAndCrop, onAttach],
	);

	return (
		<Grid container direction="column">
			{label && (
				<Grid item>
					<Typography className={style.title}>{label}</Typography>
				</Grid>
			)}
			<Grid item container gap={0.625}>
				{_.map(_.times(totalFiles, _.identity), (index: number) => {
					const file = files[index]?.url || files[index]?.url3x2 ? files[index]?.url || files[index]?.url3x2 : null;
					return (
						<MediaAttachment
							key={index}
							isDisabled={file !== null}
							onSuccess={(file) => onAttachSuccess(index, file)}
							onError={setErrorFile}
							isImageAllowed={isImageAllowed}
							isVideoAllowed={isVideoAllowed}
							isAudioAllowed={false}
						>
							{({getRootProps, open, dropZoneOverlay}) => (
								<section {...getRootProps()}>
									<Grid item className={classNames(style.item, {[style.isActive]: file === null})} onClick={open}>
										{dropZoneOverlay}
										{file !== null ? (
											<>
												{isImageAllowed && (
													<img
														className={style.img}
														src={file instanceof File ? URL.createObjectURL(file as File) : file}
														alt={'Image'}
													/>
												)}
												{isVideoAllowed && (
													<VideoPlayer
														src={file instanceof File ? URL.createObjectURL(file as File) : file}
														className={style.img}
														isTranscoded={false}
														autoPlay={false}
														controls={false}
														muted
													/>
												)}
												<div onClick={() => remove(index)} className={style.clearIcon}>
													<Icon type={IconType.close} size={IconSize.small} />
												</div>
											</>
										) : (
											<div className={style.wrapper}>
												<div className={style.icon}>
													<Icon type={IconType.add} size={IconSize.small} />
												</div>
												<Typography className={style.label}>Добавить</Typography>
											</div>
										)}
									</Grid>
								</section>
							)}
						</MediaAttachment>
					);
				})}
			</Grid>
			{(errorFile || error) && (
				<Grid item container>
					<Typography className={style.error}>{errorFile || error}</Typography>
				</Grid>
			)}
			<Modal open={!!imageCrop} onClose={exitCrop}>
				<Box className={style.modal}>
					<Typography className={style.title}>Выберите 2:3 области</Typography>
					<div className={style.boxCrop}>
						{imageCrop && (
							<ReactCrop aspect={3 / 2} crop={crop} onChange={(_, value) => setCrop(value)}>
								<img className={style.imgCrop} src={URL.createObjectURL(imageCrop)} />
							</ReactCrop>
						)}
					</div>
					<Grid container direction="row" justifyContent="flex-end" marginTop={3}>
						<Button className={style.button} variant="outlined" onClick={exitCrop}>
							Отменить
						</Button>
						<Button disabled={crop === undefined || crop === null} variant="contained" onClick={saveCropImage}>
							Сохранить
						</Button>
					</Grid>
				</Box>
			</Modal>
		</Grid>
	);
};

type TFileFiledWithPreviewProps = {
	label?: string;
	files?: TVideo[];
	onAttach?: PropertyHandler<number, File | null>;
	onAttachAndCrop?: PropertyHandler<number, File | null, Crop | undefined>;
	error?: string;
	isImageAllowed?: boolean;
	isVideoAllowed?: boolean;
	totalFiles?: number;
};

export default FileFiledWithPreview;
