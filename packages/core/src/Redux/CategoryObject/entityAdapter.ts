import {createEntityAdapter} from '@reduxjs/toolkit';
import {PartialBy} from '@infomat/core/src/Types/PartialBy';
import {TFile, TFileLocal} from '../../Types/media';

export const categoryObjectAdapter = createEntityAdapter<TCategoryObjectVM>({
	selectId: (categoryObject: TCategoryObjectVM) => categoryObject.id,
});

export type TCategoryObjectCreate = {
	id?: number;
	color?: string;
	backgroundColor?: string;
	title?: string;
	titleEn?: string;
	icon?: TFile | TFileLocal;
	description?: string;
	descriptionEn?: string;
};

export type TCategoryObjectVM = {
	id: number;
	backgroundColor: string;
	title: string;
	titleEn: string;
	icon: TFile;
};

export type TCategoryObject = PartialBy<TCategoryObjectVM, 'id'>;
