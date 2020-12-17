import { ROUTES } from 'Common/RoutesNames';
import { ButtonLink } from 'Components';
import React from 'react';
import styled from 'styled-components';
import { Headline, Text } from 'ui-kit/src/Custom';

const Wrapper = styled.div`
	text-align: center;
	margin-top: 40px;
`;

const Header = styled(Headline)`
	margin-bottom: 30px;
	text-align: center;
`;

const StyledText = styled(Text)`
	margin-bottom: 30px;
	text-align: center;
`;

const CenteredButton = styled(ButtonLink)`
	margin: auto;
`;

const NotFound = (): JSX.Element => (
	<Wrapper>
		<Header size='xLarge' weight='bold'>
			404
		</Header>
		<Header size='large' weight='bold'>
			Ooops!!
		</Header>
		<StyledText size='xLarge'>THIS PAGE DOESN&apos;T EXIST OR IS UNAVAILABLE.</StyledText>
		<CenteredButton path={ROUTES.HOME.path}>Go Back to Home</CenteredButton>
	</Wrapper>
);

export default NotFound;
