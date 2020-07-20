import React, { Component } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import Moment from 'moment';
import _ from 'lodash';
import '../styles/Progress.css'
import { Container, Row, Col } from 'react-bootstrap'



class CurrentStats extends Component {
    constructor(props) {
        super(props)


    }

    renderStats() {
        let currentBook = this.props.currentBook;

        //get updates for current book
        let bookUpdates = this.props.user.updates.filter(update => {
            return update.bookTitle === currentBook.title;
        })

        if (bookUpdates.length > 0) {

            // calculate data needed for stats //

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
            let currentDailyTarget = Math.round((currentBook.expectedLength - totalWordCount) / daysRemaining);

            //get daily word goal
            let dailyGoal = Math.round(currentBook.expectedLength / (totalDays + daysRemaining))


            //get difference between current progress and expected count
            const remainingWords = currentBook.expectedLength - totalWordCount;

            //divide remaining words by daily average to get projected number of days until finished
            const projectedRemainingDays = Math.round(remainingWords / dailyAverage);

            //get projected finish date
            const projectedFinishDate = today.add(projectedRemainingDays, 'days')


            return (
                // <React.Fragment>
                <Container >
                    <Row>

                        <Col>
                            <h4 className="chart-header">Goal </h4>
                            <p className="current-stats">{currentBook.expectedLength} words</p>

                            <hr/>

                            <h4 className="chart-header">Goal Target Date </h4>
                            <p className="current-stats">{goalEnd.format("MMM D, YYYY")}</p>

                            <hr/>

                            <h4 className="chart-header">Daily Average </h4>
                            <p className="current-stats">{dailyAverage} words per day</p>
                            
                        </Col>

                        <Col>
                            <h4 className="chart-header">Current Progress</h4>
                            <p className="current-stats">{totalWordCount} words</p>

                            <hr/>

                            <h4 className="chart-header">Projected Finish Date </h4>
                            <p className="current-stats">{projectedFinishDate.format("MMM D, YYYY")}</p>

                            <hr/>

                            <h4 className="chart-header">Current Daily Target: </h4>
                            <p className="current-stats">{currentDailyTarget} words</p>

                        </Col>
                    </Row>

                </Container>


                // </React.Fragment>

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
                {this.renderStats()}
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

export default connect(mapStateToProps, null)(CurrentStats);