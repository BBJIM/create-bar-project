import React from 'react';
import styled, { css } from 'styled-components';
import { ITheme } from 'ui-kit/src/Theme';

type Props = { onClick: () => any; isOpen?: boolean };

const Wrapper = styled.div`
	position: relative;
	padding-top: 9px;
	cursor: pointer;
	display: block;
	user-select: none;

	:focus :active {
		outline: none;
		box-shadow: none;
	}
`;

const OpenCSS = css`
	span:nth-child(1) {
		transform: rotate(-45deg);
		top: 16px;
	}

	span:nth-child(2) {
		opacity: 0;
	}

	span:nth-child(3) {
		transform: rotate(45deg);
		top: -11px;
	}
`;

const LinesWrapper = styled.div<{ open?: boolean }>`
	${({ open }) => open && OpenCSS};
`;

const LineSpan = styled.span`
	background: ${({ theme }: { theme: ITheme }) => theme.colors.navbarLinkHighlight};
	display: block;
	position: relative;
	width: 40px;
	height: 5px;
	margin-bottom: 9px;
	transition: all ease-in-out 0.1s;
`;

const Burgermenu = ({ onClick, isOpen, ...rest }: Props) => {
	return (
		<Wrapper onClick={onClick} {...rest}>
			<LinesWrapper open={isOpen}>
				<LineSpan>&nbsp;</LineSpan>
				<LineSpan>&nbsp;</LineSpan>
				<LineSpan>&nbsp;</LineSpan>
			</LinesWrapper>
		</Wrapper>
	);
};

export default Burgermenu;
