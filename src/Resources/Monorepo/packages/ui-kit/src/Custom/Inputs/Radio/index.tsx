import React from 'react';
import { css } from 'styled-components';
import Input from '../Input';
import { InputProps, InputStyledProps } from '../Input/InputTypes';

const InputAllWrapperCSS = css`
	position: relative;
	min-height: 40px;
`;

const InputCSS = css`
	margin-left: 12px;
	width: ${({ theme, fontSize }: InputStyledProps) => theme.typography.texts.sizes[fontSize]};
	height: ${({ theme, fontSize }: InputStyledProps) => theme.typography.texts.sizes[fontSize]};
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
`;

const Radio = ({ ...props }: InputProps) => {
	return (
		<Input
			type='radio'
			{...props}
			allInputWrapperCSS={InputAllWrapperCSS}
			inputComponentCSS={InputCSS}
			inputLabelCSS={LabelCSS}
		/>
	);
};

export default Radio;
