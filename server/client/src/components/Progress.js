import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Container, Col, Row } from 'react-bootstrap';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import '../styles/Progress.css'
import { Doughnut } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';


class Progress extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentPage: 1,
            totalPages:  3
        }

        this.renderChapterProgress = this.renderChapterProgress.bind(this);
        this.renderTotalProgress = this.renderTotalProgress.bind(this);
        this.renderBurnDownChart = this.renderBurnDownChart.bind(this);
        this.handleArrowClick = this.handleArrowClick.bind(this);
        this.renderPage = this.renderPage.bind(this);
    }

    handleArrowClick(direction) {
        let currentPage = this.state.currentPage;

        if (direction === 'left') {
            if (currentPage > 1) {
                currentPage--;
                this.setState({currentPage: currentPage})
            }
        } else {
            if (currentPage < this.state.totalPages) {
                currentPage++;
                this.setState({currentPage: currentPage})
            }
        }
    }

    renderPage() {
        let currentPage = this.state.currentPage;

        if (currentPage === 1) {
            return 
        } else if (currentPage === 2) {

        } else if (currentPage === 3{

        }
    }

    renderBurnDownChart() {
        const currentBook = this.props.currentBook
        if (currentBook.title) {

            const bookData = {
                labels: ['January', 'February', 'March',
                    'April', 'May'],
                datasets: [
                    {
                        label: 'Rainfall',
                        backgroundColor: 'rgba(75,192,192,1)',
                        borderColor: 'rgba(0,0,0,1)',
                        borderWidth: 2,
                        data: [65, 59, 80, 81, 56]
                    }
                ]
            }

            return (
                <div>
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
                        backgroundColor: ['#DD8172', '#979C9C'],
                        borderColor: ['#DD8172', '#979C9C'],
                        borderWidth: 2,
                        data: [bookTotalProgress, bookExpectedLength]
                    }
                ],
                legend: {
                    display: false
                }
            }



            return (
                <React.Fragment>
                    <h3 id="progress-doughnut-header">{totalPercentCompleted}% Complete</h3>
                    <Doughnut
                        data={bookData}
                        options={{
                            // title: {
                            //     display: false,
                            //     text: `${totalPercentCompleted}% Complete`,
                            //     fontSize: 15
                            // },
                            legend: {
                                display: false
                            },
                            aspectRatio: 1
                        }}
                    />
                </React.Fragment>
            )
        }
    }

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


    render() {
        return (
            <Container id="progress-container" fluid>
                <Row>
                    <Col>
                        <div
                            id="left-arrow"
                            onClick={this.handleArrowClick('left')}
                        >
                            &lt;
                        </div>
                        <Container id="progress-charts">
                            <Row>
                                <Col lg={4} id="progress-doughnut-col">

                                    {this.renderTotalProgress()}


                                </Col>
                                <Col lg={4} id="progress-burndown-col">
                                    {this.renderBurnDownChart()}
                                </Col>
                                <Col lg={4}></Col>
                                {/* <Col lg={3}></Col> */}
                            </Row>
                        </Container>
                        <div 
                            className="right-arrow"
                            onClick={event => {this.handleArrowClick('right')}}
                        >
                            &gt;
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



