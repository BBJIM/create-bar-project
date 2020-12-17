import { ROUTES } from 'Common/RoutesNames';
import { Link } from 'Components';
import React from 'react';
import styled from 'styled-components';
import { Img } from 'ui-kit/src/Custom';

const Image = styled(Img)`
	width: 100%;
	margin: auto 0;
`;

const Wrapper = styled.div`
	height: 100%;
	width: 50px;
	display: flex;
	user-select: none;
	transition: transform 0.8s;
	transform-style: preserve-3d;

	:focus :active {
		outline: none;
		box-shadow: none;
	}

	:hover {
		transform: rotateY(180deg);
	}
`;

type Props = { onClick?: () => any; link?: boolean };

const Logo = ({ onClick, link = true, ...rest }: Props): JSX.Element => {
	return link ? (
		<Link path={ROUTES.HOME.path} onClick={onClick} {...rest}>
			<Wrapper>
				<Image src='logo192' alt='Logo' lazy={false} />
			</Wrapper>
		</Link>
	) : (
		<Wrapper onClick={onClick} {...rest}>
			<Image src='logo192' alt='Logo' />
		</Wrapper>
	);
};

export default Logo;
