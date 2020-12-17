import { ROUTES } from 'Common/RoutesNames';
import { getMinDesktopSize } from 'Common/Utils';
import NavLink from 'Components/NavLink';
import React from 'react';
import styled from 'styled-components';
import { Link } from 'ui-kit/src/Custom';

const routesArray = Object.values(ROUTES).filter((r) => r !== ROUTES.HOME);

const Wrapper = styled.div`
	width: fit-content;
	height: 40px;
	margin-bottom: 15px;
	@media (min-width: ${getMinDesktopSize}) {
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
