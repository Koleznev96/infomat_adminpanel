import React, {useCallback, useState} from 'react';
import {Grid} from '@mui/material';

import PropertyHandler from '@infomat/core/src/Types/PropertyHandler';
import ButtonWithTooltip from '@infomat/uikit/src/Button/ButtonWithTooltip';
import ButtonDelete from '@infomat/uikit/src/Button/ButtonDelete';
import TextField from '@infomat/uikit/src/Fields/TextField/TextField';
import IconFiledWithPreview from '@infomat/uikit/src/Fields/IconFiledWithPreview/IconFiledWithPreview';
import {isUndefined} from 'lodash';

const CategoryObject = ({onSubmit, onDelete}: TCategoryObjectProps) => {
	const [labelRu, setLabelRu] = useState('');
	const [labelEng, setLabelEng] = useState('');

	const isDisabledSave = !labelRu.length || !labelEng.length;

	const onSave = useCallback(() => {
		onSubmit();
	}, []);

	return (
		<Grid container spacing={3}>
			<Grid item container xs={12} md={12} gap={3}>
				<IconFiledWithPreview file={'0'} label="Загрузить подложку 56х56" />
				<IconFiledWithPreview label="Загрузить иконку 30х30" />
			</Grid>
			<Grid item xs={12} md={6}>
				<TextField
					label={'Название на русском языке'}
					variant="outlined"
					tabIndex={1}
					onChange={(e) => setLabelRu(e.target.value)}
					value={labelRu}
					placeholder="Название на русском языке"
				/>
			</Grid>
			<Grid item xs={12} md={6}>
				<TextField
					label={'Название на английском языке'}
					variant="outlined"
					tabIndex={2}
					onChange={(e) => setLabelEng(e.target.value)}
					value={labelEng}
					placeholder="Название на английском языке"
				/>
			</Grid>
			<Grid item container gap={1.5}>
				<ButtonWithTooltip onClick={onSave} disabled={isDisabledSave} tabIndex={3}>
					Сохранить
				</ButtonWithTooltip>
				{!isUndefined(onDelete) && (
					<ButtonDelete onClick={onSave} tabIndex={4}>
						Удалить категорию объектов
					</ButtonDelete>
				)}
			</Grid>
		</Grid>
	);
};

type TCategoryObjectProps = {
	login?: string;
	onSubmit: PropertyHandler;
	onDelete?: PropertyHandler;
};

export default CategoryObject;
