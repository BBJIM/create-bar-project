import { ROUTES } from 'Common/RoutesNames';
import { getMaxMobileSize, getMinDesktopSize } from 'Common/Utils';
import { Link } from 'Components';
import NavLink from 'Components/NavLink';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import { Theme } from 'ui-kit/src/Theme';

const routesArray = Object.values(ROUTES).filter((r) => r !== ROUTES.HOME);

const Wrapper = styled.div`
	width: 90px;
	min-width: fit-content;
	margin-bottom: 15px;
	@media (min-width: ${getMinDesktopSize}) {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		margin-bottom: 0;
		background-color: ${({ theme, selected }: { theme: Theme; selected: boolean }): string =>
			selected ? theme.colors.navbarSelectedLink : 'inherit'};
	}
`;

const TextWrapper = styled(NavLink)`
	@media (max-width: ${getMaxMobileSize}) {
		color: ${({ theme, selected }: { theme: Theme; selected: boolean }): string =>
			selected ? theme.colors.navbarLinkHighlight : theme.colors.navbarLink};
		border-color: ${({ theme, selected }: { theme: Theme; selected: boolean }): string =>
			selected ? theme.colors.navbarLinkHighlight : theme.colors.navbarLink};
	}
`;

const NavLinks = ({ onClick }: { onClick?: () => any }): JSX.Element => {
	const { pathname } = useRouter();
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
