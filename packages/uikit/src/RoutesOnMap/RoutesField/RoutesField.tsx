import React, {useState} from 'react';
import {TextFieldProps, Grid, Typography} from '@mui/material';
import {Reorder} from 'framer-motion';

import ItemRout from './ItemRout';
import style from './RoutesField.module.scss';
import classNames from 'classnames';

const initItems = [
	{key: '0', value: ''},
	{key: '1', value: ''},
];

const serchItems = [
	'sadfdsafdsafdasfadsfdsafsadfdsafdsafdasfadsfdsaf',
	'sadfdsafdsafda sfadsfdsafsadfds afdsafdasfadsfdsaf',
	'sadfdsafdsaf',
	'sadfdsafdsafdasfadsfdsaf',
	'dsgadgfsdfgfgsdgsdfgfdsgsdfg',
];

const RoutesField = ({hasError, label, ...restProps}: TRoutesFieldProps) => {
	const [items, setItems] = useState(initItems);

	const onAdd = () => {
		setItems([...items, {key: items[items.length - 1].key + 1, value: ''}]);
	};

	const onClear = () => {
		setItems([
			{key: '0', value: ''},
			{key: '1', value: ''},
		]);
	};

	const removeToIndex = (index: number) => {
		const newItems = [...items];
		if (items.length <= 2) {
			newItems[index].value = '';
		} else {
			newItems.splice(index, 1);
		}
		setItems(newItems);
	};

	const inputChange = (value: string, index: number) => {
		const newItems = [...items];
		newItems[index].value = value;
		setItems(newItems);
	};

	const selectChange = (value: string, index: number) => {};

	return (
		<Grid container direction="column">
			{label && <Typography className={style.label}>{label}</Typography>}
			<div className={style.container}>
				<Reorder.Group axis="y" values={items} onReorder={setItems}>
					{items.map((item, index) => (
						<ItemRout
							inputValue={item.value}
							inputChange={inputChange}
							onItem={selectChange}
							index={index}
							key={item.key}
							item={item}
							removeToIndex={removeToIndex}
							isLoading={!!index}
							searchItems={serchItems}
						/>
					))}
				</Reorder.Group>
			</div>
			<div className={style.wrapper}>
				<div
					className={classNames(style.button, {[style.isDisabled]: items.length > 5})}
					onClick={() => items.length <= 5 && onAdd()}
				>
					Добавить точку
				</div>
				{items.length > 2 || items[0].value.length || items[1].value.length ? (
					<div className={style.button} onClick={onClear}>
						Сбросить
					</div>
				) : null}
			</div>
		</Grid>
	);
};

type TRoutesFieldProps = TextFieldProps & {
	hasError?: boolean;
	label?: string;
};

export default RoutesField;
