import React, { Component, createElement } from 'react';
import {
   Button, Glyphicon, ListGroup, ListGroupItem
} from 'react-bootstrap';
import NewRating from '../NewRating/NewRating'
import AdminToolbar from '../AdminToolbar/AdminToolbar'
import './ProfessorCourse.css';

class ProfessorCourse extends Component {
   constructor(props) {
      super(props);

      this.state = {
         showAddRating: this.props.search.showAddRating === 'true'
      }

      this.props.loadRatings(this.props.params.id);

      if (this.props.Pcs.length === 0)
         this.props.loadProfs();

      this.newRating = this.newRating.bind(this);
      this.newRatingOnClose = this.newRatingOnClose.bind(this);
   }

   newRating() {
      if (!this.props.Prss.id)
         this.props.history.push(
            "/signin?after=/ProfessorCourse/" +
            this.props.params.id +
            "showAddRating=true");
      else
         this.setState({ showAddRating: true })
   }

   newRatingOnClose() {
      this.setState({ showAddRating: false })
      this.props.loadProfs();
   }

   scrollToBottom() {
      this.scrollBottom.scrollIntoView({ behavior: 'smooth' })
   }

   componentDidMount() {
      if (this.state.showAddRating)
         this.scrollToBottom();
   }

   componentDidUpdate() {
      if (this.state.showAddRating)
         this.scrollToBottom();
   }

   deleteRating = (event, pcId, ratingId) => {
      this.props.deleteRating(pcId, ratingId, () => {
         this.props.loadProfs();
      })
   }

   render() {
      console.log("Rendering ProfessorCourse" + JSON.stringify(this.props));

      let pc = this.props.Pcs.find((item) =>
         item.id === parseInt(this.props.params.id))

      let ratings = (pc && this.props.Ratings[pc.id]) || []

      return (
         <section className="container">
            {pc ?
               <div className="fx-container">
                  <div className="fx-item-main">
                     <h2><Glyphicon glyph="user" /> {pc.prof} <small>
                        {pc.dept} {pc.course}</small></h2>
                  </div>
                  <div>
                     {pc.avgRating ?
                        <h2>{pc.avgRating.toFixed(2)}/4.00 <small>
                           Avg Rating</small></h2> :
                        ''
                     }
                  </div>
               </div> : ''}
            <hr />
            <ListGroup>
               {ratings.sort((a, b) =>
                  new Date(a.whenMade) - new Date(b.whenMade))
                  .map(rating =>
                     <ListGroupItem>
                        <div className="fx-container">
                           <div className="fx-item-main">
                              <h4>Comments<br /><small>Posted on: {
                                 new Intl.DateTimeFormat('en-US')
                                    .format(new Date(rating.createDate))
                              }</small></h4>
                           </div>
                           <div>
                              <h4>{rating.profRating.toFixed(2)} <small>
                                 Rating</small></h4>
                           </div>
                        </div>
                        <p>{rating.profContent}<br />{rating.courseContent}</p>
                        {this.props.Prss && this.props.Prss.role ?
                           <AdminToolbar onDelete={(event) =>
                              this.deleteRating(event, rating.pcId, rating.id)
                           } />
                           :
                           ''
                        }
                     </ListGroupItem>
                  )}
            </ListGroup>
            <div ref={(el) => { this.scrollBottom = el; }}>
               {this.state.showAddRating ?
                  <NewRating {...this.props} item={pc}
                     onClose={this.newRatingOnClose} />
                  :
                  <div className="pull-right">
                     <Button bsStyle="primary" onClick={this.newRating}>
                        Submit a Rating
                     </Button>
                  </div>
               }
               <br /><br /><br />
            </div>
         </section>
      )
   }
}

export default ProfessorCourse;
