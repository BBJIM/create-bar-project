import { AUTH_STORE, MODAL_STORE, UI_STORE } from 'Common/StoreNames';
import { LoginModal, RegisterModal } from 'Components';
import { Button, Headline, Text } from 'ui-kit/src/Custom';
import { AuthStore, ModalStore, UiStore } from 'Logic/Stores';
import { inject, observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	padding: 10px 25px 0;
	display: flex;
	flex-direction: column;
`;

// this is for the example
const Header = styled(Headline)`
	margin: 10px auto 0;
	width: fit-content;
	max-width: 70%;
	text-align: center;
	overflow: hidden;
	text-overflow: ellipsis;
`;

const StyledButton = styled(Button)`
	margin: 15px auto 0;
`;

const HomePage = (): JSX.Element => <HomePageComponent />;

type Props = { modalStore?: ModalStore; authStore?: AuthStore; uiStore?: UiStore };

const HomePageComponent = inject(
	MODAL_STORE,
	AUTH_STORE,
	UI_STORE,
)(
	observer(({ modalStore, authStore, uiStore }: Props) => {
		const isLoggedIn = authStore?.getCurrentUser;
		const ModalBody = (): JSX.Element => {
			return (
				<Wrapper>
					<LoginModal
						onSubmit={async (values): Promise<void> => {
							uiStore?.blockUI();
							await authStore?.logIn(values);
							modalStore?.closeModal();
							uiStore?.unBlockUI();
						}}
					/>
					<StyledButton
						onClick={(): void =>
							modalStore?.openModal({
								component: (
									<RegisterModal
										onSubmit={async (values): Promise<void> => {
											uiStore?.blockUI();
											await authStore?.register(values);
											modalStore?.closeModal();
											uiStore?.unBlockUI();
										}}
									/>
								),
								header: 'Register',
							})
						}
					>
						Register
					</StyledButton>
				</Wrapper>
			);
		};

		return (
			<Wrapper>
				<Text alignCenter>THIS IS THE HOMEPAGE</Text>
				<StyledButton
					onClick={(): void => {
						if (isLoggedIn) {
							authStore?.logout();
						} else {
							modalStore?.openModal({
								component: <ModalBody />,
								// example for custom header, although this is optional
								// and the example is just a copy of the default header
								titleComponent: (
									<Header size='small' weight='bold' textColor='black' backgroundColor='white'>
										Login
									</Header>
								),
							});
						}
					}}
				>
					{isLoggedIn ? 'Logout' : 'Login'}
				</StyledButton>
			</Wrapper>
		);
	}),
);

export default HomePage;
