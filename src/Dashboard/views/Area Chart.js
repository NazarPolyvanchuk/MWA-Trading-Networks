import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class AreaChart extends Component {
	render() {

		const { data } = this.props;

		const options = {
			theme: "light2",
			animationEnabled: true,
			exportEnabled: true,
			title: {
				text: "Графік прибутку"
			},
			axisY: {
				title: "Сума прибутку ( тис. грн. )",
				includeZero: false,
			},
			data: [
				{
					type: "area",
					xValueFormatString: "DD",
					yValueFormatString: "##0.## ГРН",
					dataPoints: data,
				}
			]
		}
		
		return (
			<div>
				<CanvasJSChart options = {options} 
					/* onRef={ref => this.chart = ref} */
				/>
				{/*You can get reference to the chart instance as shown above using onRef.
					This allows you to access all chart properties and methods*/}
			</div>
		);
	}
}

export default AreaChart;
