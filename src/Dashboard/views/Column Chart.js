import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class ColumnChart extends Component {
		render() {

		const { data = [] } = this.props;

		const options = {
			title: {
				text: "Графік товарів які найбільше продаються"
			},
			animationEnabled: true,
			data: [
				{
					type: "column",
				dataPoints: [
					{ label: "AppleApple MacBook Pro 2019 256G",  y: 1  },
					{ label: "Apple iMac Pro 2019", y: 1  },
					// { label: "Banana", y: 25  },
					// { label: "Mango",  y: 30  },
					// { label: "Grape",  y: 28  }
				]
			}
			]
		}
		
		return (
		<div>
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default ColumnChart;