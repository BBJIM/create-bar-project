import { Without } from 'ui-kit/src/Common/Types';
import { ChartComponentProps } from 'react-chartjs-2';

export type ChartDataProps = {
	[key: string]: any;
};

export type ChartProps = Without<ChartComponentProps, 'data'> & { data: ChartDataProps };
