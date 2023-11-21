import React, {useState} from 'react';
import {Typography} from '@mui/material';
import classNames from 'classnames';

import {Icon, IconSize, IconType} from '@infomat/uikit/src/Icon';
import MediaAttachment from '@infomat/uikit/src/Media/MediaAttachment/MediaAttachment';
import PropertyHandler from '@infomat/core/src/Types/PropertyHandler';
import ServiceFactory from '@infomat/core/src/Services/ServiceFactory';

import style from './IconFiledWithPreview.module.scss';

const IconFiledWithPreview = ({label, file, onAttach, error}: TIconFiledWithPreviewProps) => {
	const [errorFile, setErrorFile] = useState<string | null>(null);
	const resError = errorFile || error;

	return (
		<div>
			<div className={style.container}>
				<MediaAttachment
					isDisabled={file !== null}
					onSuccess={onAttach}
					onError={setErrorFile}
					isImageAllowed={true}
					isVideoAllowed={false}
					isAudioAllowed={false}
					sizeIcon={IconSize.medium}
				>
					{({getRootProps, open, dropZoneOverlay}) => (
						<section {...getRootProps()}>
							<div onClick={open} className={classNames(style.file, {[style.isActive]: file === null})}>
								{dropZoneOverlay}
								{file !== null ? (
									<>
										<img
											className={style.img}
											src={file instanceof File ? ServiceFactory.uiContainer.createObjectURL(file as File) : file}
											alt={'Image'}
										/>
										<div onClick={() => onAttach(null)} className={style.clearIcon}>
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
	file?: File | string | null;
	onAttach: PropertyHandler<File | null>;
	error?: string;
};

export default IconFiledWithPreview;
