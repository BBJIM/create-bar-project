import { css } from 'styled-components';
import { InputStyledProps } from './InputTypes';

export const AllInputWrapperCSS = css`
	position: relative;
	min-height: 120px;
	width: 245px;
`;

export const InputWrapperCSS = css`
	position: relative;
	width: 100%;
`;

export const InputLabelUpCSS = css`
	color: ${({ theme, labelColor, error }: InputStyledProps): string =>
		error ? theme.colors.inputError : theme.colors[labelColor]};
	bottom: 27px;
	left: 12px;
	font-size: ${({ theme }: InputStyledProps): string => theme.typography.texts.sizes.small};
`;

export const OnlyInputComponentCSS = css`
	font-size: ${({ theme, fontSize }: InputStyledProps): string => theme.typography.texts.sizes[fontSize]};
	font-weight: ${({ theme, weight }: InputStyledProps): string => theme.typography.fontWeights[weight]};
	color: ${({ theme, textColor }: InputStyledProps): string => theme.colors[textColor]};
	background-color: ${({ theme, backgroundColor }: InputStyledProps): string => theme.colors[backgroundColor]};
	border: ${({ theme, error }: InputStyledProps): string =>
		`1px solid ${error ? theme.colors.inputError : theme.colors.transparent}`};
	border-radius: 5px;
	appearance: none;
	padding: 21px 12px 0 12px;
	transition: all 0.35s ease;

	height: 50px;
	width: 100%;

	:focus {
		outline: none;
		border-bottom: ${({ theme, labelColor, error }: InputStyledProps): string =>
			`1px solid ${error ? theme.colors.inputError : theme.colors[labelColor]}`};
		box-shadow: ${({ theme, labelColor, error }: InputStyledProps): string =>
			`0 1px 0 0 ${error ? theme.colors.inputError : theme.colors[labelColor]}`};
	}

	:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
`;

export const InputComponentCSS = css`
	${OnlyInputComponentCSS}
	:focus {
		+ label {
			${InputLabelUpCSS}
		}
	}

	/* FOR IE */
	:not(:-ms-input-placeholder) {
		+ label {
			${InputLabelUpCSS}
		}
	}

	/* FOR EVERYTHING ELSE */
	:not(:placeholder-shown) {
		+ label {
			${InputLabelUpCSS}
		}
	}
`;

export const InputLabelCSS = css`
	width: fit-content;
	position: absolute;
	bottom: 11px;
	left: 12px;
	font-size: ${({ theme, fontSize }: InputStyledProps): string => theme.typography.texts.sizes[fontSize]};
	color: ${({ theme, error }: InputStyledProps): string =>
		error ? theme.colors.inputError : theme.colors.inputText};
	font-weight: ${({ theme }: InputStyledProps): string => theme.typography.fontWeights.normal};
	transition: all 0.15s ease;
	pointer-events: none;
	opacity: ${({ disabled }: InputStyledProps): number => (disabled ? 0.1 : 1)};
`;

export const InputErrorCSS = css`
	color: ${({ theme }: InputStyledProps): string => theme.colors.inputError};
	position: relative;
	top: 4px;
	left: 12px;
`;
