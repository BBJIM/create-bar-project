import React from 'react';
import styled from 'styled-components';
import { AllInputWrapperCSS, InputComponentCSS, InputErrorCSS, InputLabelCSS, InputWrapperCSS } from './InputCss';
import { inputAttrFunc, InputProps, InputStyledProps } from './InputTypes';

const Wrapper = styled.div.attrs(inputAttrFunc)`
	${({ allInputWrapperCSS }: InputStyledProps) => allInputWrapperCSS};
`;

const InputWrapper = styled.div.attrs(inputAttrFunc)`
	${({ inputWrapperCSS }: InputStyledProps) => inputWrapperCSS};
`;

const InputComponent = styled.input.attrs(inputAttrFunc)`
	${({ inputComponentCSS }: InputStyledProps) => inputComponentCSS};
`;

const Label = styled.label.attrs(inputAttrFunc)`
	${({ inputLabelCSS }: InputStyledProps) => inputLabelCSS};
`;

const Error = styled.label.attrs(inputAttrFunc)`
	${({ inputErrorCSS }: InputStyledProps) => inputErrorCSS};
`;

const Input = ({
	children,
	id,
	value,
	onChange,
	onBlur,
	fontSize = 'medium',
	weight = 'normal',
	textColor = 'black',
	labelColor = 'primary',
	backgroundColor = 'inputBackground',
	type = 'text',
	placeholder = '',
	error = '',
	disabled,
	as,
	allInputWrapperCSS = AllInputWrapperCSS,
	inputWrapperCSS = InputWrapperCSS,
	inputComponentCSS = InputComponentCSS,
	inputLabelCSS = InputLabelCSS,
	inputErrorCSS = InputErrorCSS,
	...rest
}: InputProps) => {
	return (
		<Wrapper allInputWrapperCSS={allInputWrapperCSS} backgroundColor={backgroundColor} {...rest}>
			<InputWrapper inputWrapperCSS={inputWrapperCSS} {...rest}>
				<InputComponent
					inputComponentCSS={inputComponentCSS}
					id={id}
					value={value}
					onChange={onChange}
					onBlur={onBlur}
					placeholder=' ' // this is for label to stay up when there is text inside the input
					backgroundColor={backgroundColor}
					fontSize={fontSize}
					weight={weight}
					textColor={textColor}
					labelColor={labelColor}
					type={type}
					error={error}
					disabled={disabled}
					as={as}
					{...rest}
				>
					{children}
				</InputComponent>
				<Label
					value={value}
					placeholder={placeholder}
					inputLabelCSS={inputLabelCSS}
					labelColor={labelColor}
					name={error ? 'active-error' : 'not-active-error'}
					htmlFor={id}
					fontSize={fontSize}
					textColor={textColor}
					error={error}
					disabled={disabled}
					{...rest}
				>
					{placeholder}
				</Label>
			</InputWrapper>
			{error && (
				<Error value={value} inputErrorCSS={inputErrorCSS} {...rest}>
					{error}
				</Error>
			)}
		</Wrapper>
	);
};

export default Input;
