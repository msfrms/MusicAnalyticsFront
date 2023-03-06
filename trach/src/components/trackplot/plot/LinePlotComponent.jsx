import React, { PureComponent } from 'react'
import Chart from "chart.js";

Chart.Tooltip.positioners.custom = function(_, eventPosition) {    
    return {
        x: eventPosition.x,
        y: eventPosition.y
    };
}
Chart.defaults.global.legend.display = false;

function createDatasetsFromProps(props) {
    return props.lines.map(line => {
        return {
            label: line.label,
            backgroundColor: line.color,
            borderColor: line.color,
            pointRadius: 1,
            lineTension: 0,
            borderWidth: 2,
            fill: false,
            data: line.values,
        }
    })
}

export default class LinePlotComponent extends PureComponent {
    linePlotRef = React.createRef();
    chart = {};    
    
    componentDidMount() {
        this.buildChart();
    }

    componentDidUpdate() {        
        this.chart.data = {                
            labels: this.props.labels,
            datasets: createDatasetsFromProps(this.props)
        }
        this.chart.update()
    }

    

    buildChart = () => {                
        this.chart = new Chart(this.linePlotRef.current.getContext("2d"), {
            type: "line",         
            data: {                
                labels: this.props.labels,
                datasets: createDatasetsFromProps(this.props)
            },
            options: {
				animation: {
					duration: 0
				},
				title: {
					display: false,					
				},
				scales: {
					yAxes : [{
                		ticks : {
                    		fontSize: 14,
                    		max : 100,
                    		min : 1,
                    		stepSize: 10,
                    		reverse: true
                		}
            		}],
            		xAxes : [{
                		ticks : {
                			offset: true,
                     		fontSize: 14,
                		}
            		}],
				},
				tooltips: {
					mode: 'index',
					position: 'custom',
					callbacks: {
						label: function(tooltipItem, myData) {
							let label = myData.datasets[tooltipItem.datasetIndex].label || '';
							if (label) {
								label += ': ';
							}
							if (tooltipItem.value > 100) {
								return "";
							}
							label += parseFloat(tooltipItem.value).toFixed(0);
							return label;
						}
					}
				}
			}
        });
    }

    render() { 
               
        return (
            <canvas id="myChart" ref={this.linePlotRef} />
        )
    }
}
