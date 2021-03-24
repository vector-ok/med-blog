import React, { Component } from "react";
import { MDBContainer, MDBView, MDBCard, MDBCardImage, MDBMask, MDBCardTitle, MDBCardText, MDBCardBody, MDBIcon, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBBtn, MDBRow, MDBCol, MDBInput, MDBAlert } from "mdbreact";
import { BrowserRouter as Router, withRouter, Link } from 'react-router-dom';
import axios from "axios";

class Profile extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div>
      { this.props.writer ?

          <MDBContainer fluid className="my-5 pt-5">
            <h1 className="mt-3">Profile</h1>
            <MDBRow className="">
            <MDBCol lg="6" className=" mx-auto">
          <div className="card-group my-5">
            <MDBCard personal className="mb-md-0 mb-4">
              <h3 className=" mx-auto">{this.props.writer.author.username}</h3>
              <MDBView hover>
                <MDBCardImage
                  top
                  src={this.props.writer.author.image ? this.props.writer.author.image : "https://mdbootstrap.com/img/Photos/Avatars/img%20(26).jpg"}
                  alt="writer"
                />
                <a href="#!">
                  <MDBMask overlay="white-slight" />
                </a>
              </MDBView>
              <MDBCardBody>
                <a href="#!">
                  <MDBCardTitle className="pink-text">{this.props.writer.author.username}</MDBCardTitle>
                </a>
                <a href="#!" className="card-meta black-text">
                  {this.props.writer.author.bio ? this.props.writer.author.bio : "Bio not shared!"}
                </a>
                <MDBCardText className="black-text">
                  {this.props.writer.author.description ? this.props.writer.author.description : " "}
                </MDBCardText>
                <hr />
                <a href="#!" className="card-meta">
                  <span className="black-text">
                    <MDBIcon icon="user" className="pr-1" />
                    {this.props.writer.author.following ? this.props.writer.author.following : 'You are not following this writer.'}
                  </span>
                </a>
                <p className="card-meta float-right">Joined in 2012</p>
              </MDBCardBody>
            </MDBCard>
          </div>
          </MDBCol>
        </MDBRow>
            {console.log('this props ', this.props)}
            {/* {this.props.writer.author.username} */}
          </MDBContainer> : " "}
      </div>
    )
  }
}

export default withRouter(Profile);
