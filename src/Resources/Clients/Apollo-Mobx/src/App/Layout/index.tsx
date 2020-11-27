import { useQuery } from '@apollo/client';
import { directions } from 'Common/GeneralConsts';
import { getDirection, isNullOrUndefined } from 'Common/Utils';
import { Footer, Navbar } from 'Components';
import GlobalFonts from 'Fonts';
import { closeModal, GET_MODAL_STATE, popFromModalStack } from 'Logic/Modal';
import { GET_UI_STATE, setSidebar } from 'Logic/UI';
import React from 'react';
import { Swipeable } from 'react-swipeable';
import styled, { ThemeProvider } from 'styled-components';
import { LoadingScreen, Modal } from 'ui-kit/src';
import { Theme } from 'ui-kit/src/Theme';
import GlobalStyles from 'ui-kit/src/Theme/GlobalStyles';

const SwipeableWrapper = styled(Swipeable)``;

const NavbarFiller = styled.div`
	width: 100%;
	height: ${({ theme }: { theme: Theme }): string => theme.navbar.height};
`;

const ChildrenWrapper = styled.div`
	min-height: 100vh;
`;

const Layout = ({ children }: { children?: any }): JSX.Element => <LayoutComponent>{children}</LayoutComponent>;

type Props = { children?: any };

const LayoutComponent = ({ children }: Props) => {
	// const { data, loading, error } = useQuery(GET_UI_STATE);
	const { data: uiData } = useQuery(GET_UI_STATE);
	const { data: modalData } = useQuery(GET_MODAL_STATE);
	const { themeState, blockedUiState, sidebarState } = uiData;
	const { modalState, modalStackState } = modalData;
	const lastModalItem = modalStackState[modalStackState.length - 1];

	// if (loading) return <div>loading...</div>;
	// if (error) return <p>ERROR: {error.message}</p>;

	const openOrCloseSidebar = (): void => {
		setSidebar(!sidebarState);
	};

	const direction = getDirection();
	const swipeLeft = (): void => {
		setSidebar(direction !== directions.ltr);
	};
	const swipeRight = (): void => {
		setSidebar(direction === directions.ltr);
	};

	return (
		<ThemeProvider theme={themeState}>
			<GlobalStyles />
			<GlobalFonts />
			<LoadingScreen active={blockedUiState} />
			<SwipeableWrapper onSwipedLeft={swipeLeft} onSwipedRight={swipeRight}>
				<Navbar navbarState={sidebarState} openOrCloseSidebar={openOrCloseSidebar} />
				<NavbarFiller />
				<ChildrenWrapper>{children}</ChildrenWrapper>
				<Footer />
			</SwipeableWrapper>
			<Modal
				closeModal={closeModal}
				component={lastModalItem?.component}
				header={lastModalItem?.header}
				isActive={modalState && !isNullOrUndefined(lastModalItem)}
				isBackIconActive={modalStackState.length > 1}
				popModal={popFromModalStack}
				titleComponent={lastModalItem?.titleComponent}
			/>
		</ThemeProvider>
	);
};

export default Layout;
