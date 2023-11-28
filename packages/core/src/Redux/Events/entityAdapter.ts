import {createEntityAdapter} from '@reduxjs/toolkit';
import {PartialBy} from '@infomat/core/src/Types/PartialBy';
import {TFile, TFileCrop, TFrameCrop} from '@infomat/core/src/Types/media';

export const eventsAdapter = createEntityAdapter<TEventsVM>({
	selectId: (events: TEventsVM) => events.id,
});

export type TEventsCreate = {
	id?: number;
	title?: string;
	titleEn?: string;
	status?: string;
	startDate?: string;
	endDate?: string;
	startTime?: string;
	endTime?: string;
	phone?: string;
	email?: string;
	website?: string;
	description?: string;
	descriptionEn?: string;
	cover?: TFileCrop;
	photos?: TFileCrop[];
	frames?: TFrameCrop[];
	coverFrame?: TFrameCrop;
	photoIdsForRemoving?: number[];
	linkForQrCode?: string;
	address?: {
		address?: string;
		addressEn?: string;
		latitude?: number;
		longitude?: number;
	};
};

export type TEventsVM = {
	id: number;
	title: string;
	titleEn: string;
	status: string;
	cover: TFile;
	description: string;
	descriptionEn: string;
	startDate: string;
	endDate?: string;
	startTime: string;
	endTime?: string;
};

export type TEvents = PartialBy<TEventsVM, 'id'>;
