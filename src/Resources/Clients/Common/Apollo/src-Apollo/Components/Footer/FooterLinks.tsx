import { ROUTES } from 'Common/RoutesNames';
import NavLink from 'Components/NavLink';
import { Link } from 'ui-kit/src/Custom';
import React from 'react';
import styled from 'styled-components';
import { Theme } from 'ui-kit/src/Theme';

const routesArray = Object.values(ROUTES).filter((r) => r !== ROUTES.HOME);

const Wrapper = styled.div`
	width: fit-content;
	height: 40px;
	margin-bottom: 15px;
	@media (min-width: ${({ theme }: { theme: Theme }): string => theme.mediaSizes.desktopMinSize}) {
		display: flex;
		align-items: center;
		margin-bottom: 0;
	}
`;

const FooterLinks = ({ onClick }: { onClick?: () => any }): JSX.Element => {
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
