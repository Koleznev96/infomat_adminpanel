import React, {useCallback, useRef, ReactNode} from 'react';
import {Typography, Paper, ClickAwayListener, Popper, MenuItem, Modal, Box, Grid} from '@mui/material';

import {Icon, IconColor, IconSize, IconType} from '@infomat/uikit/src/Icon';
import PropertyHandler from '@infomat/core/src/Types/PropertyHandler';
import {useBooleanState} from '@infomat/core/src/Hooks/useBooleanState';
import {useDebounced} from '@infomat/core/src/Hooks/useDebounced';

import style from './FilterMenuItem.module.scss';
import Button from '../../Button/Button';

const FilterMenuItem = ({onDec, onAsc, title, isReset, onReset}: TFilterMenuItemProps) => {
	const anchorEl = useRef<HTMLDivElement>(null);
	const [isShow, open, close] = useBooleanState(false);

	const popperOptions = {
		modifiers: [
			{
				name: 'offset',
				options: {
					offset: [0, 6],
				},
			},
		],
	};

	const onOpen = () => {
		if (!isShow) open();
	};

	const onclose = useDebounced(() => {
		close();
	}, 100);

	return (
		<>
			<div onClick={onOpen} ref={anchorEl} className={style.filter}>
				<Typography className={style.title}>{title}</Typography>
				<Icon type={IconType.chevronsDownUp} color={IconColor.white} />
			</div>
			<Popper
				onClick={onclose}
				popperOptions={popperOptions}
				placement={'bottom-end'}
				anchorEl={anchorEl.current}
				open={isShow}
			>
				<ClickAwayListener onClickAway={onclose} mouseEvent="onPointerDown" disableReactTree touchEvent={false}>
					<Paper
						sx={{
							boxShadow: 8,
							width: 90,
							paddingBottom: 0.2,
						}}
					>
						<Button startIconType={IconType.keyboardArrowUpOut} onClick={onAsc} className={style.edit}>
							Asc
						</Button>
						<Button startIconType={IconType.keyboardArrowDown} onClick={onDec} className={style.edit}>
							Dec
						</Button>
						{isReset && (
							<Button iconSize={IconSize.tiny} startIconType={IconType.close} onClick={onReset} className={style.edit}>
								Reset
							</Button>
						)}
					</Paper>
				</ClickAwayListener>
			</Popper>
		</>
	);
};

type TFilterMenuItemProps = {
	onDec?: PropertyHandler;
	title?: ReactNode;
	onAsc: PropertyHandler;
	onReset: PropertyHandler;
	isReset?: boolean;
};

export default FilterMenuItem;
