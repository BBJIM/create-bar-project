import { PieChart } from 'ui-kit/src/Custom';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	padding: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
`;

const ChartWrapper = styled.div`
	width: 500px;
	margin: 25px;
`;

const Charts = (): JSX.Element => (
	<Wrapper>
		<ChartWrapper>
			<PieChart data={{ Big: 35, Small: 25, Medium: 40 }} />
		</ChartWrapper>
		<ChartWrapper>
			<PieChart data={{ Big: 35, Small: 25, Medium: 40 }} />
		</ChartWrapper>
		<ChartWrapper>
			<PieChart data={{ Big: 35, Small: 25, Medium: 40 }} />
		</ChartWrapper>
		<ChartWrapper>
			<PieChart data={{ Big: 35, Small: 25, Medium: 40 }} />
		</ChartWrapper>
		<ChartWrapper>
			<PieChart data={{ Big: 35, Small: 25, Medium: 40 }} />
		</ChartWrapper>
		<ChartWrapper>
			<PieChart data={{ Big: 35, Small: 25, Medium: 40 }} />
		</ChartWrapper>
		<ChartWrapper>
			<PieChart data={{ Big: 35, Small: 25, Medium: 40 }} />
		</ChartWrapper>
	</Wrapper>
);
export default Charts;
