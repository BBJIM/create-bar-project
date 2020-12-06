import { BackIcon, Dimmer, ExitIcon, Headline } from 'ui-kit/src/Custom';
import React from 'react';
import styled, { css } from 'styled-components';
import { Theme } from 'ui-kit/src/Theme';
import { zIndex } from 'ui-kit/src/Theme/GlobalStyles';

type ComponentProps = {
	theme: Theme;
	active?: boolean;
};

const Wrapper = styled.div<ComponentProps>`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	transition: ${({ active }: ComponentProps): string => (active ? 'all 0.2s' : 'all 0s')};
	opacity: ${({ active }: ComponentProps): string => (active ? '1' : '0')};
	visibility: ${({ active }: ComponentProps): string => (active ? 'visible' : 'hidden')};
	width: ${({ theme }: ComponentProps): string => theme.modal.mobileWidth};
	height: ${({ theme }: ComponentProps): string => theme.modal.mobileHeight};
	z-index: ${({ theme }: ComponentProps): number => theme.zIndex.modalZ};
	padding: 5px 0;
	border-radius: 15px;
	border: 1px solid rgba(0, 0, 0, 0.3);
	box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
	background-color: ${({ theme }: ComponentProps): string => theme.colors.white};
	@media (min-width: ${({ theme }: ComponentProps): string => theme.modal.desktopMinWidth}) {
		width: ${({ theme }: ComponentProps): string => theme.modal.desktopWidth};
		height: ${({ theme }: ComponentProps): string => theme.modal.desktopHeight};
	}
`;

const HeaderWrapper = styled.div`
	border-bottom: 1px solid ${({ theme }: { theme: Theme }): string => theme.colors.gray};
	padding-bottom: 10px;
`;

const IconSharedCSS = css`
	position: absolute;
	cursor: pointer;
	opacity: 0.7;
`;

const ExitButton = styled(ExitIcon)`
	top: 20px;
	right: 20px;
	${IconSharedCSS}
`;

const BackButton = styled(BackIcon)`
	top: 20px;
	left: 20px;
	${IconSharedCSS}
`;

const Header = styled(Headline)`
	margin: 10px auto 0;
	width: fit-content;
	max-width: 70%;
	text-align: center;
	overflow: hidden;
	text-overflow: ellipsis;
`;

const ModalDimmer = styled(Dimmer)<ComponentProps>`
	transition: ${({ active }: ComponentProps): string => (active ? 'all 0.2s' : 'all 0s')};
	opacity: ${({ active }: ComponentProps): string => (active ? '1' : '0')};
	visibility: ${({ active }: ComponentProps): string => (active ? 'visible' : 'hidden')};
`;

type Props = {
	isActive?: boolean;
	isBackIconActive?: boolean;
	titleComponent?: any;
	header?: string;
	component?: any;
	closeModal?: () => any;
	popModal?: () => any;
};

const Modal = ({
	isActive,
	isBackIconActive,
	titleComponent,
	header,
	component,
	closeModal,
	popModal,
}: Props): JSX.Element => {
	return (
		<>
			<ModalDimmer active={isActive} zIndex={zIndex.modalDimmerZ} onClick={closeModal} />
			<Wrapper active={isActive}>
				<HeaderWrapper>
					{isBackIconActive && <BackButton size='20px' onClick={popModal} />}
					{titleComponent ? (
						titleComponent
					) : (
						<Header size='small' weight='bold' textColor='primary' backgroundColor='white'>
							{header}
						</Header>
					)}
					<ExitButton size='20px' onClick={closeModal} />
				</HeaderWrapper>
				{component}
			</Wrapper>
		</>
	);
};

export default Modal;
