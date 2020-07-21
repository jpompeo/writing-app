import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Link } from 'react-router-dom';
import { Container, Col, Row, Button } from 'react-bootstrap';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import '../styles/Progress.css'
import { Doughnut } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import _, { first } from 'lodash';
import Moment from 'moment'
import MixChart from './charts/MixChart'
import LineGraph from './charts/LineGraph'
import Projections from './charts/Projections';



class Progress extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentPage: 1,
            totalPages: 4
        }

        this.renderChapterProgress = this.renderChapterProgress.bind(this);
        this.renderTotalProgress = this.renderTotalProgress.bind(this);
        this.renderBurnDownChart = this.renderBurnDownChart.bind(this);
        this.handleArrowClick = this.handleArrowClick.bind(this);
        this.renderPage = this.renderPage.bind(this);
        this.renderProjections = this.renderProjections.bind(this);
        this.renderComparison = this.renderComparison.bind(this);
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
                return this.renderProjections();

            } else if (currentPage === 2) {
                return this.renderComparison();

            } else if (currentPage === 3) {
                return this.renderBurnDownChart();
            } else if (currentPage === 4) {
                return this.renderTotalProgress();
            }
        } else {
            return (
                <div className="chart-zero-view">

                    <h1 className="chart-header">No updates yet</h1>
                    <p>Haven't started tracking yet? < Link id="progress-add-book-link" to="/me/addbook">Get started here!</Link>
                    </p>
                </div>
            )
        }
    }



    //Comparisons - actual, average, goal
    renderComparison() {
        let currentBook = this.props.currentBook;
        let updates = this.props.updates;

        if (currentBook.title) {
            return (
                <LineGraph />
            )
        }
    }

    //Projections based on past data
    renderProjections() {
        let currentBook = this.props.currentBook;
        let updates = this.props.updates;

        if (currentBook.title) {
            return (
                <Projections />
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

                let wordGoal = currentBook.expectedLength;

                let remainingWords = wordGoal - currentBook.progress;

                let totalUpdateWordCount = bookUpdates.reduce((total, update) => {
                    return total + update.progress;
                }, 0);

                // let startingProgress = currentBook.progress - totalUpdateWordCount;
                
                // let firstUpdate = currentBook.expectedLength - startingProgress;

                //calculate amount for each bar (inverted word count)
                const allUpdatesProgress = [];
                
                sortedUpdates.forEach(update => {
                    allUpdatesProgress.push(update.progress)
                })
                // console.log("FIRSAT", startingProgress)

                let barDisplay = [];
                
                allUpdatesProgress.reduce((length, update) => {
                    console.log()
                    let newLength = (length - update);
                    barDisplay.push(newLength);
                    return newLength;
                }, currentBook.expectedLength);

                console.log("PROGRESS UPD", barDisplay)

                //date labels for bars
                const barDates = sortedUpdates.map(update => {
                    return Moment(update.date || update.created).format('MMM DD')
                })

                barDates.unshift(Moment(currentBook.startDate).format('MMM DD'));

                //first bar
                // const startDate = Moment(currentBook.startDate).format('MMM DD')
                

                //to alternate colors
                const graphColors = barDisplay.map((bar, index) => {
                    let even = index % 2;
                    return even ? "#979C9C" : "rgba(221, 129, 114, .7)";
                })

                //to alternate border colors
                const graphBorderColors = barDisplay.map((bar, index) => {
                    let even = index % 2;
                    return even ? "#4D4F4F" : "rgba(221, 129, 114, 1)";
                })

                //full data to pass to graph
                const bookData = {
                    labels: ['Goal Start', ...barDates],
                    datasets: [
                        {
                            label: 'Word Count',
                            backgroundColor: ['#979C9C', ...graphColors],
                            borderColor: ['#4D4F4F', ...graphBorderColors],
                            borderWidth: 2,
                            data: [currentBook.expectedLength, ...barDisplay, null]
                        }
                    ]
                }

                //render graph
                return (
                    <div>
                        <h3 className="chart-header">Words Remaining</h3>
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
             
            let totalPercentRemaining = Math.round(((bookExpectedLength - bookTotalProgress) / bookExpectedLength) * 100);

            let percentData = []
            if (totalPercentCompleted >= 100) {
                console.log("IIIIIIIIIIF")
                percentData.push(100)
            } else {
                console.log("EEEEEEEELSE")
                percentData.push(...[totalPercentCompleted, totalPercentRemaining])
            }

            //set chart options
            const bookData = {
                labels: ['Words Written', 'Remaining Words'],
                datasets: [
                    {
                        label: 'Overall Progress',
                        fill: true,
                        lineTension: 0.5,
                        backgroundColor: ['rgba(91, 9, 52, .9)', 'rgba(91, 9, 52, .6)',],
                        borderColor: ['rgba(80, 8, 46, .5)', 'rgba(80, 8, 46, .5)'],
                        borderWidth: [2, 2],
                        data: [...percentData]
                    }
                ],
                legend: {
                    display: false
                }
            }
            // rgba(230, 204, 110,.9)
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
            <Container id="progress-container" fluid>
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

export default connect(mapStateToProps, null)(Progress);



