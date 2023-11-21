import React, {ElementType, ForwardedRef, forwardRef} from 'react';
import {ToggleButton as MuiToggleButton, ToggleButtonProps} from '@mui/material';

const ToggleButton = forwardRef((props: TToggleButtonProps, ref: ForwardedRef<HTMLButtonElement>) => (
	<MuiToggleButton {...props} ref={ref} value="value" />
));

type TToggleButtonProps = Pick<
	ToggleButtonProps,
	'onClick' | 'selected' | 'disabled' | 'children' | 'size' | 'className' | 'color'
> & {component?: ElementType};

export default ToggleButton;
