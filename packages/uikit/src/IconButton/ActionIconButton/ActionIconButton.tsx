import _ from 'lodash';
import React, {ForwardedRef, forwardRef} from 'react';
import {IconButton} from '@mui/material';

import {TIconButtonProps} from '@infomat/uikit/src/IconButton/types';
import {Icon} from '@infomat/uikit/src/Icon';

const ActionIconButton = forwardRef(
	({iconType, iconSize, iconColor, children, ...restProps}: TIconButtonProps, ref: ForwardedRef<HTMLButtonElement>) => (
		<IconButton {...restProps} ref={ref}>
			{!_.isUndefined(iconType) && <Icon type={iconType} size={iconSize} color={iconColor} />}
			{children}
		</IconButton>
	),
);

export default ActionIconButton;
