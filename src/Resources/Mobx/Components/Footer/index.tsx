import Logo from 'Components/Navbar/Logo';
import { LazyLoader, Text } from 'ui-kit/src/Custom';
import React from 'react';
import styled from 'styled-components';
import { ITheme } from 'ui-kit/src/Theme';
import FooterLinks from './FooterLinks';

const LazyLoadWrapper = styled.footer`
	width: 100%;
	height: 250px;
`;

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	background: ${({ theme }: { theme: ITheme }) => theme.colors.navbarBackgorund};
	z-index: ${({ theme }: { theme: ITheme }) => theme.zIndex.navbarZ};
	box-shadow: 0 1px 11px rgba(0, 0, 0, 0.75);
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
`;

const LinksWrapper = styled.div`
	height: 100%;
	justify-content: space-evenly;
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
`;

const LogoWrapper = styled(Logo)`
	height: fit-content;
	margin-top: 50px;
	margin-right: 20px;
`;

// this is the footer component as well as an example of how to use the lazyloader for normal components
const Footer = () => {
	return (
		<LazyLoadWrapper>
			<LazyLoader threshold={-150}>
				<Wrapper>
					<LinksWrapper>
						<FooterLinks />
					</LinksWrapper>
					<Text textColor='white'>ADD FOOTER STUFF HERE</Text>
					<LogoWrapper />
				</Wrapper>
			</LazyLoader>
		</LazyLoadWrapper>
	);
};

export default Footer;
