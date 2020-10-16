import { Colors } from 'Common/Types';
import { IconBaseProps } from 'react-icons/lib';
import { Theme } from 'Theme';

export type IconProps = IconBaseProps & { backgroundColor?: Colors; hoverBackgroundColor?: Colors };

export type IconComponentProps = { theme: Theme; backgroundcolor: Colors; hoverbackgroundcolor: Colors };
