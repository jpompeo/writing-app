import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import Moment from 'moment';
import _ from 'lodash';



class MixChart extends Component {
    constructor(props) {
        super(props)

        this.renderMixChart = this.renderMixChart.bind(this);
    }

    renderMixChart() {
        let currentBook = this.props.currentBook;
        let updates = this.props.updates;

        if (currentBook.title && updates) {

            
            // calculate data needed for chart //

            //get updates for current book
            let bookUpdates = updates.filter(update => {
                return update.bookTitle === currentBook.title;
            })

            //sort by date
            let sortedUpdates = _.sortBy(bookUpdates, (update => {
                let sortByDate = update.date || update.createdAt;
                return sortByDate;
            }))

            //get total word count
            let totalWordCount = bookUpdates.reduce((total, update) => {
                return total + update.progress;
            }, 0);

            // divide word count into days (goal start till today) //
            //get dates needed
            const goalStart = Moment(currentBook.startDate);
            const today = Moment(new Date());
            const goalEnd = Moment(currentBook.deadline);

            //Differences in number of days
            let totalDays = Math.abs(Math.round(Moment.duration(goalStart.diff(today)).asDays()));
            let daysRemaining = Math.abs(Math.round(Moment.duration(today.diff(goalEnd)).asDays()));

            //Differences in number of weeks
            let totalWeeks = Math.abs(Math.round(Moment.duration(goalStart.diff(today)).asWeeks()));
            let weeksRemaining = Math.abs(Math.round(Moment.duration(today.diff(goalEnd)).asWeeks()));

            //Differences in number of weeks
            let totalMonths = Math.abs(Math.round(Moment.duration(goalStart.diff(today)).asMonths()));
            let monthsRemaining = Math.abs(Math.round(Moment.duration(today.diff(goalEnd)).asMonths()));

            //get averages daily, weekly, monthly word count
            let dailyAverage = Math.round(totalWordCount / totalDays);
            let weeklyAverage = Math.round(totalWordCount / totalWeeks);
            let monthlyAverage = Math.round(totalWordCount / totalMonths);

            console.log("Averages", dailyAverage, weeklyAverage, monthlyAverage)
            console.log("totals", totalDays, totalWeeks, totalMonths)

            //get daily word goal
            let dailyGoal = Math.round(currentBook.expectedLength / (totalDays + daysRemaining))
            
            //map average and goal to array for graph
            let averageLineData = bookUpdates.map(update => {
                return dailyAverage;
            })

            let goalLineData = bookUpdates.map(update => {
                return dailyGoal;
            })

            //get daily actual word counts
            let actualData = sortedUpdates.map(update => {
                return update.progress;
            });

            //date labels for bars
            const barDates = sortedUpdates.map(update => {
                return Moment(update.date || update.created).format('MMM DD')
            })

            //for line description
            const plugins = [{
                afterDraw: (chartInstance, easing) => {
                    const ctx = chartInstance.chart.ctx;
                    ctx.fillText("This text drawn by a plugin", 100, 100);
                }
            }];

            //chart configuration
            const options = {
                responsive: true,
                tooltips: {
                    mode: 'label'
                },
                elements: {
                    line: {
                        fill: false
                    }
                },
                scales: {
                    xAxes: [
                        {
                            display: true,
                            gridLines: {
                                display: false
                            },
                            labels: [...barDates],
                        }
                    ],
                    yAxes: [{

                        ticks: {
                            suggestedMin: 0
                        }
                          },
                        {
                            type: 'linear',
                            display: true,
                            position: 'left',
                            id: 'y-axis-1',
                            gridLines: {
                                display: false
                            },
                            labels: {
                                show: true
                            }
                        },
                        {
                            type: 'linear',
                            display: true,
                            position: 'right',
                            id: 'y-axis-2',
                            gridLines: {
                                display: false
                            },
                            labels: {
                                show: true
                            }
                        },
                        {
                            type: 'linear',
                            display: true,
                            position: 'right',
                            id: 'y-axis-3',
                            gridLines: {
                                display: false
                            },
                            labels: {
                                show: true
                            }
                        }
                    ]
                }
            };


            
            //chart data
            const data = {

                datasets: [{
                    label: 'Daily Average',
                    type: 'line',
                    data: [...averageLineData],
                    fill: true,
                    borderColor: '#EC932F',
                    backgroundColor: '#EC932F',
                    pointBorderColor: '#EC932F',
                    pointBackgroundColor: '#EC932F',
                    pointHoverBackgroundColor: '#EC932F',
                    pointHoverBorderColor: '#EC932F',
                    yAxisID: 'y-axis-2'
                },
                {
                    label: 'Daily Goal',
                    type: 'line',
                    data: [...goalLineData],
                    fill: false,
                    borderColor: '#979C9C',
                    backgroundColor: '#979C9C',
                    pointBorderColor: '#EC932F',
                    pointBackgroundColor: '#EC932F',
                    pointHoverBackgroundColor: '#EC932F',
                    pointHoverBorderColor: '#EC932F',
                    yAxisID: 'y-axis-2'
                },
                {
                    type: 'bar',
                    label: 'Actual Word Count',
                    data: [...actualData],
                    fill: false,
                    backgroundColor: '#71B37C',
                    borderColor: '#71B37C',
                    hoverBackgroundColor: '#71B37C',
                    hoverBorderColor: '#71B37C',
                    yAxisID: 'y-axis-1'
                }]
            };

            return (
                <React.Fragment>

                    <h2>Mixed data Example</h2>
                    <Bar
                        data={data}
                        options={options}
                        plugins={plugins}
                    />

                </React.Fragment>

            )
        }
    }

    render() {
        return (
            <div>
                {this.renderMixChart()}
            </div>
        );
    }
};

function mapStateToProps(state) {
    return {
        updates: state.userData.updates,
        currentBook: state.currentBook
    };
}

// function mapDispatchToProps(dispatch) {
//     return bindActionCreators(
//         { logoutUser },
//         dispatch
//     );
//   }

export default connect(mapStateToProps, null)(MixChart);