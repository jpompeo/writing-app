import React, { Component } from "react";
import { Container, Col, Row } from 'react-bootstrap';
import '../styles/Goals.css';
import { getUserData } from '../actions'

class Goals extends Component {
    constructor(props) {
        super(props)
        this.state = {
            chapterGoals: [
                {
                    id: "c1",
                    title: 'Lost in the Woods',
                    deadline: '8/13/20',
                    draft: 'Final'
                }
            ],
            recurringGoals: [
                {   
                    id: "r4",
                    quantity: 1000,
                    item: 'word',
                    timeline: 'day',
                    progress: 3500
                },
                // {   
                //     id: "r1",
                //     quantity: 30000,
                //     item: 'word',
                //     timeline: 'month',
                //     progress: 3500
                // },
                // {
                //     id:"r2",
                //     quantity: 2,
                //     item: 'hour',
                //     timeline: 'day',
                //     progress: 1
                // },
                // {
                //     id: "r3",
                //     quantity: 5,
                //     item: 'day',
                //     timeline: 'week',
                //     progress: 3
                // }
            ]
        }

        this.renderDailyGoals = this.renderDailyGoals.bind(this);
        this.renderChapterGoals = this.renderChapterGoals.bind(this);
    }

    renderDailyGoals() {
        return this.state.recurringGoals.map(goal => {
            return (
                <li>{goal.quantity} {goal.item}s per {goal.timeline}</li>
            )
        })
    }

    renderChapterGoals() {
        return this.state.chapterGoals.map(goal => {
            return (
                <li>{goal.draft} draft of {goal.title} by {goal.deadline}</li>
            )
        })
    }


    render() {
        return (
            <Container id="goal-container" fluid>
                <Row>
                    <Col>
                        {/* <h2>Goals</h2> */}
                        <h4>Resolutions</h4>
                        <ul className="daily-goals-list">
                            {this.renderDailyGoals()}
                        </ul>
                        <h4>Story Map</h4>
                        <ul className="daily-goals-list">
                            {this.renderChapterGoals()}
                        </ul>

                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Goals;