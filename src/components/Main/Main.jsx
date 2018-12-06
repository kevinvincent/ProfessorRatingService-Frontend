import React, { Component } from 'react';
import {
   Register, SignIn, ConfDialog,
   SearchPage, ProfessorCourse,
   NewProfCourse
} from '../index'
import { Route, Switch, Redirect } from 'react-router-dom';
import {
   Navbar, Nav, NavItem,
   ListGroup, ListGroupItem, Glyphicon
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './Main.css';

const qs = require('query-string');

class Main extends Component {
   signedIn() {
      return Object.keys(this.props.Prss).length !== 0; // Nonempty Prss obj
   }

   render() {
      console.log("Rendering main " + JSON.stringify(this.props));
      return (
         <div>
            <div>
               <Navbar>
                  <Navbar.Toggle />
                  <Navbar.Collapse>
                     <Nav>
                        <LinkContainer key={1} to="/">
                           <NavItem>
                              <Glyphicon glyph="star" /> POLYRATINGS 2
                           </NavItem>
                        </LinkContainer>
                        <LinkContainer key={2} to="/newProfessorCourse">
                           <NavItem>Submit New Professor / Course</NavItem>
                        </LinkContainer>
                     </Nav>
                     {this.signedIn() ?
                        <Nav pullRight>
                           <Navbar.Text key={1}>
                              <Glyphicon glyph="user" /> {
                                 `${this.props.Prss.firstName} 
                                 ${this.props.Prss.lastName}`}
                           </Navbar.Text>
                           <NavItem eventKey={1}
                              onClick={() => this.props.signOut()}>
                              Sign out
                           </NavItem>
                        </Nav>
                        :
                        <Nav pullRight>
                           <LinkContainer key={2} to="/signin">
                              <NavItem>Sign In</NavItem>
                           </LinkContainer>
                           <LinkContainer key={3} to="/register">
                              <NavItem>
                                 Register
                               </NavItem>
                           </LinkContainer>
                        </Nav>
                     }
                  </Navbar.Collapse>
               </Navbar>
            </div>

            {/*Alternate pages beneath navbar, based on current route*/}
            <Switch>
               <Route exact path='/' render={() =>
                  <SearchPage {...this.props} />} />
               <Route path='/newProfessorCourse' render={() =>
                  !this.signedIn() ?
                     <Redirect to='/signin?after=/newProfessorCourse' /> :
                     <NewProfCourse {...this.props} />
               } />
               <Route path="/ProfessorCourse/:id" render={(props) =>
                  <ProfessorCourse {...this.props}
                     params={props.match.params}
                     search={qs.parse(props.location.search,
                        { ignoreQueryPrefix: true })} />} />
               <Route path='/signin'
                  render={(props) =>
                     <SignIn {...this.props}
                        search={qs.parse(props.location.search,
                           { ignoreQueryPrefix: true })} />} />
               <Route path='/register'
                  render={() => <Register {...this.props} />} />
            </Switch>

            {/*Error popup dialog*/}
            <ConfDialog
               show={this.props.Errs.length > 0}
               title="Error Notice"
               body={<ListGroup>
                  {this.props.Errs.map(
                     (err, i) => <ListGroupItem key={i} bsStyle="danger">
                        {err}
                     </ListGroupItem>
                  )}
               </ListGroup>}
               buttons={['OK']}
               onClose={() => { this.props.clearErrors() }}
            />
         </div>
      )
   }
}

export default Main
