import React, { PureComponent } from 'react'
import Chart from "chart.js";

Chart.Tooltip.positioners.custom = function (_, eventPosition) {
    return {
        x: eventPosition.x,
        y: eventPosition.y
    };
}
Chart.defaults.global.legend.display = false;

function formatN(n) {
    const unitList = ['y', 'z', 'a', 'f', 'p', 'n', 'u', 'm', '', 'k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
    const zeroIndex = 8;
    const nn = n.toExponential(4).split(/e/);
    let u = Math.floor(+nn[1] / 3) + zeroIndex;
    if (u > unitList.length - 1) {
        u = unitList.length - 1;
    } else
        if (u < 0) {
            u = 0;
        }
    if (u > zeroIndex)
        u = u - 1
    return numberWithSpaces((nn[0] * Math.pow(10, +nn[1] - (u - zeroIndex) * 3)).toFixed(0) + unitList[u]);
}

function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}


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

export default class ArtistLinePlotComponent extends PureComponent {
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
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            fontSize: 14,
                            userCallback: function (label, index, labels) {
                                return formatN(parseFloat(label))
                            },
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            offset: true,
                            fontSize: 14,
                        }
                    }],
                },
                tooltips: {
                    mode: 'index',
                    position: 'custom',
                    callbacks: {
                        label: function (tooltipItem, myData) {
                            let label = myData.datasets[tooltipItem.datasetIndex].label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += numberWithSpaces(parseFloat(tooltipItem.value));
                            return label;
                        }
                    }
                }
            }
        });
    }

    render() {

        return (
            <canvas id="myChart" ref={this.linePlotRef} height="530%" />
        )
    }
}
