import React, {ReactNode} from 'react';
import {ClickAwayListener, Popper, Typography, Grow, Paper, MenuList} from '@mui/material';

import {Icon, IconSize, IconType} from '@infomat/uikit/src/Icon';

import style from './Dashboard.module.scss';

const Dashboard = ({title, label, children, RootComponent}: TDashboardProps) => {
	const [open, setOpen] = React.useState(false);
	const anchorRef = React.useRef<HTMLDivElement>(null);

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const handleClose = (event: Event | React.SyntheticEvent) => {
		if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
			return;
		}

		setOpen(false);
	};

	function handleListKeyDown(event: React.KeyboardEvent) {
		if (event.key === 'Tab') {
			event.preventDefault();
			setOpen(false);
		} else if (event.key === 'Escape') {
			setOpen(false);
		}
	}

	return (
		<>
			<div className={style.button} ref={anchorRef} onClick={handleToggle}>
				{RootComponent ? (
					RootComponent
				) : (
					<>
						<div className={style.text}>
							{label && <Typography className={style.label}>{label}</Typography>}
							{title && <Typography className={style.title}>{title}</Typography>}
						</div>
						<Icon
							className={style.icon}
							type={open ? IconType.keyboardArrowUp : IconType.keyboardArrowDown}
							size={IconSize.tiny}
						/>
					</>
				)}
			</div>
			<Popper
				className={style.popper}
				open={open}
				anchorEl={anchorRef.current}
				role={undefined}
				placement="bottom-end"
				transition
				disablePortal
			>
				{({TransitionProps, placement}) => (
					<Grow className={style.popper} {...TransitionProps}>
						<Paper classes={{root: style.paper}}>
							<ClickAwayListener onClickAway={handleClose}>
								<MenuList onClick={handleClose} onKeyDown={handleListKeyDown}>
									{children}
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>
		</>
	);
};

type TDashboardProps = {
	children?: ReactNode;
	label?: string;
	title?: string;
	RootComponent?: ReactNode;
};

export default Dashboard;
