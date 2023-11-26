import React, {useRef, useState} from 'react';
import {Typography, Paper, ClickAwayListener, Popper, CircularProgress, MenuItem} from '@mui/material';
import {Reorder, useMotionValue} from 'framer-motion';

import {IconType, IconSize, Icon} from '@infomat/uikit/src/Icon';
import TextField from '@infomat/uikit/src/Fields/TextField/TextField';

import {useRaisedShadow} from '../../Hooks/useRaisedShadow';

import style from './RoutesField.module.scss';
import PropertyHandler from '@infomat/core/src/Types/PropertyHandler';
import {useBooleanState} from '@infomat/core/src/Hooks/useBooleanState';

const RoutesField = ({
	item,
	index,
	removeToIndex,
	searchItems,
	isLoading,
	inputChange,
	inputValue,
	onItem,
}: TRoutesFieldProps) => {
	const y = useMotionValue(0);
	const boxShadow = useRaisedShadow(y);
	const anchorEl = useRef<HTMLDivElement>(null);
	const [isShow, open, close] = useBooleanState(false);
	const [popperWidth, setPopperWidth] = useState(0);

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

	const onSelect = (value: string) => {
		inputChange(value, index);
		close();
		onItem(value, index);
	};

	const openMenu = () => {
		if (anchorEl.current) {
			const width = anchorEl.current.offsetWidth;
			setPopperWidth(width);
		}
		open();
	};

	return (
		<Reorder.Item value={item} style={{boxShadow, y, borderRadius: 6, opacity: 1}}>
			<div className={style.item}>
				<div className={style.boxIndex}>
					<Typography className={style.index}>{index + 1}</Typography>
				</div>
				<div className={style.boxInput} ref={anchorEl}>
					<TextField
						autoComplete="off"
						onFocus={openMenu}
						value={inputValue}
						onChange={(e) => inputChange(e.target.value, index)}
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
					placement={'bottom-start'}
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
											{item}
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
	item?: any;
	index: number;
	removeToIndex: PropertyHandler<number>;
	searchItems?: any[];
	isLoading?: boolean;
	onItem: PropertyHandler<string, number>;
	inputValue?: string;
	inputChange: PropertyHandler<string, number>;
};

export default RoutesField;
