import { Meta, Story } from '@storybook/react';
import { Button, ButtonProps } from 'ui-kit/src/Custom';
import React from 'react';

export default {
	title: 'Custom/Button',
	component: Button,
	argTypes: {},
} as Meta;

const Template: Story<ButtonProps> = (args: any) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
	children: 'Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
	children: 'Button',
	backgroundColor: 'secondary',
};

export const Large = Template.bind({});
Large.args = {
	size: 'large',
	children: 'Button',
};

export const Small = Template.bind({});
Small.args = {
	size: 'small',
	children: 'Button',
};
