import {Meta, StoryObj} from '@storybook/react';

import {IconColor, IconSize, IconType} from '@infomat/uikit/src/Icon';
import {iconColorControl, iconSizeControl, iconTypeControl} from '@infomat/uikit/src/Icon/storyIconControls';

import ActionIconButton from './ActionIconButton';

const meta: Meta<typeof ActionIconButton> = {
	component: ActionIconButton,
	argTypes: {
		iconType: iconTypeControl,
		iconSize: iconSizeControl,
		iconColor: iconColorControl,
	},
};

export default meta;

type Story = StoryObj<typeof ActionIconButton>;

export const actionIconButton: Story = {
	args: {
		iconType: IconType.deleteOutlined,
		iconSize: IconSize.default,
		iconColor: IconColor.auto,
		disabled: false,
	},
};
