import React, {useCallback, useState} from 'react';
import {Grid, SelectChangeEvent} from '@mui/material';
import {isUndefined} from 'lodash';

import PropertyHandler from '@infomat/core/src/Types/PropertyHandler';
import ButtonWithTooltip from '@infomat/uikit/src/Button/ButtonWithTooltip';
import ButtonDelete from '@infomat/uikit/src/Button/ButtonDelete';
import TextField from '@infomat/uikit/src/Fields/TextField/TextField';
import IconFiledWithPreview from '@infomat/uikit/src/Fields/IconFiledWithPreview/IconFiledWithPreview';
import SelectField from '@infomat/uikit/src/Fields/SelectField/SelectField';
import {IconType} from '@infomat/uikit/src/Icon';

const SubcategoryObject = ({onSubmit, onDelete}: TSubcategoryObjectProps) => {
	const [labelRu, setLabelRu] = useState('');
	const [labelEng, setLabelEng] = useState('');
	const [category, setCategory] = useState<{icon?: IconType; label: string} | undefined>(undefined);

	const isDisabledSave = !labelRu.length || !labelEng.length;

	const onSave = useCallback(() => {
		onSubmit();
	}, []);

	const handleChange = (event: {icon?: IconType; label: string}) => {
		setCategory(event);
	};

	return (
		<Grid container spacing={3}>
			<Grid item container xs={12} md={12} gap={3}>
				<IconFiledWithPreview file={'0'} label="Загрузить иконку 24х24" />
			</Grid>
			<Grid item xs={12} md={6}>
				<TextField
					label={'Название на русском языке*'}
					variant="outlined"
					tabIndex={1}
					onChange={(e) => setLabelRu(e.target.value)}
					value={labelRu}
					placeholder="Название на русском языке"
				/>
			</Grid>
			<Grid item xs={12} md={6}>
				<TextField
					label={'Название на английском языке*'}
					variant="outlined"
					tabIndex={2}
					onChange={(e) => setLabelEng(e.target.value)}
					value={labelEng}
					placeholder="Название на английском языке"
				/>
			</Grid>
			<Grid item container xs={12} md={6}>
				<SelectField
					value={category}
					onChange={handleChange}
					label="Родительская категория*"
					placeholder="Категории объектов"
				/>
			</Grid>
			<Grid item container gap={1.5}>
				<ButtonWithTooltip onClick={onSave} disabled={isDisabledSave} tabIndex={3}>
					Сохранить
				</ButtonWithTooltip>
				{!isUndefined(onDelete) && (
					<ButtonDelete onClick={onSave} tabIndex={4}>
						Удалить подкатегорию объектов
					</ButtonDelete>
				)}
			</Grid>
		</Grid>
	);
};

type TSubcategoryObjectProps = {
	login?: string;
	onSubmit: PropertyHandler;
	onDelete?: PropertyHandler;
};

export default SubcategoryObject;
