import React from 'react';
import styled from 'styled-components';
import { ColorCSS, TextProps, WrapperProps } from '../Text';

const HeadlineWrapper = styled.h1`
	font-size: ${({ theme, size }: WrapperProps) => theme.typography.headers.sizes[size]};
	font-weight: ${({ theme, weight }: WrapperProps) => theme.typography.fontWeights[weight]};
	text-align: ${({ alignCenter }: WrapperProps) => (alignCenter ? 'center' : 'start')};
	${ColorCSS}
`;

const Headline = ({
	children,
	size = 'medium',
	weight = 'normal',
	textColor = 'text',
	backgroundColor = 'transparent',
	alignCenter = false,
	...rest
}: TextProps) => {
	return (
		<HeadlineWrapper size={size} weight={weight} textColor={textColor} backgroundColor={backgroundColor} {...rest}>
			{children}
		</HeadlineWrapper>
	);
};

export default Headline;
