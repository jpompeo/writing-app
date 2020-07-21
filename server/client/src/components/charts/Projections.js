import React, { Component } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import Moment from 'moment';
import _ from 'lodash';
import '../../styles/Progress.css'



class Projections extends Component {
    constructor(props) {
        super(props)

        this.renderMixChart = this.renderMixChart.bind(this);
    }

    renderMixChart() {
       if (this.props.user.updates && this.props.currentBook.title) {
        let currentBook = this.props.user.books.find(book => {
          return book.title == this.props.currentBook.title;
      })
       
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
              position: "top",
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
            let totalUpdatesWordCount = bookUpdates.reduce((total, update) => {
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
            let pastDays = Math.abs(Math.round(Moment.duration(goalStart.diff(today)).asDays()));
            let daysRemaining = Math.abs(Math.round(Moment.duration(today.diff(goalEnd)).asDays()));
            let overallDays = Math.abs(Math.round(Moment.duration(bookStart.diff(goalEnd)).asDays()));

            //Differences in number of weeks
            let pastWeeks = Math.abs(Math.round(Moment.duration(goalStart.diff(today)).asWeeks()));
            let weeksRemaining = Math.abs(Math.round(Moment.duration(today.diff(goalEnd)).asWeeks()));

            //Differences in number of weeks
            let pastMonths = Math.abs(Math.round(Moment.duration(goalStart.diff(today)).asMonths()));
            let monthsRemaining = Math.abs(Math.round(Moment.duration(today.diff(goalEnd)).asMonths()));

            //get averages daily, weekly, monthly word count
            let dailyAverage = Math.round(totalWordCount / pastDays);
            let weeklyAverage = Math.round(totalWordCount / pastWeeks);
            let monthlyAverage = Math.round(totalWordCount / pastMonths);

            // for demo- averages for incomplete generated fake data
            let fakeDailyAverage = Math.round(totalWordCount / sortedUpdates.length)

            //daily word count goal to finish on deadline
            let currentDailyTarget = (currentBook.expectedLength - totalWordCount) / daysRemaining;

            console.log("Averages", dailyAverage, weeklyAverage, monthlyAverage)
            console.log("totals", pastDays, pastWeeks, pastMonths)

            //get initial daily word goal
            let dailyGoal = Math.round(currentBook.expectedLength / (pastDays + daysRemaining))

            //map compounded word counts to array for bar graph
           let accumulatedBarData = sortedUpdates.reduce((accArray, update, index) => {
            if (index > 0) {
                accArray.push(Math.round(update.progress + accArray[index - 1]))
                return accArray;
            } else {
                accArray.push(Math.round(update.progress))
                return accArray;
            }
           }, [])

           //split averages into groups based on number of updates
           const groupBy = pastDays / sortedUpdates.length;

           //map daily averages into array of same length as updates, grouped by number of updates
           const projectionLineData = sortedUpdates.map(update => {
               return Math.round(dailyAverage * groupBy);
           })

           //get difference between current progress and expected count
           const remainingWords = currentBook.expectedLength - totalWordCount;

           //divide remaining words by daily average to get projected number of days until finished
           const projectedRemainingDays = Math.round(remainingWords / dailyAverage);

           //get projected finish date
           const projectedFinishDate = today.add(projectedRemainingDays, 'days')

           //get data labels for projection array
           const projectionLabels = [];
           for (let i = 0; i < sortedUpdates.length; i++) {
               if (i === 0) {
                   projectionLabels.push('Today');
               } else if (i === sortedUpdates.length - 2) {
                projectionLabels.push(projectedFinishDate.format('MMM DD YY'));
               } else if (i % 2 === 0) {
                projectionLabels.push('-')
               } else {
                   projectionLabels.push(' ')
               }
           }

           //divide remaining words into amount of past updates to balance chart
           const projectedGraphItem = Math.round(remainingWords / sortedUpdates.length);
           const projectedFutureData = sortedUpdates.map(update => {
                return projectedGraphItem;
           })

           console.log("DATA BEFORE ACC", projectionLineData, projectedFutureData)

            //map compounded word counts to array for projection graph
            const accumulatedProjections = [...projectionLineData, ...projectedFutureData].reduce((accArray, count, index) => {
                if (index > 0) {
                    accArray.push(count + accArray[index - 1])
                    return accArray;
                } else {
                    accArray.push(count)
                    return accArray;
                }
               }, [])

               console.log("PROJECTIONS", accumulatedProjections, )
               console.log("FUTURE LABELS", projectionLabels)
               console.log("ACTUAL ACC", accumulatedBarData)

            // //map average and goal to array for graph
            // let averageLineData = bookUpdates.map(update => {
            //     // return dailyAverage;

            //     //for demo
            //     return fakeDailyAverage
            // })

            // let goalLineData = bookUpdates.map(update => {
            //     // return dailyGoal;

            //     // for demo
            //     return this.props.user.dailyGoal;
            // })

            // //get daily actual word counts
            // let actualData = sortedUpdates.map(update => {
            //     return update.progress;
            // });

            //get dates for graph
            let graphDates = sortedUpdates.map(update => {
              return Moment(update.date || update.created).format('MMM DD YY')
            })

            console.log("LABELS", projectionLabels)
            
            //chart data
            const data = {
              labels: [...graphDates, ...projectionLabels],
              datasets: [
                {
                    label: "Projections",
                    type: 'line',
                    data: [...accumulatedProjections],
                    fill: true,
                    borderColor: "rgba(252, 171, 58 , 1)",
                    backgroundColor: "rgba(252, 171, 58 , .5)",
                    pointRadius: 0,
                    pointHoverRadius: 5
                  },
                {
                  label: "Past Progress",
                  data: [...accumulatedBarData],
                  type: 'bar',
                  fill: true,
                  borderColor: "rgba(91, 9, 52, 1)",
                  backgroundColor: "rgba(252, 171, 58 , 1)",
                  pointRadius: 0,
                  pointHoverRadius: 5
                },
                
                // {
                //   label: "Actual Word Count",
                //   data: [...actualData],
                //   type: 'bar',
                //   fill: true,
                //   backgroundColor: "rgba(107, 190, 201, .2)",
                //   borderColor: "rgba(107, 190, 201, 1)",
                //   pointRadius: 0,
                //   pointHoverRadius: 5
                // },
              ]
            };
          

            return (
                <React.Fragment>

                    <h2 className="chart-header">Projected Finish Date: {projectedFinishDate.format('MMMM DD, YYYY')}</h2>
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
        currentBook: state.currentBook,
        updates: state.userData.updates
    };
}

// function mapDispatchToProps(dispatch) {
//     return bindActionCreators(
//         { logoutUser },
//         dispatch
//     );
//   }

export default connect(mapStateToProps, null)(Projections);