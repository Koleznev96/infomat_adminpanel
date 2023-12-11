import React, {useRef, useState} from 'react';
import {Typography, Paper, ClickAwayListener, Popper, CircularProgress, MenuItem} from '@mui/material';
import {Reorder, useMotionValue} from 'framer-motion';

import {IconType, IconSize, Icon} from '@infomat/uikit/src/Icon';
import TextField from '@infomat/uikit/src/Fields/TextField/TextField';
import PropertyHandler from '@infomat/core/src/Types/PropertyHandler';
import {useBooleanState} from '@infomat/core/src/Hooks/useBooleanState';
import {useDebounced} from '@infomat/core/src/Hooks/useDebounced';
import {TPlacesVM} from '@infomat/core/src/Redux/Places/entityAdapter';
import {TStop} from '@infomat/core/src/Redux/Routes/entityAdapter';
import {useRaisedShadow} from '@infomat/uikit/src/Hooks/useRaisedShadow';

import style from './RoutesOnMap.module.scss';

const RoutesField = ({
	item,
	index,
	removeToIndex,
	searchItems,
	isLoading,
	onItem,
	getSearch,
	onReset,
	onEnd,
}: TRoutesFieldProps) => {
	const y = useMotionValue(0);
	const boxShadow = useRaisedShadow(y);
	const anchorEl = useRef<HTMLDivElement>(null);
	const [isShow, open, close] = useBooleanState(false);
	const [popperWidth, setPopperWidth] = useState(0);
	const [value, setValue] = useState(item?.place?.title || '');

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

	const onSelect = (value: TPlacesVM) => {
		onItem(value, index);
		setValue(value.title);
		close();
	};

	const openMenu = () => {
		if (anchorEl.current) {
			const width = anchorEl.current.offsetWidth;
			setPopperWidth(width);
		}
		open();
	};

	const debSearch = useDebounced((value: string) => {
		getSearch(value);
	}, 500);

	const changeV = (value: string) => {
		setValue(value);
		debSearch(value);
	};

	const onBlur = useDebounced(() => {
		onReset();
		close();
	}, 500);

	return (
		<Reorder.Item value={item} style={{boxShadow, y, borderRadius: 6, opacity: 1}} onDragEnd={(e, d) => onEnd({e, d})}>
			<div className={style.item}>
				<div className={style.boxIndex}>
					<Typography className={style.index}>{index + 1}</Typography>
				</div>
				<div className={style.boxInput} ref={anchorEl}>
					<TextField
						autoComplete="off"
						onFocus={openMenu}
						onBlur={onBlur}
						value={value}
						onChange={(e) => changeV(e.target.value)}
						classes={{root: style.input}}
					/>
					<div className={style.close} onClick={() => removeToIndex(index)}>
						<Icon type={IconType.close} size={IconSize.small} />
					</div>
				</div>
				<div className={style.boxIcon}>
					<Icon className={style.icon} type={IconType.paragraph} />
				</div>
				<Popper
					popperOptions={popperOptions}
					placement={'bottom-end'}
					anchorEl={anchorEl.current}
					open={!!(isShow && (searchItems?.length || isLoading))}
				>
					<ClickAwayListener onClickAway={close} mouseEvent="onPointerDown" disableReactTree touchEvent={false}>
						<Paper
							sx={{
								boxShadow: 8,
								maxHeight: 100,
								overflowY: !isLoading ? 'auto' : 'hidden',
								overflowX: 'hidden',
								width: popperWidth,
								wordWrap: 'break-word',
							}}
						>
							{isLoading ? (
								<div className={style.load}>
									<CircularProgress size={28} />
								</div>
							) : (
								searchItems?.map((item, index) => (
									<MenuItem onClick={() => onSelect(item)} key={index}>
										<Typography
											variant="body1"
											className={style.meuItem}
											style={{wordWrap: 'break-word', whiteSpace: 'normal'}}
										>
											{item.title}
										</Typography>
									</MenuItem>
								))
							)}
						</Paper>
					</ClickAwayListener>
				</Popper>
			</div>
		</Reorder.Item>
	);
};

type TRoutesFieldProps = {
	item?: TStop & {
		key: string;
	};
	index: number;
	removeToIndex: PropertyHandler<number>;
	searchItems?: TPlacesVM[];
	isLoading?: boolean;
	onItem: PropertyHandler<TPlacesVM, number>;
	getSearch: PropertyHandler<string>;
	onReset: PropertyHandler;
	onEnd: PropertyHandler<{e: any; d: any}>;
};

export default RoutesField;
