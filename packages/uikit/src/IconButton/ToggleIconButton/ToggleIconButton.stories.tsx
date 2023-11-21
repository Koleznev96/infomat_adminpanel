import {Meta, StoryObj} from '@storybook/react';

import {iconColorControl, iconSizeControl, iconTypeControl} from '@infomat/uikit/src/Icon/storyIconControls';
import {IconColor, IconSize, IconType} from '@infomat/uikit/src/Icon';

import ToggleIconButton from './ToggleIconButton';

const meta: Meta<typeof ToggleIconButton> = {
	component: ToggleIconButton,
	argTypes: {
		iconType: iconTypeControl,
		iconSize: iconSizeControl,
		iconColor: iconColorControl,
	},
};

export default meta;

type Story = StoryObj<typeof ToggleIconButton>;

export const toggleIconButton: Story = {
	args: {
		iconType: IconType.mic,
		iconSize: IconSize.default,
		iconColor: IconColor.auto,
		disabled: false,
		selected: false,
	},
};
