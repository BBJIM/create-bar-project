import React from 'react';
import { FaChevronCircleLeft } from 'react-icons/fa';
import styled from 'styled-components';
import { IconCSS } from './ModalIconCSS';
import { IconComponentProps, IconProps } from './types';

const StyledBackIcon = styled(FaChevronCircleLeft)<IconComponentProps>`
	${IconCSS}
`;

const BackIcon = ({ onClick, backgroundColor = 'darkGray', hoverBackgroundColor = 'primary', ...rest }: IconProps) => {
	return (
		<StyledBackIcon
			backgroundcolor={backgroundColor}
			hoverbackgroundcolor={hoverBackgroundColor}
			onClick={onClick}
			{...rest}
		/>
	);
};

export default BackIcon;
