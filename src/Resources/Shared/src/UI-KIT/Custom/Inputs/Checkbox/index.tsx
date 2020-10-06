import React from 'react';
import { css } from 'styled-components';
import Input from '../Input';
import { InputProps, InputStyledProps } from '../Input/InputTypes';

const InputAllWrapperCSS = css`
	position: relative;
	min-height: 115px;
	padding-top: 25px;
`;

const InputCSS = css`
	margin-left: 12px;
	width: ${({ theme, fontSize }: InputStyledProps) => theme.typography.texts.sizes[fontSize]};
	height: ${({ theme, fontSize }: InputStyledProps) => theme.typography.texts.sizes[fontSize]};
	cursor: pointer;
`;

const LabelCSS = css`
	color: ${({ theme, labelColor, error, checked, disabled }: InputStyledProps) =>
		disabled
			? theme.colors.disabled
			: error
			? theme.colors.inputError
			: checked
			? theme.colors[labelColor]
			: theme.colors.inputText};
	font-size: ${({ theme, fontSize }: InputStyledProps) => theme.typography.texts.sizes[fontSize]};
	position: relative;
	bottom: 2px;
	left: 5px;
	cursor: pointer;
`;

const Checkbox = ({ ...props }: InputProps) => {
	return (
		<Input
			type='checkbox'
			allInputWrapperCSS={InputAllWrapperCSS}
			inputComponentCSS={InputCSS}
			inputLabelCSS={LabelCSS}
			{...props}
		/>
	);
};

export default Checkbox;
