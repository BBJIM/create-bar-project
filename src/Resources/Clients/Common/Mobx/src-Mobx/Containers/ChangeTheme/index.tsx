import { UI_STORE } from 'Common/StoreNames';
import { themeKey, themeKeysArr } from 'ui-kit/src/Common/Themes';
import { Button, Headline } from 'ui-kit/src/Custom';
import { UiStore } from 'Logic/Stores';
import { inject, observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	padding: 50px;
`;

const ButtonsWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	max-width: 600px;
	margin: 20px auto;
`;

const ThemeButton = styled(Button)`
	margin: 10px;
`;

const Header = styled(Headline)`
	margin: 20px auto 0;
	width: fit-content;
	@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
		display: table;
	}
`;

const ChangeTheme = (): JSX.Element => <ChangeThemeComponent />;

const ChangeThemeComponent = inject(UI_STORE)(
	observer(({ uiStore }: { uiStore?: UiStore }) => {
		return (
			<Wrapper>
				<Header>HERE YOU CAN CHANGE THE THEME OF THE SITE</Header>
				<ButtonsWrapper>
					{themeKeysArr.map((theme: themeKey) => (
						<ThemeButton
							key={theme}
							onClick={(): void => uiStore?.setThemeByName(theme)}
							backgroundColor='yellow'
							round
						>
							{theme}
						</ThemeButton>
					))}
				</ButtonsWrapper>
			</Wrapper>
		);
	}),
);

export default ChangeTheme;
