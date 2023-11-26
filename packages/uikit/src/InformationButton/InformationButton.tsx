import React, {ComponentProps} from 'react';
import {IconButtonProps} from '@mui/material/IconButton';
import {TooltipProps} from '@mui/material';

import InformationTooltip from '@infomat/uikit/src/Tooltip/InformationTooltip/InformationTooltip';
import ActionIconButton from '@infomat/uikit/src/IconButton/ActionIconButton/ActionIconButton';
import {IconSize, IconType} from '@infomat/uikit/src/Icon';
import {useBooleanState} from '@infomat/core/src/Hooks/useBooleanState';

const InformationButton = ({
	tooltipText,
	tooltipFooter,
	tooltipPlacement,
	className,
	tooltipClassName,
}: TInformationButtonProps) => {
	const [isOpen, , close, toggle] = useBooleanState(false);

	return (
		<InformationTooltip
			isOpen={isOpen}
			onClose={close}
			text={tooltipText}
			footer={tooltipFooter}
			placement={tooltipPlacement}
			className={tooltipClassName}
		>
			<ActionIconButton iconType={IconType.info} onClick={toggle} iconSize={IconSize.small} className={className} />
		</InformationTooltip>
	);
};

type TInformationButtonProps = {
	className?: IconButtonProps['className'];
	tooltipClassName?: TooltipProps['className'];
	tooltipText: string;
	tooltipFooter?: ComponentProps<typeof InformationTooltip>['footer'];
	tooltipPlacement?: ComponentProps<typeof InformationTooltip>['placement'];
};

export default InformationButton;
