import _ from 'lodash';
import React, {useCallback, useState} from 'react';
import {Grid, Typography} from '@mui/material';

import ButtonWithTooltip from '@infomat/uikit/src/Button/ButtonWithTooltip';
import PasswordField from '@infomat/uikit/src/Fields/PasswordField/PasswordField';
import TextField from '@infomat/uikit/src/Fields/TextField/TextField';
import PropertyHandler from '@infomat/core/src/Types/PropertyHandler';

import InfomatLogo from 'src/Assets/Images/infomat_logo.png';

import style from './LoginDesktop.module.scss';

const LoginDesktop = ({onLogin, isNetworkAvailable, isLoggingIn, error}: TLoginProps) => {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');

	const onSubmit = useCallback(
		(e: React.SyntheticEvent) => {
			e.preventDefault();

			onLogin(login, password);
		},
		[onLogin, login, password],
	);

	return (
		<>
			<Grid container justifyContent="center" alignItems="center" className={style.login}>
				<Grid item className={style.content} gap={4}>
					<Grid item container justifyContent="center" alignItems="center" gap={3}>
						<img src={InfomatLogo} alt="Infomat Logo" className={style.logo} />
						<Grid item container justifyContent="center" alignItems="center" gap={1.5}>
							<Typography className={style.title}>Добро пожаловать в панель администратора!</Typography>
							<Typography className={style.description}>Введите данные для входа</Typography>
						</Grid>
					</Grid>
					<Grid item container justifyContent="center" paddingX={2}>
						<form onSubmit={onSubmit} noValidate autoComplete="off" className={style.form}>
							<Grid container direction="column" className={style.inputs} gap={2.5}>
								<TextField
									name="user"
									placeholder={'E-mail'}
									autoComplete="off"
									tabIndex={1}
									onChange={(e) => setLogin(e.target.value)}
									value={login}
									disabled={isLoggingIn}
									variant="outlined"
									label={'E-mail'}
								/>
								<PasswordField
									hasError={!!error && error.length > 0}
									isDisabled={isLoggingIn}
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									placeholder={'0000000'}
									helperText={error && error?.length > 0 ? error : false}
									tabIndex={2}
									textStrings={{
										showPassword: 'Показать пароль',
										hidePassword: 'Скрыть пароль',
									}}
								/>
							</Grid>
							<ButtonWithTooltip
								variant="contained"
								onClick={onSubmit}
								type="submit"
								disabled={_.isEmpty(login) || _.isEmpty(password) || !isNetworkAvailable || isLoggingIn}
								tabIndex={3}
								className={style.button}
								placement="bottom-end"
							>
								Войти
							</ButtonWithTooltip>
						</form>
					</Grid>
				</Grid>
			</Grid>
		</>
	);
};

type TLoginProps = {
	error?: string;
	isLoggingIn?: boolean;
	onLogin: PropertyHandler<string, string>;
	isNetworkAvailable?: boolean;
};

export default LoginDesktop;
