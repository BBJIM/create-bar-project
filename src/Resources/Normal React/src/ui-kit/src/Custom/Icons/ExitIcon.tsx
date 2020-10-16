import React from 'react';
import { FaTimesCircle } from 'react-icons/fa';
import styled from 'styled-components';
import { IconCSS } from './ModalIconCSS';
import { IconComponentProps, IconProps } from './types';

const StyledExitIcon = styled(FaTimesCircle)<IconComponentProps>`
	${IconCSS}
`;

const ExitIcon = ({
	onClick,
	backgroundColor = 'darkGray',
	hoverBackgroundColor = 'primary',
	...rest
}: IconProps): JSX.Element => {
	return (
		<StyledExitIcon
			backgroundcolor={backgroundColor}
			hoverbackgroundcolor={hoverBackgroundColor}
			onClick={onClick}
			{...rest}
		/>
	);
};

export default ExitIcon;
