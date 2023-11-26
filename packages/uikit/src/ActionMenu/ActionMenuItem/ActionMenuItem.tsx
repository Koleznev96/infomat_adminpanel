import React, {useCallback, useRef} from 'react';
import {Typography, Paper, ClickAwayListener, Popper, MenuItem, Modal, Box, Grid} from '@mui/material';

import {IconType} from '@infomat/uikit/src/Icon';
import PropertyHandler from '@infomat/core/src/Types/PropertyHandler';
import {useBooleanState} from '@infomat/core/src/Hooks/useBooleanState';

import style from './ActionMenuItem.module.scss';
import Button from '../../Button/Button';
import {useDebounced} from '@infomat/core/src/Hooks/useDebounced';

const ActionMenuItem = ({onEdit, onDelete, editLink, deleteTitle}: TActionMenuItemProps) => {
	const anchorEl = useRef<HTMLButtonElement>(null);
	const [isShow, open, close] = useBooleanState(false);
	const [isShowModal, displayModal, closeModal] = useBooleanState(false);

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

	const deleteHandler = useCallback(() => {
		closeModal();
		onDelete && onDelete();
	}, [closeModal, onDelete]);

	return (
		<>
			<Button ref={anchorEl} iconType={IconType.moreHoriz} className={style.button} onClick={onOpen} />
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
							width: deleteTitle ? 190 : 174,
							paddingBottom: 0.2,
						}}
					>
						{(onEdit || editLink) && (
							<Button component={editLink} className={style.edit}>
								Редактировать
							</Button>
						)}
						{onDelete && (
							<MenuItem onClick={deleteTitle ? onDelete : displayModal} key={'delete'}>
								<Typography className={style.meuItem}>{deleteTitle || 'Удалить'}</Typography>
							</MenuItem>
						)}
					</Paper>
				</ClickAwayListener>
			</Popper>
			<Modal open={isShowModal} onClose={closeModal}>
				<Box className={style.modal}>
					<Typography className={style.title}>Вы действительно хотите удалить?</Typography>
					<Grid container direction="row" spacing={2}>
						<Grid item xs={6}>
							<Button className={style.buttonModul} variant="outlined" onClick={deleteHandler}>
								Да, удалить
							</Button>
						</Grid>
						<Grid item xs={6}>
							<Button className={style.buttonModul} variant="outlined" onClick={closeModal}>
								Нет, я ошибся
							</Button>
						</Grid>
					</Grid>
				</Box>
			</Modal>
		</>
	);
};

type TActionMenuItemProps = {
	onEdit?: PropertyHandler;
	editLink?: React.ElementType;
	onDelete?: PropertyHandler;
	deleteTitle?: string;
};

export default ActionMenuItem;
