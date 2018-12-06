import React, { Component } from 'react';
import { ConfDialog } from '../index';
import {
   FormGroup, ControlLabel, FormControl, HelpBlock, Button
} from 'react-bootstrap';

import './NewProfCourse.css';

// Functional component label plus control w/optional help message
function FieldGroup({ id, label, help, ...props }) {
   return (
      <FormGroup controlId={id}>
         <ControlLabel>{label}</ControlLabel>
         <FormControl {...props} />
         {help && <HelpBlock>{help}</HelpBlock>}
      </FormGroup>
   );
}

class NewProfCourse extends Component {
   constructor(props) {
      super(props);
      this.state = {
         firstName: '',
         lastName: '',
         course: null,
         dept: '',
         offerNewRating: false,
         newlyCreatedId: null
      }
      this.handleChange = this.handleChange.bind(this);
   }

   submit() {
      this.props.postProfCourse({
         prof: `${this.state.lastName}, ${this.state.firstName}`,
         course: this.state.course,
         dept: this.state.dept
      }, (pcId) => {
         this.setState({ offerNewRating: true, newlyCreatedId: pcId })
      });
   }

   handleChange(ev) {
      let newState = {};

      switch (ev.target.type) {
         case 'checkbox':
            newState[ev.target.id] = ev.target.checked;
            break;
         default:
            newState[ev.target.id] = ev.target.value;
      }
      this.setState(newState);
   }

   formValid() {
      let s = this.state;
      return s.firstName && s.lastName && s.course && s.dept;
   }

   render() {
      console.log("Rendering Register " + JSON.stringify(this.props));
      return (
         <div className="container">
            <h2>Add a new Professor / Course</h2>
            <hr />
            <form>
               <FieldGroup id="firstName" type="text"
                  label="Professor First Name" placeholder="Enter first name"
                  value={this.state.firstName}
                  onChange={this.handleChange}
               />

               <FieldGroup id="lastName" type="text" label="Professor Last Name"
                  placeholder="Enter last name" value={this.state.lastName}
                  onChange={this.handleChange} required={true}
               />

               <FieldGroup id="dept" type="text" label="Department Abbreviation"
                  value={this.state.passwordTwo}
                  placeholder="CS, ECON, POLS, etc."
                  onChange={this.handleChange} required={true}
                  help="Repeat your password"
               />

               <FieldGroup id="course" type="text" label="Course Number"
                  value={this.state.course}
                  placeholder="101, 102, 304, 459, etc."
                  onChange={this.handleChange} required={true}
               />
            </form>

            <Button bsStyle="primary" onClick={() => this.submit()}
               disabled={!this.formValid()}>
               Submit
           </Button>

            <ConfDialog
               show={this.state.offerNewRating}
               title="Successfully added"
               body={`Would you like to submit a rating for
                  ${this.state.lastName}, ${this.state.firstName}?`}
               buttons={['YES', 'NO']}
               onClose={answer => {
                  this.setState({ offerNewRating: false });
                  if (answer === 'YES') {
                     this.props.history.push("/ProfessorCourse/" +
                        this.state.newlyCreatedId +
                        "?showAddRating=true")
                  } else {
                     this.props.history.push(`/`)
                  }
               }}
            />
         </div>
      )
   }
}

export default NewProfCourse;
