import React from 'react';
import styled from 'styled-components';
import { ITheme } from 'ui-kit/src/Theme';

type ComponentProps = {
	theme: ITheme;
};

const TextWrapper = styled.div<ComponentProps>`
	font-size: ${({ theme }: ComponentProps) => theme.typography.headers.sizes.xSmall};
	color: ${({ theme }: ComponentProps) => theme.colors.navbarLink};
	text-transform: uppercase;
	font-weight: ${({ theme }: ComponentProps) => theme.typography.fontWeights.bold};
	margin: 0 11px;
	transition: all 150ms linear 0s;
	letter-spacing: 1px;
	cursor: pointer;

	&:hover {
		color: ${({ theme }: ComponentProps) => theme.colors.navbarLinkHighlight};
	}
`;

const NavLink = ({ children, ...rest }: { children?: any }) => {
	return <TextWrapper {...rest}>{children}</TextWrapper>;
};

export default NavLink;
