import React, {useCallback, useState} from 'react';
import {Grid} from '@mui/material';
import {isUndefined} from 'lodash';

import PropertyHandler from '@infomat/core/src/Types/PropertyHandler';
import ButtonWithTooltip from '@infomat/uikit/src/Button/ButtonWithTooltip';
import ButtonDelete from '@infomat/uikit/src/Button/ButtonDelete';
import TextField from '@infomat/uikit/src/Fields/TextField/TextField';
import IconFiledWithPreview from '@infomat/uikit/src/Fields/IconFiledWithPreview/IconFiledWithPreview';
import {TSubcategoryObjectCreate, TSubcategoryObjectVM} from '@infomat/core/src/Redux/SubcategoryObject/entityAdapter';
import {TFile, TFileLocal} from '@infomat/core/src/Types/media';

import SelectCategoryFieldContainer from 'src/Components/SelectCategoryField/SelectCategoryFieldContainer';

const SubcategoryObject = ({onSubmit, onDelete, subcategoryObjectVM, id}: TSubcategoryObjectProps) => {
	const [title, setTitle] = useState(subcategoryObjectVM?.title || '');
	const [titleEn, setTitleEn] = useState(subcategoryObjectVM?.titleEn || '');
	const [icon, onIcon] = useState<TFile | TFileLocal>(subcategoryObjectVM?.icon || {url: null});
	const [categoryId, setCategoryId] = useState<number | undefined>(subcategoryObjectVM?.category.id || undefined);

	const isDisabledSave = !title.length || !titleEn.length || icon.url === null || isUndefined(categoryId);

	const onSave = useCallback(() => {
		onSubmit({id, title, titleEn, categoryId, icon});
	}, [id, title, titleEn, categoryId, icon, onSubmit]);

	const handleChange = (id: number) => {
		setCategoryId(id);
	};

	return (
		<Grid container spacing={3}>
			<Grid item container xs={12} md={12} gap={3}>
				<IconFiledWithPreview onAttach={onIcon} file={icon} label="Загрузить иконку 24х24*" />
			</Grid>
			<Grid item xs={12} md={6}>
				<TextField
					label={'Название на русском языке*'}
					variant="outlined"
					tabIndex={1}
					onChange={(e) => setTitle(e.target.value)}
					value={title}
					placeholder="Название на русском языке"
				/>
			</Grid>
			<Grid item xs={12} md={6}>
				<TextField
					label={'Название на английском языке*'}
					variant="outlined"
					tabIndex={2}
					onChange={(e) => setTitleEn(e.target.value)}
					value={titleEn}
					placeholder="Название на английском языке"
				/>
			</Grid>
			<Grid item container xs={12} md={6}>
				<SelectCategoryFieldContainer
					value={categoryId}
					onChange={handleChange}
					label="Родительская категория*"
					placeholder="Категории объектов"
				/>
			</Grid>
			<Grid item container gap={1.5}>
				<ButtonWithTooltip onClick={onSave} disabled={isDisabledSave} tabIndex={3}>
					Сохранить
				</ButtonWithTooltip>
				{!isUndefined(id) && (
					<ButtonDelete onClick={onSave} tabIndex={4}>
						Удалить подкатегорию объектов
					</ButtonDelete>
				)}
			</Grid>
		</Grid>
	);
};

type TSubcategoryObjectProps = {
	onSubmit: PropertyHandler<TSubcategoryObjectCreate>;
	onDelete: PropertyHandler<{id: number}>;
	subcategoryObjectVM?: TSubcategoryObjectVM;
	id?: number;
};

export default SubcategoryObject;
