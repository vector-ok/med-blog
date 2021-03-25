import React, { Component } from "react";
import { MDBContainer, MDBView, MDBCard, MDBCardImage, MDBMask, MDBCardTitle, MDBCardText, MDBCardBody, MDBIcon, MDBRow, MDBCol } from "mdbreact";
import { withRouter } from 'react-router-dom';
import contact from '../assets/images/smartphone.png';

class Profile extends Component {

  render(){
    return(
      <div>
        <MDBContainer className="bg-light pt-1 mb-5" fluid>
          <div className="row my-5 pt-5">
            <div className="col-12 d-flex">
              <img className="d-none d-sm-block img-fluid w-25 float-left border-right border-light" src={contact} alt="hand holding smartphone" />
              {/* <img className="d-block d-sm-none img-fluid img-xs float-left align-self-end mt-5" src={contact} alt="hand holding smartphone" /> */}
              <div className="align-self-center text-center">
                <h1 className="d-none d-sm-block display-4 pl-4">Profile</h1>
                <h2 className="d-block d-sm-none display-5-responsive pl-0">Profile</h2>
              </div>
            </div>
          </div>
        </MDBContainer>

      { this.props.writer ?
          <MDBContainer fluid className="my-1">
            <MDBRow className="">
            <MDBCol md="4" className=" mx-auto">
          <div className="card-group my-1">
            <MDBCard personal className="mb-md-0 mb-4">
              <h3 className="mx-auto"> {this.props.writer.author.username}</h3>
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
