import React from 'react';
import { css } from 'styled-components';
import Input from '../Input';
import { AllInputWrapperCSS, InputComponentCSS, InputLabelCSS, InputLabelUpCSS } from '../Input/InputCss';
import { TextareaProps } from '../Input/InputTypes';

const WrapperCSS = css`
	${AllInputWrapperCSS}
	min-height: 300px;
	width: 100%;
`;

const LabelUpCSS = css`
	${InputLabelUpCSS}
	top: 6px;
`;

const InputCSS = css`
	${InputComponentCSS}
	resize: none;
	height: 250px;
	width: 100%;

	:focus {
		+ label {
			${LabelUpCSS}
		}
	}

	:not(:placeholder-shown) {
		+ label {
			${LabelUpCSS}
		}
	}
`;

const LabelCSS = css`
	${InputLabelCSS}
	top: 11px;
`;

const Textarea = (props: TextareaProps) => {
	return (
		<Input
			as='textarea'
			{...props}
			allInputWrapperCSS={WrapperCSS}
			inputComponentCSS={InputCSS}
			inputLabelCSS={LabelCSS}
		/>
	);
};

export default Textarea;
