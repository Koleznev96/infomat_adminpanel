import _ from 'lodash';

export enum EnumMediaType {
	BITMAP = 'Bitmap',
	AUDIO = 'Audio',
	VIDEO = 'Video',
	TICKET = 'Ticket',
	TICKET_SHOW = 'TicketShow',
}

const getMediaType = (file?: File): EnumMediaType | undefined => {
	let mediaType = undefined;

	if (_.isUndefined(file)) {
		return mediaType;
	}

	if (_.startsWith(file.type, 'image')) {
		mediaType = EnumMediaType.BITMAP;
	}

	if (_.startsWith(file.type, 'video')) {
		mediaType = EnumMediaType.VIDEO;
	}

	if (_.startsWith(file.type, 'audio')) {
		mediaType = EnumMediaType.AUDIO;
	}

	return mediaType;
};

export default getMediaType;
