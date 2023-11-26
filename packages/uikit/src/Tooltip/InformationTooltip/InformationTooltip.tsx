import React, {ReactElement, ReactNode} from 'react';
import {Grid, Tooltip, TooltipProps, ClickAwayListener} from '@mui/material';
import _ from 'lodash';
import classNames from 'classnames';

import PropertyHandler from '@infomat/core/src/Types/PropertyHandler';

import style from './InformationTooltip.module.scss';

const InformationTooltip = ({
	text,
	footer,
	children,
	isOpen,
	placement,
	className,
	onClose,
}: TInformationTooltipProps) => {
	return (
		<ClickAwayListener
			onClickAway={(event) => {
				if (_.get(event.target, 'nodeName') !== LINK_NODE_NAME) {
					onClose();
				}
			}}
		>
			<Tooltip
				title={
					<Grid container>
						<Grid item>{text}</Grid>
						{!_.isUndefined(footer) && (
							<Grid item className={style.footer}>
								{footer}
							</Grid>
						)}
					</Grid>
				}
				disableFocusListener
				disableHoverListener
				disableTouchListener
				placement={placement}
				arrow
				open={isOpen}
				onClose={onClose}
				componentsProps={{
					popper: {
						className: classNames({
							[style.tooltipPopper]: true,
							[style.positionTop]: placement === 'top',
						}),
					},
					tooltip: {
						className: style.tooltip,
					},
					arrow: {
						className: style.tooltipArrow,
					},
				}}
				className={className}
			>
				{children}
			</Tooltip>
		</ClickAwayListener>
	);
};

const LINK_NODE_NAME = 'A';

type TInformationTooltipProps = {
	className?: TooltipProps['className'];
	placement?: TooltipProps['placement'];
	text?: ReactNode;
	footer?: ReactNode;
	children: ReactElement;
	onClose: PropertyHandler;
	isOpen: boolean;
};

export default InformationTooltip;
