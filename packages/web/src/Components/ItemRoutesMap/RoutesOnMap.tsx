import React, {useState, useRef, useEffect} from 'react';
import {Typography, Grid} from '@mui/material';
import {Map} from '@pbe/react-yandex-maps';
import classNames from 'classnames';
import {Reorder} from 'framer-motion';
import _ from 'lodash';

import ItemRout from './ItemRout';
import style from './RoutesOnMap.module.scss';
import PropertyHandler from '@infomat/core/src/Types/PropertyHandler';
import {TPlacesVM} from '@infomat/core/src/Redux/Places/entityAdapter';
import {TStop} from '@infomat/core/src/Redux/Routes/entityAdapter';
import cuid from 'cuid';
import {useDebounced} from '@infomat/core/src/Hooks/useDebounced';

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
	const [items, setItems] = useState<(TStop & {key: string})[]>(
		value && value.length
			? _.map(
					// value,
					_.filter(value, (item) => !!(item.place && !_.isUndefined(item.place.id))),
					(item) => ({...item, key: cuid()}),
			  )
			: [{key: '0'}, {key: '1'}],
	);

	const allsteps = useRef(value);

	const checkMenu = (index: number) => {
		if (!allsteps.current) {
			return false;
		}
		const element = allsteps.current[index];
		return element.place && !_.isUndefined(element.place.id);
	};

	const checkRemove = (index: number) => {
		let newItems = [...(allsteps.current ? allsteps.current : [])];
		newItems.splice(index, 1);
		setValue(newItems);
		allsteps.current = newItems;
	};

	const createPolyline = (coordsObjects: (number | undefined)[][]) => {
		return new ymaps.current.Polyline(
			coordsObjects,
			{},
			{
				strokeColor:
					!_.isUndefined(routeColor) && routeColor !== null && routeColor.length > 3 ? routeColor : '#00000088',
				strokeWidth: 4,
				editorMaxPoints: 10000,
				editorMenuManager: (data: any, t: any) => {
					if (data.length > 1) {
						if (checkMenu(t._index)) {
							return [_.find(data, (item) => item.id === 'startDrawing'), {}];
						}
						const indexFind = _.findIndex(data, (item: any) => item.id === 'removeVertex');
						const newEl = {
							...data[indexFind],
							onClick: (...event: any) => {
								data[indexFind].onClick(...event);
								checkRemove(t._index);
							},
						};
						return [newEl, _.find(data, (item) => item.id === 'startDrawing')];
					}

					return checkMenu(t._index)
						? []
						: [
								{
									...data[0],
									onClick: (...event: any) => {
										data[0].onClick(...event);
										checkRemove(t._index);
									},
								},
						  ];
				},
			},
		);
	};
	// return new ymaps.current.multiRouter.MultiRoute(
	// 	{
	// 		// Точки маршрута. Точки могут быть заданы как координатами, так и адресом.
	// 		referencePoints: coordsObjects,
	// 		params: {
	// 			// Тип маршрута: на общественном транспорте.
	// 			routingMode: typeRout,
	// 		},
	// 	},
	// 	{
	// 		// Автоматически устанавливать границы карты так,
	// 		// чтобы маршрут был виден целиком.
	// 		boundsAutoApply: true,
	// 		routeActiveStrokeColor: routeColor,
	// 	},
	// );
	// };

	const onReMap = useDebounced(
		(
			items: (TStop & {
				key: string;
			})[],
		) => {
			mapRef.current?.geoObjects.removeAll();
			const filtersItems = _.chain(allsteps.current)
				.filter((item) => !_.isUndefined(item.place) || !_.isUndefined(item.address))
				.map((item) =>
					!_.isUndefined(item.place) && item.place !== null
						? [item.place?.address?.latitude, item.place?.address?.longitude]
						: [item.address?.latitude, item.address?.longitude],
				)
				.value();
			placemarkRef.current = createPolyline(filtersItems);

			items.forEach((route, index) => {
				mapRef.current?.geoObjects.add(
					new ymaps.current.Placemark(
						[route.place?.address?.latitude, route.place?.address?.longitude],
						{},
						{
							preset: 'islands#violetDotIconWithCaption',
							draggable: false,
							pane: 'overlaps',
							iconLayout: ymaps.current?.templateLayoutFactory?.createClass(routeContent(index + 1, '#222')),
						},
					),
				);
			});

			const le = _.find(items, (item) => !!item.place);
			if (le && le.place?.address?.latitude && le.place?.address?.longitude) {
				mapRef.current?.setCenter([le.place?.address?.latitude, le.place?.address?.longitude], 13);
			}

			mapRef.current?.geoObjects.add(placemarkRef.current);

			placemarkRef.current?.editor.startEditing();

			placemarkRef.current?.editor.events.add(['beforevertexdrag'], (event: any) => {
				if (allsteps.current) {
					const element = allsteps.current[event.originalEvent.vertexModel._index];
					if (element.place && !_.isUndefined(element.place.id)) {
						event.preventDefault();
					}
				}
			});

			placemarkRef.current?.editor.events.add(['vertexadd'], (event: any) => {
				const coords = event.originalEvent.target.geometry.getCoordinates();
				let newItemsI = [...(allsteps.current ? allsteps.current : [])];
				const index = event.originalEvent.vertexIndex;
				const cord = coords[index];
				newItemsI.splice(index, 0, {
					address: {
						address: 'address',
						latitude: cord[0],
						longitude: cord[1],
					},
				});
				setValue(newItemsI);
				allsteps.current = newItemsI;
			});

			placemarkRef.current?.editor.events.add(['vertexdragend'], (event: any) => {
				const cord = event.originalEvent.vertexModel.geometry._coordinates;
				let newItemsI = [...(allsteps.current ? allsteps.current : [])];
				const index = event.originalEvent.vertexModel._index;
				newItemsI[index] = {
					address: {
						address: 'address',
						latitude: cord[0],
						longitude: cord[1],
					},
				};
				setValue(newItemsI);
				allsteps.current = newItemsI;
			});
		},
		800,
	);

	useEffect(() => {
		// const items = _.filter(value, (item) => !!(item.place && !_.isUndefined(item.place.id)));
		if (isReadyYmaps && items && items.length) {
			onReMap(items);
		}
	}, [items, isReadyYmaps]);

	const onAdd = () => {
		setItems([...items, {key: cuid()}]);
	};

	const onClear = () => {
		setItems([{key: '0'}, {key: '1'}]);
		allsteps.current = [{}, {}];
		setValue([{}, {}]);
	};

	const removeToIndex = (index: number) => {
		const newItems = [...items];
		if (items.length <= 2) {
			newItems[index].place = undefined;
		} else {
			newItems.splice(index, 1);
		}
		// setItems(newItems);
		allsteps.current = newItems;
		setValue(newItems);
		setItems(newItems);
	};

	const selectChange = (value: TPlacesVM, index: number) => {
		// Тут мы получаем новю точку и создаем ее на карте
		const newItems = [...items];
		newItems[index].place = value;
		allsteps.current = newItems;
		setValue(newItems);
		setItems(newItems);
		onReset();
	};

	const onReValues = useDebounced((values: any[]) => {
		allsteps.current = values;
		setValue(values);
	}, 400);

	const onReorder = (values: any[]) => {
		setItems(values);
		onReValues(values);
	};

	const routeContent = (number: number, color: string, bg?: string) => {
		return `
			<p style="color: ${color}; background-color: ${bg}" class="route-content-react-smolensk">
				${number}
			</p>
		  `;
	};

	console.log('items-', items);

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
						modules={[
							'geoObject.addon.editor',
							'Polyline',
							'geoObject.addon.balloon',
							// 'multiRouter.MultiRoute',
							'templateLayoutFactory',
							'Placemark',
						]}
						onLoad={(ympasInstance) => {
							ymaps.current = ympasInstance;
							setIsReadyYmaps(true);
						}}
						instanceRef={mapRef}
						className={style.map}
						defaultState={{center: [54.47, 32.04], zoom: 10}}
					>
						{/* <>
							{items.map((route, index) => (
								<Placemark
									key={index}
									geometry={[route.place?.address?.latitude, route.place?.address?.longitude]}
									options={{
										pane: 'overlaps',
										iconLayout: ymaps.current?.templateLayoutFactory?.createClass(routeContent(index + 1, '#222')),
									}}
								/>
							))}
						</> */}
					</Map>
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
