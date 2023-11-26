import React, {useCallback, useState} from 'react';
import {Grid} from '@mui/material';
import {isUndefined} from 'lodash';

import PropertyHandler from '@infomat/core/src/Types/PropertyHandler';
import ButtonWithTooltip from '@infomat/uikit/src/Button/ButtonWithTooltip';
import ButtonDelete from '@infomat/uikit/src/Button/ButtonDelete';
import TextField from '@infomat/uikit/src/Fields/TextField/TextField';
import IconFiledWithPreview from '@infomat/uikit/src/Fields/IconFiledWithPreview/IconFiledWithPreview';
import {TCategoryObjectCreate} from '@infomat/core/src/Redux/CategoryObject/entityAdapter';
import ColorPicker from '@infomat/uikit/src/Fields/ColorPicker/ColorPicker';

const CategoryObject = ({onSubmit, onDelete, categoryObjectVM, id}: TCategoryObjectProps) => {
	const [title, setTitle] = useState(categoryObjectVM?.title || '');
	const [titleEn, setTitleEn] = useState(categoryObjectVM?.titleEn || '');
	const [backgroundColor, onBackgroundColor] = useState(categoryObjectVM?.backgroundColor || undefined);
	const [icon, onIcon] = useState(categoryObjectVM?.icon || {url: null});

	const isDisabledSave = !title.length || !titleEn.length || icon.url === null || backgroundColor === undefined;

	const onSave = useCallback(() => {
		onSubmit({id, title, titleEn, backgroundColor, icon});
	}, [id, title, titleEn, backgroundColor, icon, onSubmit]);

	return (
		<Grid container spacing={3}>
			<Grid item container xs={12} md={12} gap={3}>
				<IconFiledWithPreview onAttach={onIcon} file={icon} label="Загрузить иконку 30х30" />
			</Grid>
			<Grid item container xs={12} md={12}>
				<Grid item xs={12} md={6}>
					{/* <IconFiledWithPreview onAttach={onBackground} file={background} label="Загрузить подложку 56х56" /> */}
					<ColorPicker label="Цвет подложки (HEX, с решёткой)*" value={backgroundColor} setValue={onBackgroundColor} />
				</Grid>
			</Grid>
			<Grid item xs={12} md={6}>
				<TextField
					label={'Название на русском языке'}
					variant="outlined"
					tabIndex={1}
					onChange={(e) => setTitle(e.target.value)}
					value={title}
					placeholder="Название на русском языке"
				/>
			</Grid>
			<Grid item xs={12} md={6}>
				<TextField
					label={'Название на английском языке'}
					variant="outlined"
					tabIndex={2}
					onChange={(e) => setTitleEn(e.target.value)}
					value={titleEn}
					placeholder="Название на английском языке"
				/>
			</Grid>
			<Grid item container gap={1.5}>
				<ButtonWithTooltip onClick={onSave} disabled={isDisabledSave} tabIndex={3}>
					Сохранить
				</ButtonWithTooltip>
				{!isUndefined(id) && (
					<ButtonDelete onClick={() => onDelete({id})} tabIndex={4}>
						Удалить категорию объектов
					</ButtonDelete>
				)}
			</Grid>
		</Grid>
	);
};

type TCategoryObjectProps = {
	onSubmit: PropertyHandler<TCategoryObjectCreate>;
	onDelete: PropertyHandler<{id: number}>;
	categoryObjectVM?: TCategoryObjectCreate;
	id?: number;
};

export default CategoryObject;
