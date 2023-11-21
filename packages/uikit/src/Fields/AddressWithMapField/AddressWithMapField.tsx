import React, {useState, useRef} from 'react';
import {TextFieldProps, Grid, Typography} from '@mui/material';
import {Map} from '@pbe/react-yandex-maps';

import TextField from '@infomat/uikit/src/Fields/TextField/TextField';
import Button from '@infomat/uikit/src/Button/Button';

import style from './AddressWithMapField.module.scss';

const AddressWithMapField = ({label, hasError, ...restProps}: TAddressWithMapFieldProps) => {
	const [isShowSearch, setIsShowSearch] = useState(false);
	const ymaps = useRef<any>(null);
	const placemarkRef = useRef<any>(null);
	const mapRef = useRef<ymaps.Map | undefined>(undefined);
	const [address, setAddress] = useState('');

	const createPlacemark = (coords: string[]) => {
		return new ymaps.current.Placemark(
			coords,
			{
				iconCaption: 'loading..',
			},
			{
				preset: 'islands#violetDotIconWithCaption',
				draggable: true,
			},
		);
	};

	// useEffect на координаты, при получении обновляем

	const getAddress = (coords: string[]) => {
		placemarkRef.current?.properties.set('iconCaption', 'loading..');
		// Экшен на получения адресов

		// ymaps.current
		// 	.geocode(coords)
		// 	.then((res: any) => {
		// 		const firstGeoObject = res.geoObjects.get(0);
		// 		const newAddress = firstGeoObject.getAddressLine();

		// 		setAddress(newAddress);

		// 		placemarkRef.current?.properties.set({
		// 			iconCaption: newAddress,
		// 			balloonContent: newAddress,
		// 		});
		// 	})
		// 	.catch((e: any) => {
		// 		placemarkRef.current?.properties.set('iconCaption', 'Error');
		// 	});
	};

	const onMapClick = (e: any) => {
		const coords = e.get('coords');
		setIsShowSearch(false);

		if (placemarkRef.current) {
			placemarkRef.current.geometry.setCoordinates(coords);
		} else {
			placemarkRef.current = createPlacemark(coords);
			mapRef.current?.geoObjects.add(placemarkRef.current);
			placemarkRef.current?.events.add('dragend', function () {
				getAddress(placemarkRef.current?.geometry.getCoordinates());
			});
		}
		getAddress(coords);
	};

	const onSearch = () => {
		// Экшен на получения
		// ymaps.current
		// 	.geocode(address)
		// 	.then((result: any) => {
		// 		const coordinates = result.geoObjects.get(0).geometry.getCoordinates();
		// 		mapRef.current?.geoObjects.removeAll();
		// 		setIsShowSearch(false);
		// 		placemarkRef.current = createPlacemark(coordinates);
		// 		placemarkRef.current?.properties.set({
		// 			iconCaption: address,
		// 			balloonContent: address,
		// 		});
		// 		mapRef.current?.geoObjects.add(placemarkRef.current);
		// 		mapRef.current?.setCenter(coordinates, 14);
		// 	})
		// 	.catch(console.log);
	};

	const serachChange = (value: string) => {
		setAddress(value);
		setIsShowSearch(true);
		mapRef.current?.geoObjects.removeAll();
	};

	return (
		<Grid container direction="column">
			{label && <Typography className={style.label}>{label}</Typography>}
			<Grid container spacing={3}>
				<Grid item xs={12} md={6}>
					<TextField onChange={(e) => serachChange(e.target.value)} value={address} {...restProps} error={hasError} />
					{isShowSearch && (
						<Button variant="outlined" className={style.search} onClick={onSearch}>
							Найти
						</Button>
					)}
				</Grid>
				<Grid item xs={12} md={6}>
					<div className={style.container}>
						<Map
							modules={['Placemark', 'geoObject.addon.balloon']}
							onLoad={(ympasInstance) => {
								ymaps.current = ympasInstance;
							}}
							instanceRef={mapRef}
							onClick={onMapClick}
							className={style.map}
							defaultState={{center: [56.03, 92.9], zoom: 14}}
						>
							{/* {placemark} */}
						</Map>
					</div>
				</Grid>
			</Grid>
		</Grid>
	);
};

type TAddressWithMapFieldProps = TextFieldProps & {
	hasError?: boolean;
	label?: string;
};

export default AddressWithMapField;
