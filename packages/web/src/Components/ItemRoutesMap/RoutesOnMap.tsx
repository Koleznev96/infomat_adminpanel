import React, {useState, useRef, useEffect} from 'react';
import {Typography, Grid} from '@mui/material';
import {Map} from '@pbe/react-yandex-maps';
import classNames from 'classnames';
import {Reorder} from 'framer-motion';
import _ from 'lodash';

import {useDebounced} from '@infomat/core/src/Hooks/useDebounced';

import ItemRout from './ItemRout';
import style from './RoutesOnMap.module.scss';
import PropertyHandler from '@infomat/core/src/Types/PropertyHandler';
import {TPlacesVM} from '@infomat/core/src/Redux/Places/entityAdapter';
import {TStop} from '@infomat/core/src/Redux/Routes/entityAdapter';
import cuid from 'cuid';

const serchItems = [
	{id: 'auto', titile: 'на автомобиле'},
	{id: 'masstransit', titile: 'на общественном транспорте'},
	{id: 'pedestrian', titile: 'пешеходный маршрут'},
	{id: 'bicycle', titile: 'на велосипеде'},
];

const RoutesOnMap = ({
	placesIds,
	isLoading,
	getSearch,
	label,
	labelMap,
	value,
	setValue,
	routeColor,
	onReset,
}: TRoutesOnMapProps) => {
	const ymaps = useRef<any>(null);
	const placemarkRef = useRef<any>(null);
	const mapRef = useRef<ymaps.Map | undefined>(undefined);
	const [isReadyYmaps, setIsReadyYmaps] = useState(false);
	const [typeRout, setTypeRout] = useState(serchItems[0].id);
	const [items, setItems] = useState<(TStop & {key: string})[]>(
		value && value.length ? _.map(value, (item) => ({...item, key: cuid()})) : [{key: '0'}, {key: '1'}],
	);

	const createPolyline = (coordsObjects: (number | undefined)[][]) => {
		return new ymaps.current.multiRouter.MultiRoute(
			{
				// Точки маршрута. Точки могут быть заданы как координатами, так и адресом.
				referencePoints: coordsObjects,
				params: {
					// Тип маршрута: на общественном транспорте.
					routingMode: typeRout,
				},
			},
			{
				// Автоматически устанавливать границы карты так,
				// чтобы маршрут был виден целиком.
				boundsAutoApply: true,
				routeActiveStrokeColor: routeColor,
			},
		);
	};

	useEffect(() => {
		if (isReadyYmaps && items && items.length) {
			mapRef.current?.geoObjects.removeAll();
			const filtersItems = _.chain(items)
				.filter((item) => !_.isUndefined(item.place))
				.map((item) => [item.place?.address?.latitude, item.place?.address?.longitude])
				.value();
			placemarkRef.current = createPolyline(filtersItems);
			mapRef.current?.geoObjects.add(placemarkRef.current);
		}
	}, [items, isReadyYmaps]);

	const onAdd = () => {
		setItems([...items, {key: cuid()}]);
	};

	const onClear = () => {
		setItems([{key: '0'}, {key: '1'}]);
		// Тут мы удаляем все точки с карты
	};

	const removeToIndex = (index: number) => {
		const newItems = [...items];
		if (items.length <= 2) {
			newItems[index].place = undefined;
		} else {
			newItems.splice(index, 1);
		}
		setItems(newItems);
		// Тут мы удаляем точку с карты
	};

	// const inputChange = (value: string, index: number) => {
	// 	const newItems = [...items];
	// 	newItems[index].label = value;
	// 	setItems(newItems);
	// 	// Тут мы удаляем точку с карты
	// };

	const selectChange = (value: TPlacesVM, index: number) => {
		// Тут мы получаем новю точку и создаем ее на карте
		const newItems = [...items];
		newItems[index].place = value;
		setValue(newItems);
		setItems(newItems);
		onReset();
	};

	const onReorder = (values: any[]) => {
		setValue(values);
		setItems(values);
	};

	return (
		<Grid container gap={3}>
			<Grid item container xs={12} md={6} direction="column">
				{label && <Typography className={style.label}>{label}</Typography>}
				<div className={style.container}>
					<Reorder.Group axis="y" values={items} onReorder={onReorder}>
						{items.map((item, index) => (
							<ItemRout
								onReset={onReset}
								item={item}
								onItem={selectChange}
								index={index}
								key={item.key}
								removeToIndex={removeToIndex}
								isLoading={isLoading}
								searchItems={placesIds}
								getSearch={getSearch}
							/>
						))}
					</Reorder.Group>
				</div>
				<div className={style.wrapper}>
					<div
						className={classNames(style.button, {[style.isDisabled]: items.length > 80})}
						onClick={() => items.length <= 80 && onAdd()}
					>
						Добавить точку
					</div>
					{items.length > 2 || items[0].place || items[1].place ? (
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
						modules={['geoObject.addon.editor', 'Polyline', 'geoObject.addon.balloon', 'multiRouter.MultiRoute']}
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
	setValue: PropertyHandler<TStop[]>;
	value?: TStop[];
	placesIds?: TPlacesVM[];
	isLoading?: boolean;
	getSearch: PropertyHandler<string>;
	routeColor?: string;
	onReset: PropertyHandler;
};

export default RoutesOnMap;
