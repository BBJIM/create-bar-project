import { createGlobalStyle, css } from 'styled-components';
import { ITheme } from 'ui-kit/src/Theme';

export const typography = {
	headers: {
		sizes: { xLarge: '80px', large: '60px', medium: '34px', small: '24px', xSmall: '18px' },
	},
	texts: {
		sizes: { xLarge: '30px', large: '24px', medium: '18px', small: '13px', xSmall: '10px' },
	},
	fontWeights: { light: 300, normal: 'normal', bold: 'bold' },
};

export const zIndex = {
	sidebarDimmerZ: 1000,
	navbarZ: 1001,
	modalDimmerZ: 1002,
	modalZ: 1003,
	loadingDimmerZ: 1004,
	loadingZ: 1005,
};

export const navbar = {
	height: '60px',
};

export const modal = {
	mobileWidth: '95vw',
	mobileHeight: '440px',
	desktopWidth: '650px',
	desktopHeight: '600px',
	desktopMinWidth: '700px',
};

export const mediaSizes = {
	desktopMinSize: '1025px',
	mobileMaxSize: '1024px',
	desktopMinSizeNumber: 1025,
	mobileMaxSizeNumber: 1024,
};

const globalCSS = css`
	html {
		/* direction: rtl; */
	}
	body {
		margin: 0;
		padding: 0;
		font-family: 'Roboto', Arial, Helvetica, sans-serif;
		font-size: ${typography.texts.sizes.medium};
		font-style: normal;
		color: ${({ theme }: { theme: ITheme }) => theme.colors.text};
		background-color: ${({ theme }: { theme: ITheme }) => theme.colors.backgorund};
	}

	#root {
		margin: 0;
		padding: 0;
	}

	*,
	*::after,
	*::before {
		box-sizing: border-box;
		margin-block-start: 0;
		margin-block-end: 0;
		margin-inline-start: 0;
		margin-inline-end: 0;
		-webkit-tap-highlight-color: transparent;
	}

	a {
		text-decoration: none;
		color: inherit;
	}
`;

export default createGlobalStyle`
	${globalCSS}
`;
