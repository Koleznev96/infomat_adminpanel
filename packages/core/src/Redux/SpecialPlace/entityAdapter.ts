import {createEntityAdapter} from '@reduxjs/toolkit';
import {TFile, TFileLocal} from '@infomat/core/src/Types/media';

export const specialPlaceAdapter = createEntityAdapter<TSpecialPlaceVM>({
	selectId: (specialPlace: TSpecialPlaceVM) => specialPlace.id,
});

export type TSpecialPlaceCreate = {
	id?: number;
	type?: string;
	icon?: TFile | TFileLocal;
	backgroundColor?: string;
	address?: {
		address?: string;
		addressEn?: string;
		latitude?: number;
		longitude?: number;
	};
};

export type TSpecialPlaceVM = {
	id: number;
	type: string;
	icon: TFile;
	backgroundColor: string;
	address?: {
		address?: string;
		addressEn?: string;
		latitude?: number;
		longitude?: number;
	};
};
