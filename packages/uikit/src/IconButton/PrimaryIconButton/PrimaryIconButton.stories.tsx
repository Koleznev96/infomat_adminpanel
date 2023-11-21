import {Meta, StoryObj} from '@storybook/react';

import {iconColorControl, iconSizeControl, iconTypeControl} from '@infomat/uikit/src/Icon/storyIconControls';
import {IconColor, IconSize, IconType} from '@infomat/uikit/src/Icon';

import PrimaryIconButton from './PrimaryIconButton';

const meta: Meta<typeof PrimaryIconButton> = {
	component: PrimaryIconButton,
	argTypes: {
		iconType: iconTypeControl,
		iconSize: iconSizeControl,
		iconColor: iconColorControl,
	},
};

export default meta;

type Story = StoryObj<typeof PrimaryIconButton>;

export const primaryIconButton: Story = {
	args: {
		iconType: IconType.edit,
		iconSize: IconSize.default,
		iconColor: IconColor.auto,
		disabled: false,
	},
};
