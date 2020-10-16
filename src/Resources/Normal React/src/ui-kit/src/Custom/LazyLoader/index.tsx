import React from 'react';
import { LazyLoadComponent, LazyLoadComponentProps } from 'react-lazy-load-image-component';
import Placeholder from '../Placeholder';

type Props = LazyLoadComponentProps & {
	children?: any;
	placeholder?: any;
};

const LazyLoader = ({ children, threshold = 300, placeholder = <Placeholder />, ...rest }: Props): JSX.Element => {
	return (
		<LazyLoadComponent threshold={threshold} placeholder={placeholder} {...rest}>
			{children}
		</LazyLoadComponent>
	);
};

export default LazyLoader;
