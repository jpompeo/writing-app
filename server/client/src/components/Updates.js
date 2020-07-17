import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Container, Col, Row } from 'react-bootstrap';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import '../styles/Updates.css'
import { getUserData } from '../actions'
import Moment from 'moment';
import _ from 'lodash';


class Updates extends Component {
  constructor(props) {
    super(props)

    this.renderUpdates = this.renderUpdates.bind(this)
  }

renderUpdates() {
  let userUpdates = this.props.user.updates;
if (userUpdates) {
 let updates = _.sortBy(userUpdates, (update => { 
    let sortByDate = update.date || update.createdAt; return sortByDate ;
  }))

  updates.reverse();

  return updates.map(update => {
    let sampleChapter = update.chapterUpdates[0];
    let chapterBook = this.props.user.books.find(book => {
      return book.title == sampleChapter.bookTitle
    })
    let chapterExpectedLength = chapterBook.chapters.find(chapter => {
      return chapter.title = sampleChapter.chapterTitle;
    }).expectedLength;

    let bookProgress = Math.round((update.dailyWordCount / chapterBook.expectedLength) * 100);
    
    return (

      <VerticalTimelineElement
      className="vertical-timeline-element"
      contentStyle={{ background: '#6BBEC9', color: '#fff', border: '#fff solid 1px' }}
      contentArrowStyle={{ borderRight: '7px solid  #fff' }}
      date={Moment(update.date || update.created).format('MMM D YYYY')}
      iconStyle={{ background: '#6BBEC9', color: '#fff' }}
      // icon={<WorkIcon />}
      >
    <p className="update-subtitle">Updated Chapter {sampleChapter.chapterNumber}: {sampleChapter.chapterTitle}</p>
    <hr/>
    <p className="update-title">{update.dailyWordCount} words written</p>
    <hr/>
    <p className="update-text">
      Completed {bookProgress > 0 ? bookProgress : 3 }% more of {chapterBook.title}!
    </p>
  </VerticalTimelineElement>

)
  })
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
            <Container id="update-container" fluid>
                <Row>
                    <Col>
                        
                        <VerticalTimeline>
          {this.renderUpdates()}

  {/* <VerticalTimelineElement
    className="vertical-timeline-element--work"
    contentStyle={{ background: '#6BBEC9', color: '#fff', border: "2px solid #fff" }}
    contentArrowStyle={{ borderRight: '7px solid  #fff' }}
    date={Moment('2020-07-17T18:20:28.120Z').format('MMM D YYYY')}
    iconStyle={{ background: '#6BBEC9', color: '#fff' }}
    // icon={<WorkIcon />}
  >
    <h3 className="vertical-timeline-element-title">Creative Director</h3>
    <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
    <p>
      Creative Direction, User Experience, Visual Design, Project Management, Team Leading
    </p>
  </VerticalTimelineElement>
  <VerticalTimelineElement
    className="vertical-timeline-element--work"
    date="2010 - 2011"
    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
    // icon={<WorkIcon />}
  >
    <h3 className="vertical-timeline-element-title">Art Director</h3>
    <h4 className="vertical-timeline-element-subtitle">San Francisco, CA</h4>
    <p>
      Creative Direction, User Experience, Visual Design, SEO, Online Marketing
    </p>
  </VerticalTimelineElement>
  <VerticalTimelineElement
    className="vertical-timeline-element--work"
    date="2008 - 2010"
    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
    // icon={<WorkIcon />}
  >
    <h3 className="vertical-timeline-element-title">Web Designer</h3>
    <h4 className="vertical-timeline-element-subtitle">Los Angeles, CA</h4>
    <p>
      User Experience, Visual Design
    </p>
  </VerticalTimelineElement>
  <VerticalTimelineElement
    className="vertical-timeline-element--work"
    date="2006 - 2008"
    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
    // icon={<WorkIcon />}
  >
    <h3 className="vertical-timeline-element-title">Web Designer</h3>
    <h4 className="vertical-timeline-element-subtitle">San Francisco, CA</h4>
    <p>
      User Experience, Visual Design
    </p>
  </VerticalTimelineElement>
  <VerticalTimelineElement
    className="vertical-timeline-element--education"
    date="April 2013"
    iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
    // icon={<SchoolIcon />}
  >
    <h3 className="vertical-timeline-element-title">Content Marketing for Web, Mobile and Social Media</h3>
    <h4 className="vertical-timeline-element-subtitle">Online Course</h4>
    <p>
      Strategy, Social Media
    </p>
  </VerticalTimelineElement>
  <VerticalTimelineElement
    className="vertical-timeline-element--education"
    date="November 2012"
    iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
    // icon={<SchoolIcon />}
  >
    <h3 className="vertical-timeline-element-title">Agile Development Scrum Master</h3>
    <h4 className="vertical-timeline-element-subtitle">Certification</h4>
    <p>
      Creative Direction, User Experience, Visual Design
    </p>
  </VerticalTimelineElement>
  <VerticalTimelineElement
    className="vertical-timeline-element--education"
    date="2002 - 2006"
    iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
    // icon={<SchoolIcon />}
  >
    <h3 className="vertical-timeline-element-title">Bachelor of Science in Interactive Digital Media Visual Imaging</h3>
    <h4 className="vertical-timeline-element-subtitle">Bachelor Degree</h4>
    <p>
      Creative Direction, Visual Design
    </p>
  </VerticalTimelineElement>
  <VerticalTimelineElement
    iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
    // icon={<StarIcon />}
  /> */}


</VerticalTimeline>


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

export default connect(mapStateToProps, null)(Updates);




