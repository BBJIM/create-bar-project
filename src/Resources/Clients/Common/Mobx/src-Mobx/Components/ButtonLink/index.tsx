import React from 'react';
import styled from 'styled-components';
import {
	ButtonChildrenWrapper,
	ButtonComponentProps,
	ButtonStyle,
	ButtonStyledComponentProps,
} from 'ui-kit/src/Custom/Button';
import Link from '../Link';

type LinkButtonComponentProps = ButtonComponentProps & {
	path: string;
};

const LinkButtonComponent = styled(Link)<ButtonStyledComponentProps>`
	${ButtonStyle}
	width: fit-content;
`;

const ButtonLink = ({
	children,
	onClick,
	textColor = 'white',
	backgroundColor = 'primary',
	borderColor,
	size = 'medium',
	round = false,
	disabled = false,
	path,
	...rest
}: LinkButtonComponentProps): JSX.Element => {
	const realBorderColor = borderColor ? borderColor : backgroundColor;
	return (
		<LinkButtonComponent
			path={path}
			onClick={onClick}
			textColor={textColor}
			backgroundColor={backgroundColor}
			borderColor={realBorderColor}
			size={size}
			round={round}
			disabled={disabled}
			{...rest}
		>
			<ButtonChildrenWrapper>{children}</ButtonChildrenWrapper>
		</LinkButtonComponent>
	);
};

export default ButtonLink;
