import { css, FlattenInterpolation, ThemedStyledProps } from 'styled-components';
import { IconComponentProps } from './types';

export const IconCSS: FlattenInterpolation<ThemedStyledProps<IconComponentProps, any>> = css`
	color: ${({ theme, backgroundcolor }: IconComponentProps): string => theme.colors[backgroundcolor]};
	:hover {
		color: ${({ theme, hoverbackgroundcolor }: IconComponentProps): string => theme.colors[hoverbackgroundcolor]};
	}
	transition: ease 0.1s all;
`;
