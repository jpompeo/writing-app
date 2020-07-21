import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Container, Col, Row } from 'react-bootstrap';
import { VerticalTimeline, VerticalTimelineElement, VerticalLoadMore } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import '../styles/Updates.css'
import { getUserData } from '../actions'
import Moment from 'moment';
import _ from 'lodash';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';


class Updates extends Component {
  constructor(props) {
    super(props)

    this.renderUpdates = this.renderUpdates.bind(this)
  }

  renderUpdates() {
    if (this.props.currentBook.title) {
    if (this.props.updates) {

      //find updates for currently selected book
      const currentBookUpdates = this.props.updates.filter(update => {
        return update.bookTitle === this.props.currentBook.title;
      });

      if (currentBookUpdates.length > 0) {
        let updates = _.sortBy(currentBookUpdates, (update => {
          let sortByDate = update.date || update.createdAt;
          return sortByDate;
        }))

        updates.reverse();

        return updates.map((update, index) => {

          let sampleChapter = update.chapterUpdate;

          let bookProgress = Math.round((sampleChapter.progress / this.props.currentBook.expectedLength) * 100);


          if (index < 20) {

            return (

              <VerticalTimelineElement
                key={update._id}
                className="vertical-timeline-element"
                contentStyle={{ background: 'rgba(107, 190, 201, .7)', color: '#fff', border: 'rgba(107, 190, 201, 1) solid 4px', boxShadow: '3px 3px 4px rgba(0, 0, 0, .2)' }}
                contentArrowStyle={{ borderRight: '18px solid  rgba(107, 190, 201, 1)' }}
                date={Moment(update.date || update.created).format('MMM D YYYY')}
                iconStyle={{ background: 'rgba(107, 190, 201, .8)', color: '#fff'}}
              // icon={<WorkIcon />}
              >
                
                <p className="update-subtitle"><span id="update-type">{sampleChapter.completed ? "COMPLETED" : "Updated"}</span> Chapter {sampleChapter.chapterNumber}: {sampleChapter.chapterTitle}!</p>
                <hr />
                <p className="update-title">{sampleChapter.progress} words written</p>
                <hr />
                <p className="update-text">
                 <span id="update-percent"> {bookProgress > 0 ? bookProgress : 3}%</span> closer to finishing your book!
    </p>
              </VerticalTimelineElement>

            )
          }

        })
      } else {
        return (

          <VerticalTimelineElement
            // key={}
            className="vertical-timeline-element"
            contentStyle={{ background: 'rgba(107, 190, 201, .7)', color: '#fff', border: 'rgba(107, 190, 201, 1) solid 4px', boxShadow: '3px 3px 4px rgba(0, 0, 0, .2)' }}
            contentArrowStyle={{ borderRight: '18px solid  rgba(107, 190, 201, 1)' }}
            date={Moment(new Date()).format('MMM D YYYY')}
            iconStyle={{ background: 'rgba(107, 190, 201, .8)', color: '#fff' }}
            >
            <hr />
            <p className="update-subtitle">No updates yet</p>
            <p className="update-title">Start writing today!</p>
            <hr />
          </VerticalTimelineElement>
    
        )
      }
    }
  } else {
    return (

      <VerticalTimelineElement
        // key={}
        className="vertical-timeline-element"
        contentStyle={{ background: 'rgba(107, 190, 201, .7)', color: '#fff', border: 'rgba(107, 190, 201, 1) solid 4px', boxShadow: '3px 3px 4px rgba(0, 0, 0, .2)' }}
        contentArrowStyle={{ borderRight: '18px solid  rgba(107, 190, 201, 1)' }}
        date={Moment(new Date()).format('MMM D YYYY')}
        iconStyle={{ background: 'rgba(107, 190, 201, .8)', color: '#fff'}}
        >
        <hr />
        <p className="update-title">Select a book to view recent updates!</p>
        <hr />
      </VerticalTimelineElement>

    )
  }
  }

  componentDidMount() {
    // this.props.getUserData('bestselling_author1')

    console.log("update page props", this.props)
  }

  componentDidUpdate() {
    // this.props.getUserData('bestselling_author1')

    console.log("update page UPDATED props", this.props)
  }


  render() {
    return (
      // <div className="scrollbar-container">

      <Container id="update-container" fluid>
        <Row>
          <Col>
            <SimpleBar style={{ maxHeight: '200vh' }}>

              <VerticalTimeline>
                {this.renderUpdates()}

              </VerticalTimeline>

            </SimpleBar>
          </Col>
        </Row>
      </Container>
      // </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentBook: state.currentBook,
    updates: state.userData.updates
  };
}

export default connect(mapStateToProps, null)(Updates);




