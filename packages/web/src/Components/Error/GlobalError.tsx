import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import React from 'react';

import {IconType} from '@infomat/uikit/src/Icon';
import Button from '@infomat/uikit/src/Button/Button';

import Infomat from 'src/Assets/Images/infomat_logo.png';
import DocumentTitle from 'src/Components/DocumentTitle';
import {Routes} from 'src/Routes/Routes';

import FormattedErrorMessage from './FormattedErrorMessage';

const GlobalError = (props: IGlobalErrorProps) => {
	return (
		<Dialog aria-labelledby="global-error" className="global-error" maxWidth="xs" open fullWidth>
			<DocumentTitle />
			<DialogTitle id="page-not-found-title" style={{textAlign: 'center'}}>
				<img src={Infomat} alt="VX Live" />
			</DialogTitle>
			<DialogContent>
				<DialogContentText>
					<FormattedErrorMessage message={props.message} />
					{'common:global-error'}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button color="secondary" startIconType={IconType.refresh} onClick={() => window.location.reload()}>
					{'common:global-error-refresh'}
				</Button>
				<Button color="secondary" startIconType={IconType.home} href={Routes.home}>
					{'common:global-error-home'}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

interface IGlobalErrorProps {
	message?: string;
}

export default GlobalError;
