import { directions } from 'Common/GeneralConsts';
import { MODAL_STORE, UI_STORE } from 'Common/StoreNames';
import { isNullOrUndefiend } from 'Common/Utils';
import { Footer, Navbar } from 'Components';
import { LoadingScreen, Modal } from 'Components/UI-KIT';
import GlobalFonts from 'Fonts';
import { ModalStore, UiStore } from 'Logic/Stores';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { Swipeable } from 'react-swipeable';
import styled, { ThemeProvider } from 'styled-components';
import { defaultTheme, ITheme } from 'Theme';
import GlobalStyles from 'Theme/GlobalStyles';

const SwipeableWrapper = styled(Swipeable)``;

const NavbarFiller = styled.div`
	width: 100%;
	height: ${({ theme }: { theme: ITheme }) => theme.navbar.height};
`;

const ChildrenWrapper = styled.div`
	min-height: 100vh;
`;

const Layout = ({ children }: { children?: any }) => <LayoutComponent>{children}</LayoutComponent>;

type Props = { children?: any; uiStore?: UiStore; modalStore?: ModalStore };

const LayoutComponent = inject(
	UI_STORE,
	MODAL_STORE,
)(
	observer(({ children, uiStore, modalStore }: Props) => {
		const openOrCloseSidebar = () => {
			uiStore?.setSidebarOpen(!uiStore?.getSideBarOpen);
		};

		const direction = window.getComputedStyle(document.body).direction;
		const swipeLeft = () => {
			uiStore?.setSidebarOpen(direction !== directions.ltr);
		};
		const swipeRight = () => {
			uiStore?.setSidebarOpen(direction === directions.ltr);
		};

		return (
			<ThemeProvider theme={uiStore?.theme || defaultTheme}>
				<GlobalStyles />
				<GlobalFonts />
				<LoadingScreen active={uiStore?.getBlockedUi} />
				<SwipeableWrapper onSwipedLeft={swipeLeft} onSwipedRight={swipeRight}>
					<Navbar navbarState={uiStore?.getSideBarOpen} openOrCloseSidebar={openOrCloseSidebar} />
					<NavbarFiller />
					<ChildrenWrapper>{children}</ChildrenWrapper>
					<Footer />
				</SwipeableWrapper>
				<Modal
					closeModal={modalStore?.closeModal}
					component={modalStore?.lastModalItem?.component}
					header={modalStore?.lastModalItem?.header}
					isActive={modalStore?.isOpen && isNullOrUndefiend(modalStore?.lastModalItem)}
					isBackIconActive={modalStore && modalStore.length > 1}
					popModal={modalStore?.popModal}
					titleComponent={modalStore?.lastModalItem?.titleComponent}
				/>
			</ThemeProvider>
		);
	}),
);

export default Layout;