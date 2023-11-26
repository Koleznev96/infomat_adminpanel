import {createEntityAdapter} from '@reduxjs/toolkit';
import {PartialBy} from '@infomat/core/src/Types/PartialBy';
import {TFile, TFileCrop, TFrameCrop} from '@infomat/core/src/Types/media';
import {TSubcategoryObjectVM} from '../SubcategoryObject/entityAdapter';

export const placesAdapter = createEntityAdapter<TPlacesVM>({
	selectId: (places: TPlacesVM) => places.id,
});

export type TPlacesCreate = {
	id?: number;
	recommended?: boolean;
	title?: string;
	titleEn?: string;
	subcategoryId?: number;
	status?: string;
	phone?: string;
	email?: string;
	website?: string;
	description?: string;
	descriptionEn?: string;
	workingHours?: string;
	cover?: TFileCrop;
	photos?: TFileCrop[];
	frames?: TFrameCrop[];
	subcategory?: TSubcategoryObjectVM;
	photoIdsForRemoving?: number[];
	address?: {
		address?: string;
		latitude?: number;
		longitude?: number;
	};
};

export type TPlacesVM = {
	id: number;
	title: string;
	titleEn: string;
	status: string;
	cover: TFile;
	description: string;
	descriptionEn: string;
	address?: {
		address?: string;
		latitude?: number;
		longitude?: number;
	};
};

export type TPlaces = PartialBy<TPlacesVM, 'id'>;
