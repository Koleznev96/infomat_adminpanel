import React, {ComponentProps, PropsWithChildren} from 'react';
import {CircularProgress, Grid} from '@mui/material';

import style from './ConditionalCircularProgress.module.scss';

const ConditionalCircularProgress = ({
	shouldShowProgress,
	size = '1rem',
	children,
}: PropsWithChildren<TConditionalCircularProgressProps>) => {
	return shouldShowProgress ? (
		<Grid container className={style.container}>
			<Grid item>
				<CircularProgress size={size} />
			</Grid>
		</Grid>
	) : (
		<>{children}</>
	);
};

type TConditionalCircularProgressProps = {
	shouldShowProgress: boolean;
	size?: ComponentProps<typeof CircularProgress>['size'];
};

export default ConditionalCircularProgress;
