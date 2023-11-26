import {createEntityAdapter} from '@reduxjs/toolkit';
import {PartialBy} from '@infomat/core/src/Types/PartialBy';
import {TFile, TFileLocal} from '../../Types/media';
import {TCategoryObjectVM} from '../CategoryObject/entityAdapter';

export const subcategoryObjectAdapter = createEntityAdapter<TSubcategoryObjectVM>({
	selectId: (subcategoryObject: TSubcategoryObjectVM) => subcategoryObject.id,
});

export type TSubcategoryObjectCreate = {
	id?: number;
	title?: string;
	titleEn?: string;
	icon?: TFile | TFileLocal;
	categoryId?: number;
};

export type TSubcategoryObjectVM = {
	id: number;
	title: string;
	titleEn: string;
	icon: TFile;
	category: TCategoryObjectVM;
};

export type TCategoryObject = PartialBy<TSubcategoryObjectVM, 'id'>;
