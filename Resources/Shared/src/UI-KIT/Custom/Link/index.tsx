import React, { AnchorHTMLAttributes } from 'react';
import { HashLink } from 'react-router-hash-link';
import styled from 'styled-components';

type LinkProps = AnchorHTMLAttributes<any> & {
	path: string;
};

const Wrapper = styled.div``;

const Link = ({ children, path, onClick, target, ...rest }: LinkProps) => (
	<Wrapper {...rest}>
		<HashLink to={path} onClick={onClick} target={target}>
			{children}
		</HashLink>
	</Wrapper>
);

export default Link;
