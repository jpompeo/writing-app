import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Container, Col, Row } from 'react-bootstrap';
import '../styles/Progress.css'


class Progress extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userGoals: {

            },
            book: {
                chapters: [
                    {
                        id: "c1",
                        number: 1,
                        title: 'Lost in the Woods',
                        description: 'Eloise gets lost in the woods and almost dies before meeting a stranger',
                        deadline: '8/13/20',
                        expectedLength: 3000,
                        progress: 2700,
                        completed: true
                    },
                    {
                        id: "c2",
                        number: 2,
                        title: 'Losing the gold',
                        description: 'Robert gets robbed by bandits',
                        deadline: '8/30/20',
                        expectedLength: 3000,
                        progress: 200,
                        completed: false
                    },
                    {
                        id: "c3",
                        number: 3,
                        title: 'Casting a spell',
                        description: 'Amy discovers she has magic powers',
                        deadline: '9/4/20',
                        expectedLength: 3000,
                        progress: 0,
                        completed: false
                    },
                ],
                totalExpectedLength: 80000,
                totalProgress: 22000
            }
        }
        this.renderChapterProgress = this.renderTotalProgress.bind(this);
        this.renderTotalProgress = this.renderTotalProgress.bind(this);
    }

    renderTotalProgress() {
        //calculate chapter progress
        let chaptersTotal = this.state.book.chapters.length;
        let chaptersCompleted = this.state.book.chapters.filter(chapter => {
            return chapter.completed === true
        }).length
        let percentChaptersCompleted = Math.round((chaptersCompleted / chaptersTotal) * 100);
        let percentChaptersLeftToComplete = 100 - percentChaptersCompleted;

        //calculated overall progress
        let bookTotalProgress = this.state.book.totalProgress;
        let bookExpectedLength = this.state.book.totalExpectedLength;
        let totalPercentCompleted = Math.round((bookTotalProgress / bookExpectedLength) * 100);
            
            return (
                <React.Fragment>
                <li>{chaptersCompleted}/{chaptersTotal} chapters written! {percentChaptersCompleted}% complete</li>
                <li>{bookTotalProgress} of {bookExpectedLength} words written! {totalPercentCompleted}% complete</li>
                </React.Fragment>
            )
            
        
    }

    renderChapterProgress() {
        return this.state.bookGoals.chapters.map(goal => {
            let totalGoal = goal.quantity;
            let amountCompleted = goal.progress;
            let percentCompleted = Math.round(( amountCompleted / totalGoal ) * 100);
            let percentLeftToComplete = 100 - percentCompleted;
            
            return (
                <li></li>
            )
            
        })
    }


    render() {
        return (
            <Container id="progress-container" fluid>
                <Row>
                    <Col>
                <h2>Progress</h2>
                    <ul>
                        {this.renderTotalProgress()}
                    </ul>
                    </Col>
                </Row>
            </Container>
        )
    }
}

function mapStateToProps(state) {
    return {
     user: state.userData
    };
  }

// function mapDispatchToProps(dispatch) {
//     return bindActionCreators(
//         { logoutUser },
//         dispatch
//     );
//   }
  
  export default connect(mapStateToProps, null)(Progress);
  


