import React, {useState, useRef, useEffect} from 'react';
import {Typography, Grid} from '@mui/material';
import {Map} from '@pbe/react-yandex-maps';
import classNames from 'classnames';
import {Reorder} from 'framer-motion';

import {useDebounced} from '@infomat/core/src/Hooks/useDebounced';

import ItemRout from './ItemRout';
import style from './RoutesOnMap.module.scss';
import PropertyHandler from '@infomat/core/src/Types/PropertyHandler';

const constcoordinatesObjects = [
	[55.8, 37.5],
	[55.8, 37.4],
	[55.7, 37.5],
	[55.7, 37.4],
];

const initItems = [
	{key: '0', label: ''},
	{key: '1', label: ''},
];

export type TItems = {
	key: string;
	label: string;
	coordinates?: number[];
}[];

const serchItems = [
	'sadfdsafdsafdasfadsfdsafsadfdsafdsafdasfadsfdsaf',
	'sadfdsafdsafda sfadsfdsafsadfds afdsafdasfadsfdsaf',
	'sadfdsafdsaf',
	'sadfdsafdsafdasfadsfdsaf',
	'dsgadgfsdfgfgsdgsdfgfdsgsdfg',
];

const RoutesOnMap = ({hasError, label, labelMap, coordinatesObjects = constcoordinatesObjects}: TRoutesOnMapProps) => {
	const [polyline, setPolyline] = useState<[number, number][]>([]);
	const ymaps = useRef<any>(null);
	const placemarkRef = useRef<any>(null);
	const mapRef = useRef<ymaps.Map | undefined>(undefined);
	const [isReadyYmaps, setIsReadyYmaps] = useState(false);
	const [items, setItems] = useState<TItems>(initItems);

	const createPolyline = (coordsObjects: number[][]) => {
		return new ymaps.current.Polyline(
			// Указываем координаты вершин.
			coordsObjects,
			{},
			// Задаем опции геообъекта.
			{
				// Цвет с прозрачностью.
				strokeColor: '#00000088',
				// Ширину линии.
				strokeWidth: 4,
				// Максимально допустимое количество вершин в ломаной.
				editorMaxPoints: 60,
			},
		);
	};

	const chengeCoordinates = useDebounced(() => {
		// console('placemarkRef.current-', placemarkRef.current?.geometry.getCoordinates());
		// placemarkRef.current?.geometry.getCoordinates()
		setPolyline(placemarkRef.current?.geometry.getCoordinates());
	}, 400);

	// Нужно будет сюда перенести поле RoutesField.tsx
	// и при вызове эккшенов очистки всех точек, удаления точки, выбор места из выпадающего списка, и выбор места у новой точки (создание точки)
	// обрабатыввать правильно на карте

	useEffect(() => {
		if (isReadyYmaps) {
			if (placemarkRef.current) {
				// Получать все даные о текущем Polyline
				// И создовать новый Polyline на основе предыдущего + новая точка
				// placemarkRef.current?.geometry.insert()
				// insert(index: number, coordinates: number[][]): ILineStringGeometryAccess;
				//  remove(index: number): number[];
				// set(index: number, coordinates: number[]): ILineStringGeometryAccess;
			} else {
				// Тут передаем точки всего маршрута
				placemarkRef.current = createPolyline(coordinatesObjects);
				mapRef.current?.geoObjects.add(placemarkRef.current);
				mapRef.current?.setCenter(coordinatesObjects[0], 14);
			}
			placemarkRef.current?.editor.startEditing();
			placemarkRef.current?.editor.events.add(
				['beforeedgedrag', 'beforevertexdrag', 'vertexaddvertexadd'],
				chengeCoordinates,
			);
		}
	}, [coordinatesObjects, isReadyYmaps]);

	const onAdd = () => {
		setItems([...items, {key: items[items.length - 1].key + 1, label: ''}]);
	};

	const onClear = () => {
		setItems([
			{key: '0', label: ''},
			{key: '1', label: ''},
		]);
		// Тут мы удаляем все точки с карты
	};

	const removeToIndex = (index: number) => {
		const newItems = [...items];
		if (items.length <= 2) {
			newItems[index].label = '';
		} else {
			newItems.splice(index, 1);
		}
		setItems(newItems);
		// Тут мы удаляем точку с карты
	};

	const inputChange = (value: string, index: number) => {
		const newItems = [...items];
		newItems[index].label = value;
		setItems(newItems);
		// Тут мы удаляем точку с карты
	};

	const selectChange = (value: string, index: number) => {
		// Тут мы получаем новю точку и создаем ее на карте
	};

	return (
		<Grid container gap={3}>
			<Grid item container xs={12} md={6} direction="column">
				{label && <Typography className={style.label}>{label}</Typography>}
				<div className={style.container}>
					<Reorder.Group axis="y" values={items} onReorder={setItems}>
						{items.map((item, index) => (
							<ItemRout
								inputValue={item.label}
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
					{items.length > 2 || items[0].label.length || items[1].label.length ? (
						<div className={style.button} onClick={onClear}>
							Сбросить
						</div>
					) : null}
				</div>
			</Grid>
			<Grid container item direction="column" xs={12} md={12}>
				{labelMap && <Typography className={style.label}>{labelMap}</Typography>}
				<div className={style.containerMap}>
					<Map
						modules={['geoObject.addon.editor', 'Polyline', 'geoObject.addon.balloon', 'MultiRoute']}
						onLoad={(ympasInstance) => {
							ymaps.current = ympasInstance;
							setIsReadyYmaps(true);
						}}
						instanceRef={mapRef}
						className={style.map}
						defaultState={{center: [56.03, 92.9], zoom: 14}}
					/>
				</div>
			</Grid>
		</Grid>
	);
};

type TRoutesOnMapProps = {
	hasError?: boolean;
	label?: string;
	labelMap?: string;
	coordinatesObjects?: number[][];
	setValue: PropertyHandler<{placeId?: number; sequenceNumber?: number}[]>;
	value?: {placeId?: number; sequenceNumber?: number};
};

export default RoutesOnMap;
