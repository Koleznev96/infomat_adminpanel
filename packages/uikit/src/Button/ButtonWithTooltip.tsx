import React, {ReactNode} from 'react';
import {Tooltip} from '@mui/material';

import Button, {TButtonProps} from './Button';

const ButtonWithTooltip = ({
	onClick,
	title = 'Заполните все обязательные поля*',
	variant = 'contained',
	children = 'Сохранить',
	placement = 'top-start',
	disabled,
	...props
}: TButtonWithTooltipProps) => {
	return (
		<Tooltip disableHoverListener={!disabled} title={title} placement={placement} style={{userSelect: 'none'}}>
			<div>
				<Button disabled={disabled} variant={variant} type="submit" {...props}>
					{children}
				</Button>
			</div>
		</Tooltip>
	);
};

export type TButtonWithTooltipProps = TButtonProps & {
	children?: ReactNode;
	title?: string;
	placement?:
		| 'bottom-end'
		| 'bottom-start'
		| 'bottom'
		| 'left-end'
		| 'left-start'
		| 'left'
		| 'right-end'
		| 'right-start'
		| 'right'
		| 'top-end'
		| 'top-start'
		| 'top';
};

export default ButtonWithTooltip;
