import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBIcon, MDBBtn, MDBInput } from "mdbreact";
import axios from 'axios';
import contact from '../assets/images/smartphone.png';


class Contact extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      email: '',
      subject: '',
      msg: '',
      dataSent: ''
    }
  }

  submitHandler = (e) => {
    e.preventDefault();
    const API_PATH = 'http://forexample.com';
    axios({
      method: 'post',
      url: API_PATH,
      headers: {
        'content-type': 'application/json'
      },
      data: this.state
    })
    .then(result => {
      console.log(result.data);
      this.setState({
        dataSent: result.data.sent
      })
      console.log(this.state);
    })
    .catch(error => this.setState({
      error: error.message
    }));
  }

  render () {
  return (
    <div className="pb-5">
      <MDBContainer className="bg-light pt-1 mb-5" fluid>
        <div className="row my-5 pt-5">
          <div className="col-12 d-flex">
            <img className="d-none d-sm-block img-fluid w-25 float-left border-right border-light" src={contact} alt="hand holding smartphone" />
            <img className="d-block d-sm-none img-fluid img-xs float-left align-self-end mt-5" src={contact} alt="hand holding smartphone" />
            <div className="align-self-center text-center">
              <h1 className="d-none d-sm-block display-4 pl-4">Contact Us</h1>
              <h2 className="d-block d-sm-none display-5-responsive pl-0">Contact Us</h2>
            </div>
          </div>
        </div>
      </MDBContainer>
      <section className="my-5 px-2">
        <p className="text-center w-responsive mx-auto pb-5">
          Feel free to write to us here. Alternatively, you can make plans to visit us at our office address. We also encourage you to join the conversation on any of our social media handles
        </p>
        <MDBRow className="mx-2 my-5">
          <MDBCol lg="5" className="lg-0 mb-4">
            <MDBCard>
              <MDBCardBody>
                <div className="modal-header z-depth-2 white-text pink py-2">
                  <h3 className="mt-2">
                    <MDBIcon icon="envelope" /> Message Us
                  </h3>
                </div>
                <small className="dark-grey-text">
                  Submit your message and we'll get back to you where neccesary.
                </small>
                <form onSubmit={this.submitHandler}>
                  <div className="md-form">
                    <MDBInput
                      icon="user"
                      label="Your name"
                      iconClass="grey-text"
                      type="text"
                      id="form-name"
                      value={this.state.name}
                      onChange={e => this.setState({name: e.target.value})}
                    />
                  </div>
                  <div className="md-form">
                    <MDBInput
                      icon="envelope"
                      label="Your email"
                      iconClass="grey-text"
                      type="email"
                      id="form-email"
                      value={this.state.email}
                      onChange={e => this.setState({email: e.target.value})}
                    />
                  </div>
                  <div className="md-form">
                    <MDBInput
                      icon="tag"
                      label="Subject"
                      iconClass="grey-text"
                      type="text"
                      id="form-subject"
                      value={this.state.subject}
                      onChange={e => this.setState({subject: e.target.value})}
                    />
                  </div>
                  <div className="md-form">
                    <MDBInput
                      icon="pencil-alt"
                      label="Your message"
                      iconClass="grey-text"
                      type="textarea"
                      id="form-text"
                      value={this.state.msg}
                      onChange={e => this.setState({msg: e.target.value})}
                    />
                  </div>
                  <div className="text-center">
                    {this.state.dataSent ?
                      <p className="blue-text">
                        SUCCESS <span><MDBIcon icon="check"/></span> <br/><br/>
                        Thanks for writing us. We'll get back to you where necessary.
                      </p>
                    :
                      ''
                    }
                    <MDBBtn color="pink" className="rounded" type="submit">Submit
                      <MDBIcon icon="paper-plane" className="ml-2" />
                    </MDBBtn>
                  </div>
                </form>
              </MDBCardBody>
            </MDBCard>
            <MDBCol align="center" className="mt-2">
              <MDBBtn tag="a" color="" className="rounded accent-1">
                <MDBIcon size="2x" fab icon="facebook" className="mx-0 grey-text" />
              </MDBBtn>
              <MDBBtn tag="a" color="" className="rounded accent-1">
                <MDBIcon size="2x" fab icon="twitter" className="mx-0 grey-text" />
              </MDBBtn>
              <MDBBtn tag="a" color="" className="rounded accent-1">
                <MDBIcon size="2x" fab icon="instagram" className="mx-0 grey-text" />
              </MDBBtn>
            </MDBCol>
          </MDBCol>
          <MDBCol lg="7">
            <div
              id="map-container"
              className="rounded z-depth-1-half map-container"
              style={{ height: "400px" }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15857.008962247008!2d3.3479241719562207!3d6.489710445564495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8c0cfbf69feb%3A0x4dc04e0a523daf8c!2s25%20Bode%20Thomas%20St%2C%20Surulere%2C%20Lagos!5e0!3m2!1sen!2sng!4v1590209411017!5m2!1sen!2sng"
                title="Our office"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
              />
            </div>
            <br />
            <MDBRow className="text-center">
              <MDBCol md="4">
                <MDBBtn tag="a" floating color="" className="rounded grey-text">
                  <MDBIcon size="2x" icon="map-marker-alt" className="" />
                </MDBBtn>
                <p className="mb-md-0">25 Example Street, Surulere, Lagos,</p>
                <p className="mb-md-0">Nigeria</p>
              </MDBCol>
              <MDBCol md="4">
                <MDBBtn tag="a" floating color="" className="rounded accent-1 grey-text">
                  <MDBIcon size="2x" icon="envelope" className="" />
                </MDBBtn>
                <p className="mb-md-0"><a href="mailto: udeme@example.com" className="black-text">udeme@example.com</a> </p>
                <p className="mb-md-0">P. O. Box 0000, Surulere, Lagos, Nigeria.</p>
              </MDBCol>
              <MDBCol md="4">
                <MDBBtn tag="a" floating color="" className="rounded accent-1 grey-text">
                  <MDBIcon size="2x" icon="phone" className="" />
                </MDBBtn>
                <p className="mb-md-0"><a href="tel: +234 800 000 000" className="black-text">+234 800 000 000</a> </p>
                <p className="mb-md-0"><a href="+234 800 000 000" className="black-text">+234 800 000 000</a></p>
                <p className="mb-md-0"><a href="tel: +234 800 000 000" className="black-text">+234 800 000 000</a></p>
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </section>
    </div>
  );
}
}

export default Contact;
