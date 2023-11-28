import React, {useState, useRef, useEffect} from 'react';
import {
	Typography,
	Paper,
	ClickAwayListener,
	Popper,
	CircularProgress,
	MenuItem,
	TextFieldProps,
	Grid,
} from '@mui/material';
import {Map} from '@pbe/react-yandex-maps';
import _ from 'lodash';

import TextField from '@infomat/uikit/src/Fields/TextField/TextField';
import Button from '@infomat/uikit/src/Button/Button';
import {TAddress} from '@infomat/core/src/Redux/Geocoding/entityAdapter';
import PropertyHandler from '@infomat/core/src/Types/PropertyHandler';

import style from './AddressWithMapField.module.scss';
import {useDebounced} from '@infomat/core/src/Hooks/useDebounced';
import {useBooleanState} from '@infomat/core/src/Hooks/useBooleanState';

const AddressWithMapField = ({
	label,
	hasError,
	placeholder,
	value,
	setValue,
	addressForSearch,
	addressForPoint,
	isLoadingAddress,
	isLoadingCoordinates,
	onSearchByAddress,
	onSearchByGeocoding,
	onReset,
}: TAddressWithMapFieldProps) => {
	const ymaps = useRef<any>(null);
	const placemarkRef = useRef<any>(null);
	const mapRef = useRef<ymaps.Map | undefined>(undefined);
	const [address, setAddress] = useState(value?.address || '');
	const [addressEn, setAddressEn] = useState(value?.addressEn || '');
	const anchorEl = useRef<HTMLDivElement>(null);
	const [isShow, open, close] = useBooleanState(false);
	const [popperWidth, setPopperWidth] = useState(0);
	const [isReadyYmaps, setIsReadyYmaps] = useState(false);

	const onSelect = (value: TAddress) => {
		if (value.address && !_.isUndefined(value.latitude) && !_.isUndefined(value.longitude)) {
			setAddress(value.address);
			setAddressEn(value.addressEn || '');
			close();
			placemarkRef.current = createPlacemark([value.latitude, value.longitude], value.address);
			mapRef.current?.geoObjects.add(placemarkRef.current);
			mapRef.current?.setCenter([value.latitude, value.longitude], 14);
			setValue(value);
			onReset();
		}
	};

	useEffect(() => {
		if (value && value.address?.length && isReadyYmaps) {
			mapRef.current?.geoObjects.removeAll();
			onSelect(value);
		}
	}, [value, isReadyYmaps]);

	const createPlacemark = (coords: number[], iconCaption?: string) => {
		return new ymaps.current.Placemark(
			coords,
			{
				iconCaption: iconCaption || 'loading..',
			},
			{
				preset: 'islands#violetDotIconWithCaption',
				draggable: true,
			},
		);
	};

	useEffect(() => {
		if (
			addressForPoint &&
			!_.isUndefined(addressForPoint.address) &&
			!_.isUndefined(addressForPoint.latitude) &&
			!_.isUndefined(addressForPoint.longitude)
		) {
			setAddress(addressForPoint.address);
			setAddressEn(addressForPoint.addressEn || '');

			placemarkRef.current?.properties.set({
				iconCaption: addressForPoint.address,
				balloonContent: addressForPoint.address,
			});

			setValue(addressForPoint);
		}
		if (addressForPoint === null && placemarkRef.current) {
			placemarkRef.current?.properties.set({
				iconCaption: 'Server error',
				balloonContent: 'Server error',
			});
			setValue({});
		}
		onReset();
	}, [addressForPoint]);

	// useEffect на координаты, при получении обновляем

	const getAddress = (coords: number[]) => {
		placemarkRef.current?.properties.set('iconCaption', 'loading..');
		onSearchByGeocoding({latitude: coords[0], longitude: coords[1]});
	};

	const onMapClick = (e: any) => {
		const coords = e.get('coords');

		mapRef.current?.geoObjects.removeAll();
		placemarkRef.current = createPlacemark(coords);
		mapRef.current?.geoObjects.add(placemarkRef.current);
		placemarkRef.current?.events.add('dragend', function () {
			getAddress(placemarkRef.current?.geometry.getCoordinates());
		});
		setAddress('');
		getAddress(coords);
	};

	const onSearch = useDebounced((value: string) => {
		if (value.length) onSearchByAddress(value);
	}, 500);

	const serachChange = (value: string) => {
		setAddress(value);
		onSearch(value);
		mapRef.current?.geoObjects.removeAll();
	};

	const popperOptions = {
		modifiers: [
			{
				name: 'offset',
				options: {
					offset: [0, 16],
				},
			},
		],
	};

	const openMenu = () => {
		if (anchorEl.current) {
			const width = anchorEl.current.offsetWidth;
			setPopperWidth(width);
		}
		open();
	};

	return (
		<Grid container direction="column">
			{/* {label && <Typography className={style.label}>{label}</Typography>} */}
			<Grid container spacing={3}>
				<Grid item container xs={12} md={12} spacing={3}>
					<Grid item xs={12} md={6}>
						<div ref={anchorEl}>
							<TextField
								label={label}
								onChange={(e) => serachChange(e.target.value)}
								value={address}
								onFocus={openMenu}
								placeholder={placeholder}
								error={hasError}
							/>
						</div>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField label={'Адрес на английском языке'} disabled value={addressEn} placeholder={placeholder} />
					</Grid>
					<Popper
						popperOptions={popperOptions}
						placement={'bottom-start'}
						anchorEl={anchorEl.current}
						open={!!(isShow && (addressForSearch?.length || isLoadingAddress) && address.length)}
					>
						<ClickAwayListener onClickAway={close} mouseEvent="onPointerDown" disableReactTree touchEvent={false}>
							<Paper
								sx={{
									boxShadow: 8,
									maxHeight: 100,
									overflowY: !isLoadingAddress ? 'auto' : 'hidden',
									overflowX: 'hidden',
									width: popperWidth,
									wordWrap: 'break-word',
								}}
							>
								{isLoadingAddress ? (
									<div className={style.load}>
										<CircularProgress size={28} />
									</div>
								) : (
									addressForSearch?.map((item, index) => (
										<MenuItem onClick={() => onSelect(item)} key={index}>
											<Typography
												variant="body1"
												className={style.meuItem}
												style={{wordWrap: 'break-word', whiteSpace: 'normal'}}
											>
												{item.address}
											</Typography>
										</MenuItem>
									))
								)}
							</Paper>
						</ClickAwayListener>
					</Popper>
					{/* {isShowSearch && (
						<Button variant="outlined" className={style.search} onClick={onSearch}>
							Найти
						</Button>
					)} */}
				</Grid>
				<Grid item xs={12} md={12}>
					<div className={style.container}>
						<Map
							modules={['Placemark', 'geoObject.addon.balloon']}
							onLoad={(ympasInstance) => {
								ymaps.current = ympasInstance;
								setIsReadyYmaps(true);
							}}
							instanceRef={mapRef}
							onClick={onMapClick}
							className={style.map}
							defaultState={{center: [55.7522, 37.6156], zoom: 10}}
						></Map>
					</div>
				</Grid>
			</Grid>
		</Grid>
	);
};

type TAddressWithMapFieldProps = TextFieldProps & {
	hasError?: boolean;
	label?: string;
	placeholder?: string;
	value?: TAddress;
	setValue: PropertyHandler<TAddress>;
	addressForSearch: TAddress[];
	addressForPoint?: TAddress;
	isLoadingAddress?: boolean;
	isLoadingCoordinates?: boolean;
	onSearchByAddress: PropertyHandler<string>;
	onSearchByGeocoding: PropertyHandler<{latitude?: number; longitude?: number}>;
	onReset: PropertyHandler;
};

export default AddressWithMapField;
