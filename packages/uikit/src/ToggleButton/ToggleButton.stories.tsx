import React from 'react';
import {Meta, StoryObj} from '@storybook/react';

import {Icon, IconSize, IconType} from '@infomat/uikit/src/Icon';

import ToggleButton from './ToggleButton';

const meta: Meta<typeof ToggleButton> = {
	component: ToggleButton,
	argTypes: {
		children: {
			table: {
				disable: true,
			},
		},
		component: {
			table: {
				disable: true,
			},
		},
		onClick: {
			action: 'onClick',
		},
	},
};

export default meta;

export const toggleButton: StoryObj<typeof ToggleButton> = {
	args: {
		selected: false,
		disabled: false,
		size: 'medium',
		children: (
			<>
				<Icon type={IconType.favorite} size={IconSize.micro} /> Regular Guests
			</>
		),
	},
};
