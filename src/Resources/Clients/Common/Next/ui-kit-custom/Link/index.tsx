import React, { AnchorHTMLAttributes } from 'react';
import styled from 'styled-components';
import NextLink from 'next/link';

type LinkProps = AnchorHTMLAttributes<any> & {
	path: string;
	as?: string;
};

const Wrapper = styled.div``;

const Link = ({ children, path, onClick, target, as, ...rest }: LinkProps): JSX.Element => (
	<Wrapper {...rest}>
		<NextLink href={path} as={as}>
			<a onClick={onClick} target={target}>
				{children}
			</a>
		</NextLink>
	</Wrapper>
);

export default Link;
