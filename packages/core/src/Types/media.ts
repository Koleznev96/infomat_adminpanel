import {AudioHTMLAttributes, DetailedHTMLProps, ImgHTMLAttributes, VideoHTMLAttributes} from 'react';

export type TVideoProps = {isTranscoded?: boolean} & Pick<
	DetailedHTMLProps<VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>,
	'src' | 'autoPlay' | 'controls' | 'muted' | 'disablePictureInPicture' | 'poster' | 'className'
>;

export type TAudioProps = {duration?: string; isColorful?: boolean} & Pick<
	DetailedHTMLProps<AudioHTMLAttributes<HTMLAudioElement>, HTMLAudioElement>,
	'src'
>;

export type TImageProps = Pick<
	DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>,
	'src' | 'srcSet'
>;

export enum EnumMediaType {
	BITMAP = 'Bitmap',
	AUDIO = 'Audio',
	VIDEO = 'Video',
	TICKET = 'Ticket',
	TICKET_SHOW = 'TicketShow',
}

export type TMediaProps =
	| ({
			type: EnumMediaType.BITMAP;
			file?: File;
	  } & TImageProps)
	| ({
			type: EnumMediaType.VIDEO;
	  } & TVideoProps)
	| ({
			type: EnumMediaType.AUDIO;
	  } & TAudioProps)
	| {
			type: EnumMediaType.TICKET;
	  };

export type TMediaPreviewProps = {
	isProcessing?: boolean;
	uploadingProgress?: number;
} & TMediaProps;

export enum EnumVideoFacingMode {
	user = 'user',
	environment = 'environment',
}
