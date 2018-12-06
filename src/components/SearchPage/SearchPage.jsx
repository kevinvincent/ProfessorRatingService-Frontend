import React, { Component, createElement } from 'react';
import {
   Col, FormControl, Button,
   Grid, Row, Alert, Glyphicon
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './SearchPage.css';
import SearchResult from '../SearchResult/SearchResult'

class SearchPage extends Component {
   constructor(props) {
      super(props);

      // Current login state
      this.state = {
         searchField: ''
      }

      this.props.loadProfs();

      // bind 'this' to the correct context
      this.handleChange = this.handleChange.bind(this);
   }

   // Continually update state as letters typed. Rerenders, but no DOM change!
   handleChange(event) {
      const newState = {}
      newState[event.target.name] = event.target.value;
      this.setState(newState);
   }

   render() {
      console.log("Rendering SearchPage" + JSON.stringify(this.props));

      let results = this.props.Pcs
         .filter((item) =>
            item.prof.toLowerCase()
               .includes(this.state.searchField.toLowerCase()))

      return (
         <div>
            <section className="container">
               <Grid>
                  <Row>
                     <Col>
                        <h3><Glyphicon glyph="filter" /> Search Professors
                           / Courses
                        </h3>
                        <FormControl
                           type="text"
                           name="searchField"
                           placeholder=""
                           value={this.state.searchField}
                           onChange={this.handleChange}
                           autoComplete="off"
                           autoFocus
                        />
                     </Col>
                  </Row>
               </Grid>
               <Grid className="results">
                  <Row>
                     <Col>
                        {results.length ? results.map((item) =>
                           <SearchResult {...this.props} item={item} />
                        ) : this.state.searchField ?
                              <Alert bsStyle="warning">
                                 <strong>No results!</strong> Try searching
                                 for another professor
                              </Alert> :
                              ''
                        }
                        <Link to="/newProfessorCourse">
                           <Button bsStyle="primary">
                              <Glyphicon glyph="plus-sign" /> Submit New
                              Professor / Course
                           </Button>
                        </Link>
                     </Col>
                  </Row>
                  <br /><br /><br />
               </Grid>
            </section>
         </div>
      )
   }
}

export default SearchPage;
