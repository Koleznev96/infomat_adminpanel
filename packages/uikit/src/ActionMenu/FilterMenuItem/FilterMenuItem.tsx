import React, {useCallback, useRef, ReactNode} from 'react';
import {Typography, Paper, ClickAwayListener, Popper, PopperPlacementType} from '@mui/material';

import {Icon, IconColor, IconSize, IconType} from '@infomat/uikit/src/Icon';
import PropertyHandler from '@infomat/core/src/Types/PropertyHandler';
import {useBooleanState} from '@infomat/core/src/Hooks/useBooleanState';
import {useDebounced} from '@infomat/core/src/Hooks/useDebounced';

import style from './FilterMenuItem.module.scss';
import Button from '../../Button/Button';

const constLabels = ['Опубликовано', 'Черновик', 'Сбросить фильтр'];

const FilterMenuItem = ({
	onDec,
	onAsc,
	title,
	isReset,
	onReset,
	labels = constLabels,
	placement = 'bottom-end',
}: TFilterMenuItemProps) => {
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
				placement={placement}
				anchorEl={anchorEl.current}
				open={isShow}
			>
				<ClickAwayListener onClickAway={onclose} mouseEvent="onPointerDown" disableReactTree touchEvent={false}>
					<Paper
						sx={{
							boxShadow: 8,
							paddingBottom: 0.2,
							display: 'flex',
							flexDirection: 'column',
							zIndex: 3000,
						}}
					>
						<Button startIconType={IconType.keyboardArrowUpOut} onClick={onAsc} className={style.edit}>
							{labels[0]}
						</Button>
						<Button startIconType={IconType.keyboardArrowDown} onClick={onDec} className={style.edit}>
							{labels[1]}
						</Button>
						{isReset && (
							<Button iconSize={IconSize.tiny} startIconType={IconType.close} onClick={onReset} className={style.edit}>
								{labels[2]}
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
	labels?: string[];
	placement?: PopperPlacementType;
};

export default FilterMenuItem;
