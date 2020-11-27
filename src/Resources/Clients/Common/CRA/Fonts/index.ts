import RubikRegularTTF from 'Fonts/RubikRegular.ttf';
import RubikRegularWOFF from 'Fonts/RubikRegular.woff';
import RubikRegularWOFF2 from 'Fonts/RubikRegular.woff2';
import RubikBoldTTF from 'Fonts/RubikBold.ttf';
import RubikBoldWOFF from 'Fonts/RubikBold.woff';
import RubikBoldWOFF2 from 'Fonts/RubikBold.woff2';
import { createGlobalStyle, css } from 'styled-components';
import { typography } from 'ui-kit/src/Theme/GlobalStyles';

const fontGlobalCSS = css`
	@font-face {
		font-family: 'Rubik';
		src: local('Rubik'), local('Rubik'), url(${RubikRegularWOFF2}) format('woff2'),
			url(${RubikRegularWOFF}) format('woff'), url(${RubikRegularTTF}) format('truetype');
		font-weight: ${typography.fontWeights.normal};
		font-display: swap;
	}
	@font-face {
		font-family: 'Rubik';
		src: local('Rubik'), local('Rubik'), url(${RubikBoldWOFF2}) format('woff2'),
			url(${RubikBoldWOFF}) format('woff'), url(${RubikBoldTTF}) format('truetype');
		font-weight: ${typography.fontWeights.bold};
		font-display: swap;
	}
`;

export default createGlobalStyle`
   ${fontGlobalCSS}
    
`;
