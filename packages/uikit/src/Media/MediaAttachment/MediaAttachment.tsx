import React, {DragEvent, ReactNode, useCallback, useMemo, useState} from 'react';
import _ from 'lodash';
import Dropzone, {Accept, DropzoneState, FileRejection} from 'react-dropzone';

import DropZoneOverlay from '@infomat/uikit/src/Media/MediaAttachment/DropZoneOverlay/DropZoneOverlay';
import PropertyHandler from '@infomat/core/src/Types/PropertyHandler';
import {IconSize} from '@infomat/uikit/src/Icon';

const MediaAttachment = ({
	isDisabled = false,
	isIconAllowed = false,
	isImageAllowed = true,
	isAudioAllowed = true,
	isVideoAllowed = true,
	onSuccess,
	onError,
	children,
	capture,
	sizeIcon,
}: TMediaAttachmentProps) => {
	const [isDropzoneOverlayVisible, setIsDropzoneOverlayVisible] = useState(false);

	const onDrag = useCallback((event: DragEvent) => {
		if (event.type === 'dragenter') {
			setIsDropzoneOverlayVisible(true);
		} else if (event.type === 'dragleave') {
			setIsDropzoneOverlayVisible(false);
		}
	}, []);

	/**
	 * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
	 */
	const supportedMimeTypes = useMemo((): Accept => {
		const supportedMimeTypes: Accept = {};

		if (isIconAllowed) {
			supportedMimeTypes['image/png'] = ['.png'];
			supportedMimeTypes['image/svg'] = ['.svg'];
		}

		if (isImageAllowed) {
			supportedMimeTypes['image/bmp'] = ['.bmp'];
			supportedMimeTypes['image/avif'] = ['.avif'];
			supportedMimeTypes['image/jpeg'] = ['.jpeg', '.jpg'];
			supportedMimeTypes['image/png'] = ['.png'];
			supportedMimeTypes['image/svg'] = ['.svg'];
			supportedMimeTypes['image/tiff'] = ['.tif', '.tiff'];
			// supportedMimeTypes['image/webp'] = ['.webp'];
			supportedMimeTypes['image/heic'] = ['.heic'];
			supportedMimeTypes['image/heif'] = ['.heif'];
		}

		if (isVideoAllowed) {
			supportedMimeTypes['video/*'] = [];
		}
		if (isAudioAllowed) {
			supportedMimeTypes['audio/*'] = [];
		}

		return supportedMimeTypes;
	}, [isImageAllowed, isAudioAllowed, isVideoAllowed, isIconAllowed]);

	const onDrop = useCallback(
		(acceptedFiles: File[], fileRejections: FileRejection[]) => {
			if (onError && _.size(fileRejections) > 0) {
				const rejectedFileNames = _.chain(fileRejections)
					.map((fileRejection) => _.get(fileRejection, 'file.name', _.get(fileRejection, 'file.path', '')))
					.join(', ')
					.value();

				setIsDropzoneOverlayVisible(false);

				onError(`upload_failed ${rejectedFileNames}`);

				return;
			}

			if (onSuccess) {
				setIsDropzoneOverlayVisible(false);

				const file = _.head(acceptedFiles);

				if (!_.isUndefined(file)) {
					onSuccess(file);
				}
			}
		},
		[onSuccess, onError, isImageAllowed, isVideoAllowed, isAudioAllowed, isIconAllowed],
	);
	return (
		<Dropzone
			noClick
			noKeyboard
			disabled={isDisabled}
			multiple={false}
			onDragLeave={onDrag}
			onDragEnter={onDrag}
			onDrop={onDrop}
			accept={supportedMimeTypes}
		>
			{_.isFunction(children)
				? (state) =>
						children({
							...state,
							dropZoneOverlay: <DropZoneOverlay size={sizeIcon} isActive={isDropzoneOverlayVisible} />,
						})
				: ({getRootProps, getInputProps}) => (
						<label {...getRootProps()}>
							{children}
							<input {...(capture ? _.omit(getInputProps(), 'accept') : getInputProps())} capture={capture} />
						</label>
				  )}
		</Dropzone>
	);
};

type TMediaAttachmentProps = {
	isDisabled?: boolean;
	isIconAllowed?: boolean;
	isImageAllowed?: boolean;
	isVideoAllowed?: boolean;
	isAudioAllowed?: boolean;
	onSuccess?: PropertyHandler<File>;
	onError?: PropertyHandler<string>;
	sizeIcon?: IconSize;
} & (
	| {
			children(state: DropzoneState & {dropZoneOverlay: JSX.Element}): JSX.Element;
			capture?: undefined;
	  }
	| {
			children?: ReactNode;
			capture?: 'user' | 'environment';
	  }
);

export default MediaAttachment;
