import React, {ComponentProps, ReactNode} from 'react';
import {Popper as MuiPopper, ClickAwayListener, Paper, PopperPlacementType} from '@mui/material';

import PropertyHandler from '@infomat/core/src/Types/PropertyHandler';

const Popper = ({isOpen = true, anchorEl, onClose, children, placement = 'top-end', popperOptions}: TPopperProps) => {
	return (
		<MuiPopper
			popperOptions={popperOptions}
			anchorEl={anchorEl}
			open={isOpen}
			placement={placement}
			disablePortal
			sx={{zIndex: 'modal'}}
		>
			<ClickAwayListener onClickAway={onClose} mouseEvent="onPointerDown" disableReactTree touchEvent={false}>
				<Paper sx={{boxShadow: 8}}>{children}</Paper>
			</ClickAwayListener>
		</MuiPopper>
	);
};

type TPopperProps = {
	isOpen?: boolean;
	anchorEl?: ComponentProps<typeof MuiPopper>['anchorEl'];
	onClose: PropertyHandler;
	children: ReactNode;
	placement?: PopperPlacementType;
	popperOptions?: ComponentProps<typeof MuiPopper>['popperOptions'];
};

export default Popper;
