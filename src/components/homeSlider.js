import React, { Component } from "react";
import { Jumbotron, Button } from 'react-bootstrap'
import back from '../images/back.jpg';
import side from '../images/slide3.jpeg';
import images from '../images/images.jpeg';
import "../css/home.css";

export class HomeSlider extends Component {
  render() {
    return (
     <>
     <img src={side} className="backside" />
      <Jumbotron className="container good">
        <h1>Welcome to Flit Chat</h1>
        <p>
          This is a simple hero unit, a simple jumbotron-style component for calling
          extra attention to featured content or information.
        </p>
        <p>
          {/* <Button variant="primary">Learn more</Button> */}
        </p>
      </Jumbotron>
     </>
    )
  }
}

export default HomeSlider
