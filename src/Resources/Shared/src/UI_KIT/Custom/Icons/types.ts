import { Colors } from 'Common/Types';
import { IconBaseProps } from 'react-icons/lib';
import { ITheme } from 'Theme';

export type IconProps = IconBaseProps & { backgroundColor?: Colors; hoverBackgroundColor?: Colors };

export type IconComponentProps = { theme: ITheme; backgroundcolor: Colors; hoverbackgroundcolor: Colors };
