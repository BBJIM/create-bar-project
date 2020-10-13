import { Colors, Sizes } from 'Common/Types';
import { darkerColor } from 'ui-kit/src/Common/Utils';
import React, { ButtonHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import { ITheme } from 'Theme';
import Link from '../Link';

export type ButtonComponentProps = ButtonHTMLAttributes<any> & {
	textColor?: Colors;
	backgroundColor?: Colors;
	borderColor?: Colors;
	size?: Sizes;
	round?: boolean;
	path?: string;
};

type ButtonStyledComponentProps = {
	theme: ITheme;
	textColor: Colors;
	backgroundColor: Colors;
	borderColor: Colors;
	size: Sizes;
	round?: boolean;
	disabled?: boolean;
};

const ButtonStyle = css`
	font-size: ${({ theme, size }: ButtonStyledComponentProps) => theme.typography.texts.sizes[size]};
	color: ${({ theme, textColor }: ButtonStyledComponentProps) => theme.colors[textColor]};
	background-color: ${({ theme, backgroundColor }: ButtonStyledComponentProps) => theme.colors[backgroundColor]};
	border-radius: ${({ round }: ButtonStyledComponentProps) => (round ? '20px' : '4px')};
	border: 1px solid ${({ theme, borderColor }: ButtonStyledComponentProps) => theme.colors[borderColor]};
	transition: all 0.2s;
	user-select: none;
	cursor: pointer;

	@media (min-width: ${({ theme }: ButtonStyledComponentProps) => theme.mediaSizes.desktopMinSize}) {
		:hover {
			background-color: ${({ theme, backgroundColor }: ButtonStyledComponentProps) =>
				darkerColor(theme.colors[backgroundColor], 0.08)};
			border-color: ${({ theme, borderColor }: ButtonStyledComponentProps) =>
				darkerColor(theme.colors[borderColor], 0.08)};
		}
	}

	:active {
		background-color: ${({ theme, backgroundColor }: ButtonStyledComponentProps) =>
			darkerColor(theme.colors[backgroundColor], 0.15)};
		border-color: ${({ theme, borderColor }: ButtonStyledComponentProps) =>
			darkerColor(theme.colors[borderColor], 0.15)};
	}
	:disabled {
		border-color: ${({ theme }: ButtonStyledComponentProps) => theme.colors.gray};
		background-color: ${({ theme }: ButtonStyledComponentProps) => theme.colors.gray};
		color: ${({ theme }: ButtonStyledComponentProps) => theme.colors.white};
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

const LinkButtonComponent = styled(Link)<ButtonStyledComponentProps>`
	${ButtonStyle}
	width: fit-content;
`;

const ChildrenWrapper = styled.div`
	padding: 12px 7px;
	@media (min-width: ${({ theme }: { theme: ITheme }) => theme.mediaSizes.desktopMinSize}) {
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
	path,
	...rest
}: ButtonComponentProps) => {
	const realBorderColor = borderColor ? borderColor : backgroundColor;
	return path ? (
		<LinkButtonComponent
			path={path}
			onClick={onClick}
			textColor={textColor}
			backgroundColor={backgroundColor}
			borderColor={realBorderColor}
			size={size}
			round={round}
			disabled={disabled}
			{...rest}
		>
			<ChildrenWrapper>{children}</ChildrenWrapper>
		</LinkButtonComponent>
	) : (
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
			<ChildrenWrapper>{children}</ChildrenWrapper>
		</ButtonComponent>
	);
};

export default Button;
