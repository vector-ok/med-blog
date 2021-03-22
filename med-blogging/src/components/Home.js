import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { MDBContainer, MDBMask, MDBView, MDBBtn, MDBIcon, MDBAnimation, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBAlert } from 'mdbreact';
import axios from 'axios';
import '../index.css';

import bannerImg from "../assets/images/banner.fw.png";


class Home extends Component {
  constructor(props){
    super(props)

    this.state = {
      articles: [],
      dataError: false,
      isOpen: false
    };
  }

  componentDidMount() {
    this.getArticles()
  }

  getArticles = () => {
    this.setState({
      articles: [],
      dataError: false,
    });
    axios.get('https://conduit.productionready.io/api/articles?limit=3&offset=0')
    .then(response => {
      console.log('response is ', response.data.articles);
      if(response.status === 200) {
        this.setState({
          articles: response.data.articles,
          dataError: false
        });
      } else {
          this.setState({
            dataError: true,
          });
      }

    })
    .catch( error => error );
  }

      render() {
        const {articles} = this.state;
        return (
              <div className="">
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
                    { this.state.dataError === true ?
                      <MDBAlert color="danger">
                        Error! Could not retrieve data.
                      </MDBAlert> : ''
                    }
                    <MDBCard className="my-1 px-5 pb-5">
      <MDBCardBody className="text-left">
        <h4 className="h2-responsive font-weight-bold text-center my-4">
          Recent Stories
        </h4>
        {/* <p className="text-center w-responsive mx-auto mb-5">
          Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
          cupidatat non proident, sunt in culpa qui officia deserunt mollit
          anim id est laborum.
        </p> */}
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
          <MDBCol lg="8" md="12" className="mb-lg-0 mb-4">
            { articles.map((article) => {
              return <MDBCol key={article.createdAt} className="mb-5">
              <a href="#!" className="pink-text">
                <h6 className="font-weight-bold mb-1">
                  <MDBIcon icon="image" className="pr-2" />
                  Lifestyle
                </h6>
              </a>
              <h5 className="font-weight-bold mb-1 p-0">
                {article.title}
              </h5>
                <MDBView className="rounded z-depth-2 mb-lg-0 mx-2 mb-4 float-right w-25" hover waves>
                  <img
                    className="img-fluid"
                    src="https://mdbootstrap.com/img/Photos/Others/img%20(34).jpg"
                    alt=""
                  />
                  <a href="#!">
                    <MDBMask overlay="white-slight" />
                  </a>
                </MDBView>
              <p className="my-1">
                {article.description}
              </p>
              <p className="my-1">
                by
                <a href="#!">
                  <strong> {article.username}</strong>
                </a>
                , 14/08/2018
              </p>
              <MDBBtn
                color="pink"
                size="md"
                className="mb-lg-0 mb-4 ml-1 waves-light"
              >
                Read more
              </MDBBtn>
            </MDBCol>
            })}
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
