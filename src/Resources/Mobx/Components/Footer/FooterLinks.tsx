import { ROUTES } from 'Common/RoutesNames';
import NavLink from 'Components/NavLink';
import { Link } from 'Components/UI-KIT/Custom';
import React from 'react';
import styled from 'styled-components';
import { ITheme } from 'Theme';

const routesArray = Object.values(ROUTES).filter((r) => r !== ROUTES.HOME);

const Wrapper = styled.div`
	width: fit-content;
	height: 40px;
	margin-bottom: 15px;
	@media (min-width: ${({ theme }: { theme: ITheme }) => theme.mediaSizes.desktopMinSize}) {
		display: flex;
		align-items: center;
		margin-bottom: 0;
	}
`;

const FooterLinks = ({ onClick }: { onClick?: () => any }) => {
	return (
		<>
			{routesArray.map(({ path, name }: { path: string; name: string }) => {
				return (
					<Wrapper key={name}>
						<Link path={path} onClick={onClick}>
							<NavLink>{name}</NavLink>
						</Link>
					</Wrapper>
				);
			})}
		</>
	);
};

export default FooterLinks;
