import {Dialog, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import React, {useState} from 'react';
import {Navigate} from 'react-router';

import Infomat from 'src/Assets/Images/infomat_logo.png';
import {Routes} from 'src/Routes/Routes';

import './_PageNotFound.scss';

const PageNotFound = () => {
	const [shouldRedirect, setShouldRedirect] = useState(false);
	const toggleRedirect = () => setShouldRedirect(!shouldRedirect);

	if (shouldRedirect) {
		return <Navigate to={Routes.information} />;
	}

	return (
		<Dialog
			aria-labelledby="page-not-found"
			className="page-not-found"
			maxWidth="xs"
			open
			fullWidth
			onClick={toggleRedirect}
		>
			<DialogTitle id="page-not-found-title" className="page-not-found__title">
				<img src={Infomat} alt="Infomat" />
			</DialogTitle>
			<DialogContent>
				<DialogContentText className="login__hint">
					<span>{'Страница не найдена'}</span>
				</DialogContentText>
				<DialogContentText className="login__hint">
					<span>{'Нажмите тут чтоб перейти на главную страницу'}</span>
				</DialogContentText>
			</DialogContent>
		</Dialog>
	);
};

export default PageNotFound;
