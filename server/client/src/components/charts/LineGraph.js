import React, { Component } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import Moment from 'moment';
import _ from 'lodash';
import '../../styles/Progress.css'



class LineGraph extends Component {
    constructor(props) {
        super(props)

        this.renderMixChart = this.renderMixChart.bind(this);
    }

    renderMixChart() {
        let currentBook = this.props.currentBook;
       
        //get updates for current book
        let bookUpdates = this.props.user.updates.filter(update => {
          return update.bookTitle === currentBook.title;
      })

        if (bookUpdates.length > 0) {

            //chart configuration
            const options = {
              title: {
                display: false,
              },
              scales: {
                yAxes: [
                  {
                    ticks: {
                      suggestedMin: 0
                    }
                  }
                ]
              }
            };

            const legend = {
              display: true,
              position: "bottom",
              labels: {
                fontColor: "#323130",
                fontSize: 14
              }
            };            

            // calculate data needed for chart //

            //sort by date
            let sortedUpdates = _.sortBy(bookUpdates, (update => {
                let sortByDate = update.date || update.createdAt;
                return sortByDate;
            }))

            //get total word count
            let totalUpdateWordCount = bookUpdates.reduce((total, update) => {
                return total + update.progress;
            }, 0);

            let totalWordCount = currentBook.progress;

            // divide word count into days (goal start till today) //
            //get dates needed
            const goalStart = Moment(sortedUpdates[0].date || sortedUpdates[0].createdAt);
            const today = Moment(new Date());
            const goalEnd = Moment(currentBook.deadline);
            const bookStart = Moment(currentBook.startDate);

            //Differences in number of days
            let totalDays = Math.abs(Math.round(Moment.duration(goalStart.diff(today)).asDays()));
            let daysRemaining = Math.abs(Math.round(Moment.duration(today.diff(goalEnd)).asDays()));
            let overallDays = Math.abs(Math.round(Moment.duration(bookStart.diff(goalEnd)).asDays()));

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

            // for demo- averages for incomplete generated fake data
            let fakeDailyAverage = Math.round(totalWordCount / sortedUpdates.length)

            //daily word count goal to finish on deadline
            let currentDailyTarget = (currentBook.expectedLength - totalWordCount) / daysRemaining;

            console.log("Averages", dailyAverage, weeklyAverage, monthlyAverage)
            console.log("totals", totalDays, totalWeeks, totalMonths)

            //get daily word goal
            let dailyGoal = Math.round(currentBook.expectedLength / (totalDays + daysRemaining))
            
            //map average and goal to array for graph
            let averageLineData = bookUpdates.map(update => {
                return dailyAverage;

                //for demo
                // return fakeDailyAverage
            })

            let goalLineData = bookUpdates.map(update => {
                // return dailyGoal;

                // updates as data changes
                return currentDailyTarget;
            })

            //get daily actual word counts
            let actualData = sortedUpdates.map(update => {
                return update.progress;
            });

            //get dates for graph
            let graphDates = sortedUpdates.map(update => {
              return Moment(update.date || update.created).format('MMM DD')
            })
            
            //chart data
            const data = {
              labels: [...graphDates],
              datasets: [
                {
                  label: "Daily Average",
                  data: [...averageLineData],
                  fill: false,
                  borderColor: "rgba(91, 9, 52, .6)",
                  backgroundColor: "rgba(91, 9, 52, 1)",
                  pointRadius: 0,
                  pointHoverRadius: 5
                },
                {
                  label: "Target Goal",
                  data: [...goalLineData],
                  fill: false,
                  borderColor: "rgba(252, 171, 58 , .7)",
                  backgroundColor: "rgba(252, 171, 58 , 1)",
                  pointRadius: 0,
                  pointHoverRadius: 5
                },
                {
                  label: "Actual Word Count",
                  data: [...actualData],
                  fill: true,
                  backgroundColor: "rgba(107, 190, 201, .2)",
                  borderColor: "rgba(107, 190, 201, 1)",
                  pointRadius: 0,
                  pointHoverRadius: 5
                },
              ]
            };
          

            return (
                <React.Fragment>

                    <h2 className="chart-header">Daily Performance</h2>
                    <Line data={data} legend={legend} options={options} />

                </React.Fragment>

            )
        } else {
          return (
            <div className="chart-zero-view">

            <h1 className="chart-header">No updates yet</h1>
            <p>Haven't started tracking yet? <Link to="/me/addupdate">Get started here!</Link>
            </p>
            </div>
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
        user: state.userData,
        currentBook: state.currentBook
    };
}

// function mapDispatchToProps(dispatch) {
//     return bindActionCreators(
//         { logoutUser },
//         dispatch
//     );
//   }

export default connect(mapStateToProps, null)(LineGraph);