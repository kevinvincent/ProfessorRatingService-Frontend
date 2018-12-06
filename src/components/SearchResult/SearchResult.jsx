import React, { Component, createElement } from 'react';
import {
   Panel, PanelBody, Media, MediaBody
} from 'react-bootstrap';
import './SearchResult.css';

import AdminToolbar from '../AdminToolbar/AdminToolbar'

class SearchResult extends Component {
   constructor(props) {
      super(props);
   }

   handleClick = (event) => {
      this.props.history.push('/ProfessorCourse/' + this.props.item.id);
   }

   deletePc = (event) => {
      this.props.deleteProfCourse(this.props.item.id)
      event.stopPropagation()
   }

   render() {
      console.log("Rendering SearchResult" + JSON.stringify(this.props))

      let item = this.props.item;

      return (
         <Panel className="stylish-panel" onClick={this.handleClick}>
            <Panel.Body>
               <div className="fx-container">
                  <div className="fx-item-main">
                     <h4>{item.prof}</h4>
                     {item.dept} {item.course}
                  </div>
                  <div className="fx-container-vert">
                     {item.avgRating ?
                        [<h4>{item.avgRating.toFixed(2)}</h4>,
                        <div className="text-muted">Rating</div>] :
                        ''
                     }
                  </div>
               </div>
               {this.props.Prss && this.props.Prss.role ?
                  <AdminToolbar onDelete={this.deletePc} /> : ''
               }
            </Panel.Body>
         </Panel>
      )
   }
}

export default SearchResult;
