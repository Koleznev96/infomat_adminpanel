import {Meta, StoryObj} from '@storybook/react';

import {iconColorControl, iconSizeControl, iconTypeControl} from '@infomat/uikit/src/Icon/storyIconControls';
import {IconColor, IconSize, IconType} from '@infomat/uikit/src/Icon';

import SecondaryIconButton from './SecondaryIconButton';

const meta: Meta<typeof SecondaryIconButton> = {
	component: SecondaryIconButton,
	argTypes: {
		iconType: iconTypeControl,
		iconSize: iconSizeControl,
		iconColor: iconColorControl,
	},
};

export default meta;

type Story = StoryObj<typeof SecondaryIconButton>;

export const secondaryIconButton: Story = {
	args: {
		iconType: IconType.close,
		iconSize: IconSize.default,
		iconColor: IconColor.auto,
		disabled: false,
	},
};
