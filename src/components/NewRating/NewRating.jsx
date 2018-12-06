import React, { Component } from 'react';
import {
   FormGroup, ControlLabel, FormControl,
   Button, ButtonGroup
} from 'react-bootstrap';

import './NewRating.css';

class NewRating extends Component {
   constructor(props) {
      super(props);

      this.state = {
         profRating: '4',
         courseRating: '4'
      }

      this.handleChange = this.handleChange.bind(this);
   }

   submit() {
      let s = this.state;
      this.props.postRating(this.props.item.id, {
         profRating: parseInt(s.profRating),
         courseRating: parseInt(s.courseRating),
         profContent: s.profContent,
         courseContent: s.courseContent
      }, () => {
         this.props.onClose()
      })
   }

   handleChange(ev) {
      let newState = {};
      newState[ev.target.id] = ev.target.value;
      this.setState(newState);
   }

   formValid() {
      let s = this.state;
      return s.profContent && s.courseContent
         && s.courseRating && s.profRating;
   }

   render() {
      console.log("Rendering NewRating " + JSON.stringify(this.props));
      return (
         <div className="container">
            <h2>Submit New Rating</h2>
            <hr />
            <form>
               <FormGroup controlId="profContent">
                  <ControlLabel>Professor Comments</ControlLabel>
                  <FormControl componentClass="textarea"
                     placeholder="Enter commments on the professor, 
                     teaching style, grading, etc."
                     onChange={this.handleChange} />
               </FormGroup>
               <FormGroup controlId="courseContent">
                  <ControlLabel>Course Comments</ControlLabel>
                  <FormControl componentClass="textarea" 
                     placeholder="Enter comments on the course, course format, 
                     what you liked / disliked about the material, etc."
                     onChange={this.handleChange} />
               </FormGroup>
               <FormGroup controlId="profRating">
                  <ControlLabel>Professor Rating</ControlLabel>
                  <FormControl componentClass="select" placeholder="select"
                     onChange={this.handleChange}>
                     <option value="4">A - 4.00</option>
                     <option value="3">B - 3.00</option>
                     <option value="2">C - 2.00</option>
                     <option value="1">D - 1.00</option>
                     <option value="0">F - 0.00</option>
                  </FormControl>
               </FormGroup>
               <FormGroup controlId="courseRating">
                  <ControlLabel>Course Rating</ControlLabel>
                  <FormControl componentClass="select" placeholder="select"
                     onChange={this.handleChange}>
                     <option value="4">A - 4.00</option>
                     <option value="3">B - 3.00</option>
                     <option value="2">C - 2.00</option>
                     <option value="1">D - 1.00</option>
                     <option value="0">F - 0.00</option>
                  </FormControl>
               </FormGroup>
            </form>

            <ButtonGroup>
               <Button bsStyle="primary" onClick={() => this.submit()}
                  disabled={!this.formValid()}>
                  Submit
               </Button>
               <Button onClick={this.props.onClose}>
                  Cancel
               </Button>
            </ButtonGroup>
         </div>
      )
   }
}

export default NewRating;
