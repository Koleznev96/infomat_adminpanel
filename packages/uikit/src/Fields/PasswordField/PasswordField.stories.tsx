import {Meta, StoryObj} from '@storybook/react';

import PasswordField from './PasswordField';

const meta: Meta<typeof PasswordField> = {
	component: PasswordField,
};

export default meta;

export const passwordField: StoryObj<typeof PasswordField> = {
	args: {label: 'Password', textStrings: {showPassword: 'showPassword', hidePassword: 'hidePassword'}},
};
