import React from 'react';
import styled from 'styled-components';
import { ITheme } from 'ui-kit/src/Theme';

type Props = { children?: any; zIndex: number; onClick?: () => any };

const DimmerComponent = styled.div`
	z-index: ${({ zIndex }: { zIndex: number }) => zIndex};
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	/* height: 100%; */
	height: 200%; /** this is for mobile browser default navbar */
	background: ${({ theme }: { theme: ITheme }) => theme.colors.dimmer};
`;

const Dimmer = ({ children, zIndex, onClick, ...rest }: Props) => (
	<DimmerComponent zIndex={zIndex} onClick={onClick} {...rest}>
		{children}
	</DimmerComponent>
);

export default Dimmer;
