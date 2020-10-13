import { Colors } from 'ui-kit/src/Common/Types';
import { IconBaseProps } from 'react-icons/lib';
import { ITheme } from 'ui-kit/src/Theme';

export type IconProps = IconBaseProps & { backgroundColor?: Colors; hoverBackgroundColor?: Colors };

export type IconComponentProps = { theme: ITheme; backgroundcolor: Colors; hoverbackgroundcolor: Colors };
