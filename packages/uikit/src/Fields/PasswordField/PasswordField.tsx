import React, {useCallback, useState} from 'react';
import {TextFieldProps, Tooltip} from '@mui/material';

import ActionIconButton from '@infomat/uikit/src/IconButton/ActionIconButton/ActionIconButton';
import {IconType, IconSize} from '@infomat/uikit/src/Icon';
import TextField from '@infomat/uikit/src/Fields/TextField/TextField';

import style from './PasswordField.module.scss';

const PasswordField = ({
	hasError,
	isDisabled,
	textStrings,
	inputDataTestId,
	buttonDataTestId,
	...restProps
}: TPasswordFieldProps) => {
	const [isPasswordVisible, setPasswordVisible] = useState(false);

	const toggleIsPasswordVisible = useCallback(() => {
		setPasswordVisible((prevState) => !prevState);
	}, []);

	return (
		<TextField
			{...restProps}
			disabled={isDisabled}
			error={hasError}
			type={isPasswordVisible ? 'text' : 'password'}
			autoComplete="off"
			data-test-id={inputDataTestId}
			InputProps={{
				endAdornment: (
					<Tooltip title={isPasswordVisible ? textStrings.hidePassword : textStrings.showPassword}>
						<ActionIconButton
							iconType={isPasswordVisible ? IconType.visibility : IconType.visibilityOff}
							iconSize={IconSize.small}
							onClick={toggleIsPasswordVisible}
							onMouseDown={toggleIsPasswordVisible}
							className={style.toggleButton}
							data-test-id={buttonDataTestId}
						/>
					</Tooltip>
				),
			}}
		/>
	);
};

type TPasswordFieldProps = Pick<
	TextFieldProps,
	'value' | 'onChange' | 'helperText' | 'placeholder' | 'className' | 'tabIndex' | 'label' | 'variant'
> & {
	hasError?: boolean;
	isDisabled?: boolean;
	textStrings: {
		showPassword: string;
		hidePassword: string;
	};
	inputDataTestId?: string;
	buttonDataTestId?: string;
};

export default PasswordField;
