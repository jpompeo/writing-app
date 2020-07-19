import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Container, Col, Row, Button } from 'react-bootstrap';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import '../styles/Progress.css'
import { Doughnut } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import _ from 'lodash';
import Moment from 'moment'
import MixChart from './charts/MixChart'


class Progress extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentPage: 1,
            totalPages: 3
        }

        this.renderChapterProgress = this.renderChapterProgress.bind(this);
        this.renderTotalProgress = this.renderTotalProgress.bind(this);
        this.renderBurnDownChart = this.renderBurnDownChart.bind(this);
        this.handleArrowClick = this.handleArrowClick.bind(this);
        this.renderPage = this.renderPage.bind(this);
        this.renderProjections = this.renderProjections.bind(this);
    }

    // for pagination
    handleArrowClick(direction) {
        let currentPage = this.state.currentPage;
        if (this.props.currentBook.title) {

            if (direction === 'left') {
                currentPage > 1 ? currentPage-- : currentPage = this.state.totalPages;
                this.setState({ currentPage: currentPage })
            } else if (direction === 'right') {
               currentPage < this.state.totalPages ? currentPage++ : currentPage = 1;
                this.setState({ currentPage: currentPage })
            }
        }
    }


// for pagination 
renderPage() {
    let currentPage = this.state.currentPage;
    if (this.props.currentBook.title) {
        console.log("RENDER PAGE ", this.props.currentBook)
        if (currentPage === 1) {
            console.log("PAGE 1")
            return this.renderTotalProgress();
        } else if (currentPage === 2) {
            return this.renderBurnDownChart();
        } else if (currentPage === 3) {
            return this.renderProjections();
        }
    } else {
        return (
            <h1 className="chart-header">Select a book</h1>
        )
    }
}

//Projections based on past data
renderProjections() {
    let currentBook = this.props.currentBook;
    let updates = this.props.updates;

    if (currentBook.title) {
        return (
            <MixChart />
        )
    }
}

// progress over time
renderBurnDownChart() {
    const currentBook = this.props.currentBook
    const updates = this.props.user.updates;

    if (currentBook.title) {
        if (updates) {
            //get updates for current book
            let bookUpdates = updates.filter(update => {
                return update.bookTitle === currentBook.title;
            })

            //sort by date
            let sortedUpdates = _.sortBy(bookUpdates, (update => {
                let sortByDate = update.date || update.createdAt;
                return sortByDate;
            }))

            //calculate amount for each bar (inverted word count)
            const barDisplay = [];
            sortedUpdates.reduce((length, update) => {
                console.log()
                let newLength = (length - update.progress);
                barDisplay.push(newLength);
                return newLength;
            }, currentBook.expectedLength);

            //date labels for bars
            const barDates = sortedUpdates.map(update => {
                return Moment(update.date || update.created).format('MMM DD')
            })

            //first bar
            const startDate = Moment(currentBook.startDate).format('MMM DD')

            //to alternate colors
            const graphColors = barDisplay.map((bar, index) => {
                let even = index % 2;
                return even ? "#979C9C" : "#DD8172";
            })

            //full data to pass to graph
            const bookData = {
                labels: [startDate, ...barDates],
                datasets: [
                    {
                        label: 'Word Count',
                        backgroundColor: ['#979C9C', ...graphColors],
                        borderColor: 'rgba(0,0,0,1)',
                        borderWidth: 2,
                        data: [currentBook.expectedLength, ...barDisplay, null]
                    }
                ]
            }

            //render graph
            return (
                <div>
                    <h3 className="chart-header">Progress Over Time</h3>
                    <Bar
                        data={bookData}
                        options={{
                            title: {
                                display: false,
                            },
                            legend: {
                                display: false
                            },
                            aspectRatio: 1
                        }}
                    />
                </div>
            )
        }
    }
}

//doughnut chart- overall percentage completed
renderTotalProgress() {
    let currentBook = this.props.currentBook;
    if (currentBook.title) {

        //calculate chapter progress
        // let chaptersTotal = currentBook.chapters.length;
        // let chaptersCompleted = currentBook.chapters.filter(chapter => {
        //     return chapter.completed === true
        // }).length
        // let percentChaptersCompleted = Math.round((chaptersCompleted / chaptersTotal) * 100);
        // let percentChaptersLeftToComplete = 100 - percentChaptersCompleted;

        //calculated overall progress
        let bookTotalProgress = currentBook.progress;
        let bookExpectedLength = currentBook.expectedLength;
        let totalPercentCompleted = Math.round((bookTotalProgress / bookExpectedLength) * 100);

        //set chart options
        const bookData = {
            labels: ['Words Written', 'Remaining Words'],
            datasets: [
                {
                    label: 'Overall Progress',
                    fill: true,
                    lineTension: 0.5,
                    backgroundColor: ['#F5D76B', '#979C9C'],
                    borderColor: ['#979C9C', '#979C9C'],
                    borderWidth: 2,
                    data: [bookTotalProgress, bookExpectedLength]
                }
            ],
            legend: {
                display: false
            }
        }

        // render doughnut chart 
        return (
            <React.Fragment>
                <h3 className="chart-header">Current Progress &bull; {totalPercentCompleted}% Complete</h3>
                <Doughnut
                    data={bookData}
                    options={{
                        legend: {
                            display: false
                        },
                        aspectRatio: 1
                    }}
                />
                <h3 className="chart-header">"{currentBook.title}"</h3>
            </React.Fragment>
        )
    }
}

// TODO: Make chart or delete
renderChapterProgress() {
    if (this.props.currentBook.chapters) {
        return this.props.currentBook.chapters.map(chapter => {
            let chapterGoal = chapter.expectedLength;
            let amountCompleted = chapter.progress;
            let percentCompleted = Math.round((amountCompleted / chapterGoal) * 100);
            let percentLeftToComplete = 100 - percentCompleted;

            if (chapter.completed === true) {
                return (
                    <li>Chapter {chapter.number} is complete!</li>
                )
            } else {

                return (
                    <li>Chapter {chapter.number} is {percentCompleted}% complete</li>
                )
            }
        })
    }
}


//final render of component
render() {
    return (
        <Container id="progress-container" >
            <Row>
                <Col id="progress-burndown-col">

                    {/* left arrow button for pagination */}
                    <div
                        onClick={event => { this.handleArrowClick('left') }}
                        id="left-arrow"
                    >
                        &lsaquo;
                        </div>

                    {/* Chart view based on page number  */}
                    <div id="progress-charts">
                        {this.renderPage()}
                    </div>

                    {/* right arrow for pagination  */}
                    <div
                        id="right-arrow"
                        onClick={event => { this.handleArrowClick('right') }}
                    >
                        &rsaquo;
                        </div>
                </Col>
            </Row>
        </Container>
    )
}
}


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

export default connect(mapStateToProps, null)(Progress);



