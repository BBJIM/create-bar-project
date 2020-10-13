import { ROUTES } from 'Common/RoutesNames';
import NavLink from 'Components/NavLink';
import { Link } from 'ui-kit/src/Custom';
import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { ITheme } from 'ui-kit/src/Theme';

const routesArray = Object.values(ROUTES).filter((r) => r !== ROUTES.HOME);

const Wrapper = styled.div`
	width: 90px;
	min-width: fit-content;
	margin-bottom: 15px;
	@media (min-width: ${({ theme }: { theme: ITheme }) => theme.mediaSizes.desktopMinSize}) {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		margin-bottom: 0;
		background-color: ${({ theme, selected }: { theme: ITheme; selected: boolean }) =>
			selected ? theme.colors.navbarSelectedLink : 'inherit'};
	}
`;

const TextWrapper = styled(NavLink)`
	@media (max-width: ${({ theme }: { theme: ITheme }) => theme.mediaSizes.mobileMaxSize}) {
		color: ${({ theme, selected }: { theme: ITheme; selected: boolean }) =>
			selected ? theme.colors.navbarLinkHighlight : theme.colors.navbarLink};
		border-color: ${({ theme, selected }: { theme: ITheme; selected: boolean }) =>
			selected ? theme.colors.navbarLinkHighlight : theme.colors.navbarLink};
	}
`;

const NavLinks = ({ onClick }: { onClick?: () => any }) => {
	const { pathname } = useLocation();
	return (
		<>
			{routesArray.map(({ path, name }: { path: string; name: string }) => {
				const selected = path === pathname;
				return (
					<Wrapper key={name} selected={selected}>
						<Link path={path} onClick={onClick}>
							<TextWrapper selected={selected}>{name}</TextWrapper>
						</Link>
					</Wrapper>
				);
			})}
		</>
	);
};

export default NavLinks;
