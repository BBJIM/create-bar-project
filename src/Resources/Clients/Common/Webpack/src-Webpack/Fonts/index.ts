import { createGlobalStyle, css } from 'styled-components';
import { typography } from 'ui-kit/src/Theme/GlobalStyles';

const fontGlobalCSS = css`
	@font-face {
		font-family: 'Rubik';
		src: local('Rubik'), local('Rubik'), url('/fonts/RubikRegular.woff2') format('woff2'),
			url('/fonts/RubikRegular.woff') format('woff'), url(${'/fonts/RubikRegular.ttf'}) format('truetype');
		font-weight: ${typography.fontWeights.normal};
		font-display: swap;
	}
	@font-face {
		font-family: 'Rubik';
		src: local('Rubik'), local('Rubik'), url('/fonts/RubikBold.woff2') format('woff2'),
			url('/fonts/RubikBold.woff') format('woff'), url('/fonts/RubikBold.ttf') format('truetype');
		font-weight: ${typography.fontWeights.bold};
		font-display: swap;
	}
`;

export default createGlobalStyle`
   ${fontGlobalCSS}
`;
