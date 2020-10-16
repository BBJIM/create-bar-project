import { ChartData } from 'react-chartjs-2';
import { chartColors } from '../colors';
import { ChartDataProps } from '../types';

const getChartData = (data: ChartDataProps): Chart.ChartData => {
	const chartData: ChartData<Chart.ChartData> = {
		labels: Object.keys(data),
		datasets: [
			{
				data: Object.values(data),
				backgroundColor: chartColors,
				hoverBackgroundColor: chartColors,
			},
		],
	};
	return chartData;
};

export default getChartData;
