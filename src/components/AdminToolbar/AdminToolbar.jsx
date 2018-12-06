import React, { Component } from 'react';
import {
   Button, Glyphicon
} from 'react-bootstrap';

import './AdminToolbar.css';

class AdminToolbar extends Component {
   render() {
      console.log("Rendering AdminToolbar " + JSON.stringify(this.props));
      return (
         <div>
            <hr />
            <Button bsStyle="danger" bsSize="small"
               onClick={this.props.onDelete}>
               <Glyphicon glyph="trash" /> Delete
            </Button>
         </div>
      )
   }
}

export default AdminToolbar;
