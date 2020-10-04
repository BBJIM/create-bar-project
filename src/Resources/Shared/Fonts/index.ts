import RobotoBlackTTF from 'Fonts/RobotoBlack.ttf';
import RobotoBlackWOFF from 'Fonts/RobotoBlack.woff';
import RobotoBlackWOFF2 from 'Fonts/RobotoBlack.woff2';
import RobotoBoldTTF from 'Fonts/RobotoBold.ttf';
import RobotoBoldWOFF from 'Fonts/RobotoBold.woff';
import RobotoBoldWOFF2 from 'Fonts/RobotoBold.woff2';
import { createGlobalStyle, css } from 'styled-components';
import { typography } from 'Theme/GlobalStyles';

const fontGlobalCSS = css`
	@font-face {
		font-family: 'Roboto';
		src: local('Roboto'), local('Roboto'), url(${RobotoBlackWOFF2}) format('woff2'),
			url(${RobotoBlackWOFF}) format('woff'), url(${RobotoBlackTTF}) format('truetype');
		font-weight: ${typography.fontWeights.normal};
		font-display: swap;
	}
	@font-face {
		font-family: 'Roboto';
		src: local('Roboto'), local('Roboto'), url(${RobotoBoldWOFF2}) format('woff2'),
			url(${RobotoBoldWOFF}) format('woff'), url(${RobotoBoldTTF}) format('truetype');
		font-weight: ${typography.fontWeights.bold};
		font-display: swap;
	}
`;

export default createGlobalStyle`
   ${fontGlobalCSS}
    
`;
