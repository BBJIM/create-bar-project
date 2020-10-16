import { Colors } from 'ui-kit/src/Common/Types';
import React from 'react';
import Loader from 'react-loader-spinner';
import styled from 'styled-components';
import { Theme } from 'ui-kit/src/Theme';
import { zIndex } from 'ui-kit/src/Theme/GlobalStyles';
import { Dimmer } from '../Custom';

type Props = {
	active?: boolean;
	height?: number;
	width?: number;
	color?: Colors;
};

const Loading = styled(Loader)`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: ${({ theme }: { theme: Theme }): number => theme.zIndex.loadingZ};
	fill: ${({ theme, color }: { theme: Theme; color: Colors }): string => theme.colors[color]};
`;

const LoadingDimmer = styled(Dimmer)<{ active?: boolean }>`
	transition: all 0.2s;
	opacity: ${({ active }: { active?: boolean }): string => (active ? '1' : '0')};
	visibility: ${({ active }: { active?: boolean }): string => (active ? 'visible' : 'hidden')};
`;

const LoadingScreen = ({ active, height = 100, width = 100, color = 'primary' }: Props): JSX.Element => {
	return (
		<>
			<LoadingDimmer active={active} zIndex={zIndex.loadingDimmerZ} />
			<Loading type='ThreeDots' visible={active} height={height} width={width} color={color} />
		</>
	);
};

export default LoadingScreen;
