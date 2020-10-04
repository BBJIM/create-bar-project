import { directions } from 'Common/GeneralConsts';
import { Dimmer } from 'Components/UI-KIT/Custom';
import React from 'react';
import { animated, useSpring } from 'react-spring';
import styled from 'styled-components';
import { ITheme } from 'Theme';
import { zIndex } from 'Theme/GlobalStyles';
import NavLinks from './NavLinks';

const CollapseWrapper = styled(animated.div)`
	width: 250px;
	height: 100%;
	background: ${({ theme }: { theme: ITheme }) => theme.colors.navbarBackgorund};
	position: fixed;
	top: ${({ theme }: { theme: ITheme }) => theme.navbar.height};
	padding: 24px 12px;
	display: flex;
	flex-direction: column;
	max-height: 100%;
	overflow: auto;
	z-index: ${({ theme }: { theme: ITheme }) => theme.zIndex.modalZ};
	border-top: 1px solid ${({ theme }: { theme: ITheme }) => theme.colors.primary};
`;

const CollapseMenu = ({ onClick, isOpen }: { onClick: () => any; isOpen?: boolean }) => {
	const direction = window.getComputedStyle(document.body).direction;
	const style = useSpring({
		transform: isOpen ? `translateX(0)` : `translateX(${direction === directions.ltr ? '-100%' : '100%'})`,
	});

	return (
		<>
			{isOpen && <Dimmer zIndex={zIndex.sidebarDimmerZ} onClick={onClick} />}
			<CollapseWrapper style={style}>
				<NavLinks onClick={onClick} />
			</CollapseWrapper>
		</>
	);
};

export default CollapseMenu;
