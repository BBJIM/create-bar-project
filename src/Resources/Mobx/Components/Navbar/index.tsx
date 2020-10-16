import { Desktop, Mobile } from 'ui-kit/src/Custom/Responsive';
import React from 'react';
import { animated } from 'react-spring';
import styled from 'styled-components';
import { Theme } from 'ui-kit/src/Theme';
import BurgerMenuIcon from './BurgerMenuIcon';
import CollapseMenu from './CollapseMenu';
import Logo from './Logo';
import NavLinks from './NavLinks';

const NavBar = styled(animated.nav)`
	position: fixed;
	width: 100%;
	top: 0;
	left: 0;
	background: ${({ theme }: { theme: Theme }): string => theme.colors.navbarBackgorund};
	z-index: ${({ theme }: { theme: Theme }): number => theme.zIndex.navbarZ};
	box-shadow: 0 1px 11px ${({ theme }: { theme: Theme }): string => theme.colors.dimmer};
`;

const FlexContainer = styled.div`
	display: flex;
	margin: auto;
	padding: 0 20px;
	justify-content: space-between;
	height: ${({ theme }: { theme: Theme }): string => theme.navbar.height};
`;

const NavLinksWrapper = styled.div`
	margin: auto 0;
	display: flex;
	align-items: center;
	height: 100%;
	max-width: 94%;
	overflow: auto;
`;

const BurgerWrapper = styled.div`
	margin: auto 0;
`;

type Props = { openOrCloseSidebar: () => any; navbarState?: boolean };

const Navbar = ({ openOrCloseSidebar, navbarState }: Props): JSX.Element => {
	// THIS IS A NICE ANIMATION FOR NAVBAR
	// const barAnimation = useSpring({
	// 	from: { transform: 'translate3d(0, -900px, 0)' },
	// 	transform: 'translate3d(0, 0, 0)',
	// });

	const logoOnClick = (): void => {
		if (navbarState) {
			openOrCloseSidebar();
		}
	};

	return (
		<>
			{/* <NavBar style={barAnimation}> */}
			<NavBar>
				<FlexContainer>
					<Desktop>
						<NavLinksWrapper>
							<NavLinks />
						</NavLinksWrapper>
					</Desktop>
					<Mobile>
						<BurgerWrapper>
							<BurgerMenuIcon isOpen={navbarState} onClick={openOrCloseSidebar} />
						</BurgerWrapper>
					</Mobile>
					<Logo onClick={logoOnClick} />
				</FlexContainer>
			</NavBar>
			<Mobile>
				<CollapseMenu isOpen={navbarState} onClick={openOrCloseSidebar} />
			</Mobile>
		</>
	);
};

export default Navbar;
