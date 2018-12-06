import React, { PureComponent } from 'react';
import { Modal, Button, FormControl } from 'react-bootstrap';

/**
 * Properties expected:
 * show: boolean
 * body: string
 * buttons: Array<string>
 */
export default class PromptDialog extends PureComponent {
   constructor(props) {
      super(props);

      this.state = {
         value: ''
      };

      this.handleChange = this.handleChange.bind(this);
   }

   close(result) {
      this.props.onClose(result)
   }

   handleChange(e) {
      this.setState({ value: e.target.value });
   }

   render() {
      console.log("Rendering PromptDialog");
      return (
         <Modal show={this.props.show} onHide={() => this.close("Dismissed")}>
            <Modal.Header closeButton>
               <Modal.Title>{this.props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <FormControl
                  type="text"
                  name="input"
                  placeholder=""
                  value={this.state.value}
                  onChange={this.handleChange}
               />
            </Modal.Body>
            <Modal.Footer>
               {this.props.buttons.map((btn, i) => <Button key={i}
                  onClick={() =>
                     this.props.onClose(this.state.value, btn)}>{btn}</Button>)}
            </Modal.Footer>
         </Modal>
      )
   }
}
