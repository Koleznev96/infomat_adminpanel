import React, {useState} from 'react';
import {Typography} from '@mui/material';
import classNames from 'classnames';

import {Icon, IconSize, IconType} from '@infomat/uikit/src/Icon';
import MediaAttachment from '@infomat/uikit/src/Media/MediaAttachment/MediaAttachment';
import PropertyHandler from '@infomat/core/src/Types/PropertyHandler';

import style from './IconFiledWithPreview.module.scss';
import {TFile, TFileLocal} from '@infomat/core/src/Types/media';

const IconFiledWithPreview = ({label, file, onAttach, error}: TIconFiledWithPreviewProps) => {
	const [errorFile, setErrorFile] = useState<string | null>(null);
	const resError = errorFile || error;

	return (
		<div>
			<div className={style.container}>
				<MediaAttachment
					isDisabled={file.url !== null}
					onSuccess={(file) => onAttach({url: file})}
					onError={setErrorFile}
					isIconAllowed={true}
					isImageAllowed={false}
					isVideoAllowed={false}
					isAudioAllowed={false}
					sizeIcon={IconSize.medium}
				>
					{({getRootProps, open, dropZoneOverlay}) => (
						<section {...getRootProps()}>
							<div onClick={open} className={classNames(style.file, {[style.isActive]: file.url === null})}>
								{dropZoneOverlay}
								{file.url !== null ? (
									<>
										<img
											className={style.img}
											src={file.url instanceof File ? URL.createObjectURL(file.url as File) : file.url}
											alt={'Image'}
										/>
										<div onClick={() => onAttach({url: null})} className={style.clearIcon}>
											<Icon type={IconType.close} size={IconSize.micro} />
										</div>
									</>
								) : (
									<Icon type={IconType.add} size={IconSize.medium} />
								)}
							</div>
						</section>
					)}
				</MediaAttachment>
				{label && <Typography className={style.label}>{label}</Typography>}
			</div>
			{resError && <Typography className={style.error}>{resError}</Typography>}
		</div>
	);
};

type TIconFiledWithPreviewProps = {
	label?: string;
	file: TFile | TFileLocal;
	onAttach: PropertyHandler<TFile | TFileLocal>;
	error?: string;
};

export default IconFiledWithPreview;
