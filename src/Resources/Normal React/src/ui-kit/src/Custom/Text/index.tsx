import { Colors, FontWeights, Sizes } from 'ui-kit/src/Common/Types';
import React, { HTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import { ITheme } from 'ui-kit/src/Theme';

export type TextProps = HTMLAttributes<any> & {
	as?: 'p' | 'li' | 'div';
	textColor?: Colors;
	backgroundColor?: Colors;
	size?: Sizes;
	weight?: FontWeights;
	alignCenter?: boolean;
};

export type WrapperProps = {
	theme: ITheme;
	textColor: Colors;
	backgroundColor: Colors;
	size: Sizes;
	weight: FontWeights;
	alignCenter?: boolean;
};

export const ColorCSS = css`
	color: ${({ theme, textColor }: WrapperProps) => theme.colors[textColor]};
	background-color: ${({ theme, backgroundColor }: WrapperProps) => theme.colors[backgroundColor]};
`;

const Wrapper = styled.p`
	font-size: ${({ theme, size }: WrapperProps) => theme.typography.texts.sizes[size]};
	font-weight: ${({ theme, weight }: WrapperProps) => theme.typography.fontWeights[weight]};
	text-align: ${({ alignCenter }: WrapperProps) => (alignCenter ? 'center' : 'start')};
	${ColorCSS}
`;

const Text = ({
	children,
	as = 'p',
	size = 'medium',
	weight = 'normal',
	textColor = 'text',
	backgroundColor = 'transparent',
	alignCenter = false,
	title,
	...rest
}: TextProps) => {
	return (
		<Wrapper
			as={as}
			size={size}
			weight={weight}
			textColor={textColor}
			backgroundColor={backgroundColor}
			alignCenter={alignCenter}
			title={title}
			{...rest}
		>
			{children}
		</Wrapper>
	);
};

export default Text;
