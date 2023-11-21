import React, {ReactNode, useCallback, MouseEvent} from 'react';
import {Modal, Box, Typography, Grid} from '@mui/material';

import {useBooleanState} from '@infomat/core/src/Hooks/useBooleanState';

import Button, {TButtonProps} from './Button';
import style from './ButtonDelete.module.scss';

const ButtonDelete = ({onClick, variant = 'outlined', children = 'Удалить', ...props}: TButtonDeleteProps) => {
	const [isShowModal, displayModal, closeModal] = useBooleanState(false);

	const deleteHandler = useCallback(
		(e: MouseEvent<HTMLButtonElement>) => {
			closeModal();
			onClick && onClick(e);
		},
		[closeModal, onClick],
	);

	return (
		<>
			<Button variant={variant} onClick={displayModal} type="submit" {...props}>
				{children}
			</Button>
			<Modal open={isShowModal} onClose={closeModal}>
				<Box className={style.modal}>
					<Typography className={style.title}>Вы действительно хотите удалить?</Typography>
					<Grid container direction="row" spacing={2}>
						<Grid item xs={6}>
							<Button className={style.button} variant="outlined" onClick={deleteHandler}>
								Да, удалить
							</Button>
						</Grid>
						<Grid item xs={6}>
							<Button className={style.button} variant="outlined" onClick={closeModal}>
								Нет, я ошибся
							</Button>
						</Grid>
					</Grid>
				</Box>
			</Modal>
		</>
	);
};

export type TButtonDeleteProps = TButtonProps & {
	children?: ReactNode;
};

export default ButtonDelete;
