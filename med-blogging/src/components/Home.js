import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { MDBContainer, MDBMask, MDBView, MDBBtn, MDBIcon, MDBAnimation, MDBRow, MDBCol, MDBCard, MDBCardBody } from 'mdbreact';
import '../index.css';

import bannerImg from "../assets/images/banner.fw.png";


class Home extends Component {
  constructor(props){
    super(props)

    this.state = {
      photoIndex: 0,
      isOpen: false
    };
  }

      render() {
        return (
              <div>
                <MDBView src={bannerImg} className="d-block img-fluid text-center bg-banner" fixed>
                  <MDBMask overlay="" className="d-flex flex-column justify-content-center align-items-start text-white text-center px-5 mt-5">
                    {/* <h1 className="text-lora text-capitalize display-5 mb-0">Healthy, beautiful smile for everyone </h1>
                    <p className="mb-0">We partner with you to straighten teeth, restore oral health and give back smiles.</p> */}
                    {/* <p className="mb-0">"Always find opportunities to make some smile, and to offer random acts of kindness in everyday life."  </p>
                    <p className="small pr-1">- Roy T. Bennet</p> */}
                    <MDBAnimation type="pulse" infinite>
                      <MDBBtn gradient="blue" className="shadow rounded mb-5 mb-sm-0" href="/Join" > Get Started
                        <MDBIcon icon="users" className="ml-2" />
                      </MDBBtn>
                    </MDBAnimation>
                  </MDBMask>
                </MDBView>

                {/* ****************************************************************************** */}

                <main>
                  <MDBContainer fluid classname="mt-0 pt-0 mb-0 pb-0 bg-gray">
                    <MDBCard className="my-1 px-5 pb-5">
      <MDBCardBody className="text-center">
        <h2 className="h1-responsive font-weight-bold text-center my-1">
          Recent posts
        </h2>
        <p className="text-center w-responsive mx-auto mb-5">
          Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
          cupidatat non proident, sunt in culpa qui officia deserunt mollit
          anim id est laborum.
        </p>
        <MDBRow>
          <MDBCol lg="4" md="12" className="mb-lg-0 mb-4">
            <MDBView hover className="rounded z-depth-2 mb-4" waves>
              <img
                className="img-fluid"
                src="https://mdbootstrap.com/img/Photos/Others/images/81.jpg"
                alt=""
              />
              <MDBMask overlay="white-slight" />
            </MDBView>
            <a href="#!" className="pink-text">
              <h6 className="font-weight-bold mb-3">
                <MDBIcon icon="map" className="pr-2" />
                Adventure
              </h6>
            </a>
            <h4 className="font-weight-bold mb-3">
              <strong>Title of the news</strong>
            </h4>
            <p>
              by <a href="#!" className="font-weight-bold">Billy Forester</a>,
              15/07/2018
            </p>
            <p className="dark-grey-text">
              Nam libero tempore, cum soluta nobis est eligendi optio cumque
              nihil impedit quo minus id quod maxime placeat facere possimus
              voluptas.
            </p>
            <MDBBtn color="pink" rounded size="md">
              Read more
            </MDBBtn>
          </MDBCol>
          <MDBCol lg="4" md="12" className="mb-lg-0 mb-4">
            <MDBView hover className="rounded z-depth-2 mb-4" waves>
              <img
                className="img-fluid"
                src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg"
                alt=""
              />
              <MDBMask overlay="white-slight" />
            </MDBView>
            <a href="#!" className="deep-orange-text">
              <h6 className="font-weight-bold mb-3">
                <MDBIcon icon="graduation-cap" className="pr-2" />
                Education
              </h6>
            </a>
            <h4 className="font-weight-bold mb-3">
              <strong>Title of the news</strong>
            </h4>
            <p>
              by <a href="#!" className="font-weight-bold">Billy Forester</a>,
              13/07/2018
            </p>
            <p className="dark-grey-text">
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis voluptatum deleniti atque corrupti quos dolores.
            </p>
            <MDBBtn color="deep-orange" rounded size="md">
              Read more
            </MDBBtn>
          </MDBCol>
          <MDBCol lg="4" md="12" className="mb-lg-0 mb-4">
            <MDBView hover className="rounded z-depth-2 mb-4" waves>
              <img
                className="img-fluid"
                src="https://mdbootstrap.com/img/Photos/Others/images/13.jpg"
                alt=""
              />
              <MDBMask overlay="white-slight" />
            </MDBView>
            <a href="#!" className="blue-text">
              <h6 className="font-weight-bold mb-3">
                <MDBIcon icon="fire" className="pr-2" />
                Culture
              </h6>
            </a>
            <h4 className="font-weight-bold mb-3">
              <strong>Title of the news</strong>
            </h4>
            <p>
              by <a href="#!" className="font-weight-bold">Billy Forester</a>,
              11/07/2018
            </p>
            <p className="dark-grey-text">
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
              aut fugit, sed quia consequuntur magni dolores eos qui ratione.
            </p>
            <MDBBtn color="info" rounded size="md">
              Read more
            </MDBBtn>
          </MDBCol>
        </MDBRow>
      </MDBCardBody>
    </MDBCard>

                    <div className="text-center bg-gray py-3">
                      <a href="http://www.contemporarydentalclinic.com">
                       <img className="text-center mt-sm-2" src="#!" alt="Contemporary Dental Clinic logo" />
                      </a>
                      <h3 className="text-lora text-oblique text-center mb-1">Contemporary Dental Clinic</h3>
                      <p className="small pr-1">  Partner   </p>
                    </div>
                  </MDBContainer>
                </main>

              </div>
  )
}
}

export default withRouter(Home);
