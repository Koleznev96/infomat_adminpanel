import React, {ElementType, ReactNode} from 'react';
import {Paper, Typography, CircularProgress} from '@mui/material';

import Button from '@infomat/uikit/src/Button/Button';

import style from './Page.module.scss';

const Page = ({children, label, backLink, isLoading}: TPageProps) => {
	return (
		<Paper classes={{root: style.container}}>
			<div className={style.scroll}>
				{backLink && (
					<Button variant="outlined" component={backLink}>
						Назад
					</Button>
				)}
				{label && <Typography className={style.label}>{label}</Typography>}
				{isLoading ? (
					<div className={style.boxEmpty}>
						<CircularProgress size={38} />
					</div>
				) : (
					children
				)}
			</div>
		</Paper>
	);
};

type TPageProps = {
	children?: ReactNode;
	label?: string;
	backLink?: ElementType;
	isLoading?: boolean;
};

export default Page;
