import React, { Component } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBBtn, MDBIcon, MDBTooltip } from "mdbreact";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import logo from '../assets/images/logo.png';

class Footer extends Component {
  constructor(props){
    super(props)
    this.state= {
      email: '',
      dataSent: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // const data = new FormData(e.target);
    // console.log(this.state.email);
    const API_PATH = 'http://profajayibraces.org/formProcessors/subscribe_form.php';
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
    this.emailSubscriptionStatus();
  }

  emailSubscriptionStatus = () => {
    if (this.state.dataSent) {
      toast.success('Subscription successful!');
      return;
    }
    toast.error('Subscription failed!');
  }

  render () {
    return (
      <div>
        <MDBContainer fluid className="pt-5 mb-1">
          <MDBRow className="">
            <MDBCol align="center" className="col-sm-12 py-3 mdb-color mx-auto  border-bottom-left border-bottom-right">
              {/* {
                this.state.dataSent ?
                  this.emailSubscriptionStatus() :
                  ''
              } */}

              {/* {this.state.dataSent ?
                <p className="yellow-text">
                  SUCCESS <span><MDBIcon icon="check"/></span> <br/><br/>
                  Thanks for subscribing.
                </p>
                :
                <p> Failed. </p>
              } */}
              <form method="POST" onSubmit={this.handleSubmit} >
                <p className="h4 text-lora text-center white-text py-2">
                  <MDBIcon icon="envelope" className="mr-2" />

                Subscribe to receive updates </p>
                {/* <MDBRow className=""> */}
                <fragment className="text-center">
                  <input name="email"
                    type="email"
                    value={this.state.email}
                    onChange={e => this.setState({email: e.target.value})}
                  placeholder="Enter your email address here" className='form-control w-75 mt-2 mx-auto mr-0' />
                  <MDBBtn outline color="white" className="btn rounded" name="submit" type="submit">
                    Send
                    <MDBIcon far icon="paper-plane" className="ml-2" />
                  </MDBBtn>
                </fragment>

              </form>
              <ToastContainer />
            </MDBCol>
          </MDBRow>
        </MDBContainer>

        <footer className="page-footer font-small mdb-color pt-4">

          {/* <!-- Footer Links --> */}
          <div className="container text-center text-md-left">

            {/* <!-- Footer links --> */}
            <div className="row text-center text-md-left mt-3 pb-3">
              <div className="col-lg-2 my-auto mt-3 mx-auto text-center">

              </div>

              {/* <!-- Grid column --> */}
              <div className="col-lg-3 mt-3 mx-auto">
                <h6 className="text-uppercase mb-4 font-weight-bold">About Us</h6>
                <div className="d-flex flex-row align-self-middle mt-3">
                  <p className="my-auto">
                  A demo micro-blogging platform. Lorem Ipsum and so on</p>
                </div>
              </div>
              {/* <!-- Grid column --> */}

              <hr className="w-100 clearfix d-md-none" />

              {/* <!-- Grid column --> */}
              <div className="col-lg-2 mx-auto mt-3 ">
                <h6 className="text-uppercase mb-4 font-weight-bold">Useful links</h6>
                <p>
                  <a href="#!" className="text-capitalize">About Us </a>
                </p>
                <p>
                  <a href="#!" className="text-capitalize">Other</a>
                </p>
                <p>
                  <a href="#!" className="text-capitalize">Our team</a>
                </p>
              </div>

              {/* <!-- Grid column --> */}
              <hr className="w-100 clearfix d-md-none" />

              {/* <!-- Grid column --> */}
              <div className="col-lg-4 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">Contact</h6>
                <p>
                  <i className="fas fa-home mr-3"></i> Lagos, Nigeria</p>
                <p>
                  <i className="fas fa-envelope mr-3"></i> joe@example</p>
                <p>
                  <MDBIcon icon="phone-alt" className="mr-3"></MDBIcon> + 234 800 000 000</p>
              </div>
              {/* <!-- Grid column --> */}

            </div>
            {/* <!-- Footer links --> */}

            <hr />

            {/* <!-- Grid row --> */}
            <div className="row d-flex align-items-center">

              {/* <!-- Grid column --> */}
              <div className="col-md-7 col-lg-8">

                {/* <!--Copyright--> */}
                <p className="text-center text-md-left">&copy; {new Date().getFullYear()} &nbsp; &nbsp;
                  <strong> Mel Blogging</strong>
                </p>
              </div>

              {/* <!-- Grid column --> */}
              <div className="col-md-5 col-lg-4 ml-lg-0">

                {/* <!-- Social buttons --> */}
                <div className="text-center text-md-right">
                  <ul className="list-unstyled list-inline">
                    <li className="list-inline-item">
                      <a className="btn-floating btn-sm rgba-white-slight mx-1" href="#!">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a className="btn-floating btn-sm rgba-white-slight mx-1" href="#!">
                        <i className="fab fa-twitter"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a className="btn-floating btn-sm rgba-white-slight mx-1" href="#!">
                        <i className="fab fa-instagram"></i>
                      </a>
                    </li>
                  </ul>
                </div>

              </div>
              {/* <!-- Grid column --> */}

            </div>
            {/* <!-- Grid row --> */}

          </div>
          {/* <!-- Footer Links --> */}

        </footer>
      </div>
    );
  }
}

export default Footer;
