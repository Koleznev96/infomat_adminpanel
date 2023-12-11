import {createEntityAdapter} from '@reduxjs/toolkit';
import {PartialBy} from '@infomat/core/src/Types/PartialBy';
import {TFile, TFileLocal} from '@infomat/core/src/Types/media';
import {TPlacesVM} from '../Places/entityAdapter';

export const routesAdapter = createEntityAdapter<TRoutesVM>({
	selectId: (routes: TRoutesVM) => routes.id,
});

export type TStop = {
	id?: number;
	place?: TPlacesVM;
	sequenceNumber?: number;
	address?: {
		address?: string;
		addressEn?: string;
		latitude?: number;
		longitude?: number;
	};
};

export type TRoutesCreate = {
	id?: number;
	title?: string;
	titleEn?: string;
	status?: string;
	icon?: TFile | TFileLocal;
	description?: string;
	descriptionEn?: string;
	backgroundColor?: string;
	routeColor?: string;
	length?: string;
	lengthEn?: string;
	duration?: string;
	durationEn?: string;
	type?: string;
	typeEn?: string;
	stops?: TStop[];
};

export type TRoutesVM = {
	id: number;
	title: string;
	titleEn: string;
	status: string;
	icon: TFile;
	description: string;
	descriptionEn: string;
	backgroundColor: string;
	length: string;
	lengthEn: string;
	duration: string;
	durationEn: string;
	type: string;
	typeEn: string;
};

export type TRoutes = PartialBy<TRoutesVM, 'id'>;
