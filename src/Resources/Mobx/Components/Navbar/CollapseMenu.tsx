import { directions } from 'Common/GeneralConsts';
import { Dimmer } from 'ui-kit/src/Custom';
import React from 'react';
import { animated, useSpring } from 'react-spring';
import styled from 'styled-components';
import { Theme } from 'ui-kit/src/Theme';
import { zIndex } from 'ui-kit/src/Theme/GlobalStyles';
import NavLinks from './NavLinks';

const CollapseWrapper = styled(animated.div)`
	width: 250px;
	height: 100%;
	background: ${({ theme }: { theme: Theme }): string => theme.colors.navbarBackgorund};
	position: fixed;
	top: ${({ theme }: { theme: Theme }): string => theme.navbar.height};
	padding: 24px 12px;
	display: flex;
	flex-direction: column;
	max-height: 100%;
	overflow: auto;
	z-index: ${({ theme }: { theme: Theme }): number => theme.zIndex.modalZ};
	border-top: 1px solid ${({ theme }: { theme: Theme }): string => theme.colors.primary};
`;

const CollapseMenu = ({ onClick, isOpen }: { onClick: () => any; isOpen?: boolean }): JSX.Element => {
	const direction = window.getComputedStyle(document.body).direction;
	// if you are using a RTL website there could be a problem here at the start of the application
	// you can change it to default settings or find nother solution this happends because the
	// deafult direction is LTR
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
