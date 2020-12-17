import { getMinDesktopSize } from 'Common/Utils';
import React, { ButtonHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import { Colors, Sizes } from 'ui-kit/src/Common/Types';
import { darkerColor } from 'ui-kit/src/Common/Utils';
import { Theme } from 'ui-kit/src/Theme';

export type ButtonComponentProps = ButtonHTMLAttributes<any> & {
	textColor?: Colors;
	backgroundColor?: Colors;
	borderColor?: Colors;
	size?: Sizes;
	round?: boolean;
};

export type ButtonStyledComponentProps = {
	theme: Theme;
	textColor: Colors;
	backgroundColor: Colors;
	borderColor: Colors;
	size: Sizes;
	round?: boolean;
	disabled?: boolean;
};

export const ButtonStyle = css`
	font-size: ${({ theme, size }: ButtonStyledComponentProps): string => theme.typography.texts.sizes[size]};
	color: ${({ theme, textColor }: ButtonStyledComponentProps): string => theme.colors[textColor]};
	background-color: ${({ theme, backgroundColor }: ButtonStyledComponentProps): string =>
		theme.colors[backgroundColor]};
	border-radius: ${({ round }: ButtonStyledComponentProps): string => (round ? '20px' : '4px')};
	border: 1px solid ${({ theme, borderColor }: ButtonStyledComponentProps): string => theme.colors[borderColor]};
	transition: all 0.2s;
	user-select: none;
	cursor: pointer;

	@media (min-width: ${({ theme }: ButtonStyledComponentProps): string => theme.mediaSizes.desktopMinSize}) {
		:hover {
			background-color: ${({ theme, backgroundColor }: ButtonStyledComponentProps): string =>
				darkerColor(theme.colors[backgroundColor], 0.08)};
			border-color: ${({ theme, borderColor }: ButtonStyledComponentProps): string =>
				darkerColor(theme.colors[borderColor], 0.08)};
		}
	}

	:active {
		background-color: ${({ theme, backgroundColor }: ButtonStyledComponentProps): string =>
			darkerColor(theme.colors[backgroundColor], 0.15)};
		border-color: ${({ theme, borderColor }: ButtonStyledComponentProps): string =>
			darkerColor(theme.colors[borderColor], 0.15)};
	}
	:disabled {
		border-color: ${({ theme }: ButtonStyledComponentProps): string => theme.colors.gray};
		background-color: ${({ theme }: ButtonStyledComponentProps): string => theme.colors.gray};
		color: ${({ theme }: ButtonStyledComponentProps): string => theme.colors.white};
		opacity: 0.7;
		cursor: not-allowed;
	}
	:focus {
		outline: none;
	}
`;

const ButtonComponent = styled.button<ButtonStyledComponentProps>`
	${ButtonStyle}
`;

export const ButtonChildrenWrapper = styled.div`
	padding: 12px 7px;
	@media (min-width: ${getMinDesktopSize}) {
		padding: 12px 20px;
	}
`;

const Button = ({
	children,
	type = 'button',
	onClick,
	textColor = 'white',
	backgroundColor = 'primary',
	borderColor,
	size = 'medium',
	round = false,
	disabled = false,
	...rest
}: ButtonComponentProps): JSX.Element => {
	const realBorderColor = borderColor ? borderColor : backgroundColor;
	return (
		<ButtonComponent
			onClick={onClick}
			type={type}
			textColor={textColor}
			backgroundColor={backgroundColor}
			borderColor={realBorderColor}
			size={size}
			round={round}
			disabled={disabled}
			{...rest}
		>
			<ButtonChildrenWrapper>{children}</ButtonChildrenWrapper>
		</ButtonComponent>
	);
};

export default Button;
