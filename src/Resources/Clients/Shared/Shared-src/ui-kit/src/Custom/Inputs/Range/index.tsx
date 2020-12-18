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
`;

const LabelCSS = css`
	color: ${({ theme, error, disabled }: InputStyledProps): string =>
		disabled ? theme.colors.disabled : error ? theme.colors.inputError : theme.colors.inputText};
	font-size: ${({ theme, fontSize }: InputStyledProps): string => theme.typography.texts.sizes[fontSize]};
	position: absolute;
	bottom: 25px;
	/* right: 125px; */
	left: 20px;
	@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
		display: table;
	}
`;

const RangeInput = ({ ...props }: InputProps): JSX.Element => {
	return (
		<Input
			type='range'
			{...props}
			allInputWrapperCSS={InputAllWrapperCSS}
			inputComponentCSS={InputCSS}
			inputLabelCSS={LabelCSS}
		/>
	);
};

export default RangeInput;
