import { Colors, FontWeights, Sizes } from 'ui-kit/src/Common/Types';
import { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { FlattenInterpolation, ThemedStyledProps } from 'styled-components';
import { Theme } from 'ui-kit/src/Theme';

type InputCSSType = FlattenInterpolation<ThemedStyledProps<InputStyledProps, any>>;

type CustomInput = {
	textColor?: Colors;
	labelColor?: Colors;
	backgroundColor?: Colors;
	fontSize?: Sizes;
	weight?: FontWeights;
	error?: string;
	as?: 'input' | 'textarea' | 'select';
	allInputWrapperCSS?: InputCSSType;
	inputWrapperCSS?: InputCSSType;
	inputComponentCSS?: InputCSSType;
	inputLabelCSS?: InputCSSType;
	inputErrorCSS?: InputCSSType;
};

export type InputProps = InputHTMLAttributes<any> & CustomInput;

export type TextareaProps = TextareaHTMLAttributes<any> & CustomInput;

export type OptionProps = { value: string; label: string; disabled?: boolean; selected?: boolean };
export type SelectProps = SelectHTMLAttributes<any> & CustomInput & { options: OptionProps[] };

export type InputStyledProps = InputHTMLAttributes<any> & {
	theme: Theme;
	textColor: Colors;
	labelColor: Colors;
	backgroundColor: Colors;
	fontSize: Sizes;
	weight: FontWeights;
	type: string;
	placeholder: string;
	error: string;
	name: string;
	disabled: boolean;
	allInputWrapperCSS: InputCSSType;
	inputWrapperCSS: InputCSSType;
	inputComponentCSS: InputCSSType;
	inputLabelCSS: InputCSSType;
	inputErrorCSS: InputCSSType;
};

export const inputAttrFunc = (props: InputStyledProps): InputStyledProps => props;
