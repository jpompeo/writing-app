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
console.log("THIS PROPS CURRENT BOOK (UPDATES)", this.props.currentBook)
    if (this.props.updates) {


      //find updates for currently selected book
      const currentBookUpdates = this.props.updates.filter(update => {
        return update.bookTitle === this.props.currentBook.title;
      });

      if (currentBookUpdates) {
        let updates = _.sortBy(currentBookUpdates, (update => {
          let sortByDate = update.date || update.createdAt;
          return sortByDate;
        }))

        updates.reverse();

        return updates.map((update, index) => {

          let sampleChapter = update.chapterUpdates[Math.floor(Math.random() * update.chapterUpdates.length)];

          let bookProgress = Math.round((sampleChapter.progress / this.props.currentBook.expectedLength) * 100);


          if (index < 20) {

            return (

              <VerticalTimelineElement
                key={update._id}
                className="vertical-timeline-element"
                contentStyle={{ background: '#F5D76B', color: '#fff', border: '#fff solid 1px' }}
                contentArrowStyle={{ borderRight: '7px solid  #fff' }}
                date={Moment(update.date || update.created).format('MMM D YYYY')}
                iconStyle={{ background: '#6BBEC9', color: '#fff' }}
              // icon={<WorkIcon />}
              >
                
                <p className="update-subtitle">{sampleChapter.completed ? `COMPLETED Chapter ${sampleChapter.chapterNumber}: ${sampleChapter.chapterTitle}!` : `Updated Chapter ${sampleChapter.chapterNumber}: ${sampleChapter.chapterTitle}`}</p>
                <hr />
                <p className="update-title">{sampleChapter.progress} words written</p>
                <hr />
                <p className="update-text">
                  Completed {bookProgress > 0 ? bookProgress : 3}% more of your book!
    </p>
              </VerticalTimelineElement>

            )
          }

        })
      }
    }
  } else {
    return (

      <VerticalTimelineElement
        // key={}
        className="vertical-timeline-element"
        contentStyle={{ background: '#6BBEC9', color: '#fff', border: '#fff solid 1px' }}
        contentArrowStyle={{ borderRight: '7px solid  #fff' }}
        date={Moment(new Date()).format('MMM D YYYY')}
        iconStyle={{ background: '#6BBEC9', color: '#fff' }}
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
            <SimpleBar style={{ maxHeight: 600 }}>

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




