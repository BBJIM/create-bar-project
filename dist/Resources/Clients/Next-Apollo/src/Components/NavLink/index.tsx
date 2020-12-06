import React from 'react';
import styled from 'styled-components';
import { Theme } from 'ui-kit/src/Theme';

type ComponentProps = {
	theme: Theme;
};

const TextWrapper = styled.div<ComponentProps>`
	font-size: ${({ theme }: ComponentProps): string => theme.typography.headers.sizes.xSmall};
	color: ${({ theme }: ComponentProps): string => theme.colors.navbarLink};
	text-transform: uppercase;
	font-weight: ${({ theme }: ComponentProps): string => theme.typography.fontWeights.bold};
	margin: 0 11px;
	transition: all 150ms linear 0s;
	letter-spacing: 1px;
	cursor: pointer;

	&:hover {
		color: ${({ theme }: ComponentProps): string => theme.colors.navbarLinkHighlight};
	}
`;

const NavLink = ({ children, ...rest }: { children?: any }): JSX.Element => {
	return <TextWrapper {...rest}>{children}</TextWrapper>;
};

export default NavLink;
