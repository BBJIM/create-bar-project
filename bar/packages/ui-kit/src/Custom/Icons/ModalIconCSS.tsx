import { css } from 'styled-components';
import { IconComponentProps } from './types';

export const IconCSS = css`
	color: ${({ theme, backgroundcolor }: IconComponentProps) => theme.colors[backgroundcolor]};
	:hover {
		color: ${({ theme, hoverbackgroundcolor }: IconComponentProps) => theme.colors[hoverbackgroundcolor]};
	}
	transition: ease 0.1s all;
`;
