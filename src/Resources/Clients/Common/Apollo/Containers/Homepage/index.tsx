import { useMutation } from '@apollo/client';
import { alertMessage, alertStrings, hideAfterTimeSec } from 'Common/AlertMessage';
import { LoginReturnValue, RegisterReturnValue } from 'Common/Types';
import { LoginModal, RegisterModal } from 'Components';
import { LOGIN, logout, REGISTER, setCurrentUser, useAuthQuery } from 'Logic/Auth';
import { closeModal, openModal } from 'Logic/Modal';
import { setBlockedUi } from 'Logic/UI';
import React from 'react';
import styled from 'styled-components';
import { Button, Headline, Text } from 'ui-kit/src/Custom';

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

const HomePage = () => {
	const currentUserState = useAuthQuery();
	const isLoggedIn = !!currentUserState;
	const [login] = useMutation(LOGIN);
	const [register] = useMutation(REGISTER);
	const ModalBody = (): JSX.Element => {
		return (
			<Wrapper>
				<LoginModal
					onSubmit={async (values): Promise<void> => {
						setBlockedUi(true);
						try {
							const data: LoginReturnValue = (await login({
								variables: { ...values },
							})) as LoginReturnValue;
							setCurrentUser(data.data.login);
							alertMessage.success(alertStrings.logInSuccess, { hideAfter: hideAfterTimeSec });
						} catch (err) {
							alertMessage.error(alertStrings.logInError, { hideAfter: hideAfterTimeSec });
						}
						closeModal();
						setBlockedUi(false);
					}}
				/>
				<StyledButton
					onClick={(): void =>
						openModal({
							component: (
								<RegisterModal
									onSubmit={async (values): Promise<void> => {
										setBlockedUi(true);
										try {
											const data: RegisterReturnValue = (await register({
												variables: { ...values },
											})) as RegisterReturnValue;
											setCurrentUser(data.data.register);
											alertMessage.success(alertStrings.logInSuccess, {
												hideAfter: hideAfterTimeSec,
											});
										} catch (err) {
											alertMessage.error(alertStrings.registerError, {
												hideAfter: hideAfterTimeSec,
											});
										}
										closeModal();
										setBlockedUi(false);
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
						logout();
					} else {
						openModal({
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
};

export default HomePage;
