import React from 'react';
import { Pie } from 'react-chartjs-2';
import getChartData from '../ChartDataFunction';
import { ChartProps } from '../types';

const PieChart = ({ data, ...rest }: ChartProps): JSX.Element => {
	const pieData = getChartData(data);

	return <Pie data={pieData} {...rest} />;
};

export default PieChart;
