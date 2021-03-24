import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { MDBContainer, MDBMask, MDBView, MDBBtn, MDBIcon, MDBAnimation, MDBRow, MDBCol, MDBCard, MDBCardTitle, MDBCardBody, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBInput, MDBAlert } from 'mdbreact';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../index.css';

import Profile from './Profile';

import bannerImg from "../assets/images/banner.fw.png";


class Home extends Component {
  constructor(props){
    super(props)

    this.state = {
      articles: [],
      feed: [],
      followerStory: false,
      openForm: true,
      dataError: false,
      modal1: false,
      isOpen: false,
      username: "",
      email: "",
      password: "",
      user: {}
    };
  }

  componentDidMount() {
    localStorage.removeItem('localArticle');
    this.getArticles();
    this.getFeed();
  }

  getFeed = () => {
    // this.setState({
    //   dataError: false
    // });
    axios.get('https://conduit.productionready.io/api/articles/feed?limit=3&offset=0')
    .then(response => {
      console.log('feed is ', response);
      // if(response.status === 200){
      //   this.setState({
      //     feed: response.data
      //   });
      // } else {
      //   console.log('something went wrong');
      // }
    })
    .catch( error => error );
  }

  getArticles = () => {
    this.setState({
      articles: [],
      dataError: false,
    });
    axios.get('https://conduit.productionready.io/api/articles?limit=3&offset=1')
    .then(response => {
      // console.log('response is ', response.data.articles[0]);
      if(response.status === 200) {
        this.setState({
          articles: response.data.articles,
          dataError: false
        });
        // console.log("res is ",this.state.articles[0].title);
      } else {
          this.setState({
            dataError: true,
          });
      }
    })
    .catch( error => error );
  }

  toggle = nr => () => {
    let modalNumber = 'modal' + nr
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
  }

  changeHandler = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  toastSubmitPost = () => {
    toast.success("Operation successfull!")
  }

  signupSubmit = () => {
    this.setState({
      user: {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      }
    })
    // let user = {
    //   username: this.state.username,
    //   email: this.state.email,
    //   password: this.state.password,
    // }
    // console.log('user is ', this.state.user);
    axios.post('https://conduit.productionready.io/api/user', this.state.user)
    .then(response => {
      console.log('signup data posted ', response);
      if(response.status === 201){
        this.toastSubmitPost();
          this.setState({
            submitError: false,
            modal1: false
          });
          this.loginSubmit();
      } else {
        console.log('inside else block');
        this.setState({
          submitError: true,
          // modal1: false
        });
      }
    })
    .catch(error => console.log(error))
    this.setState({
      submitError: true,
      // modal1: false
    });
  }

  toastWrongUser = () => {
    toast.error('wrong username or password!');
  }
  loginSubmit = () => {
    axios.post('https://conduit.productionready.io/api/users/login', this.state)
    .then(response => {
      if(response.status === 200){
        // console.log('inside login response..ok', response.data );
        this.setState({
          loginError: false
        });
        this.toastSubmitPost();
        let info = {
          adminId: response.data.data.id,
          token: response.data.token
        }
        localStorage.setItem("localData", JSON.stringify(info));
        setTimeout(() => {
          window.location.reload();
        }, 100);
      } else if (response === 401){
        // this.toastWrongUser();
        this.setState({
          loggedIn: false,
          loginError: true,
          errorMsg: 'wrong email or password!',
          modal1: this.state.modal1
        });
        //
      }
      else {
        // console.log('inside catch block');
        this.setState({
          loggedIn: false,
          loginError: true,
          modal1: this.state.modal1
        });
      }
    })
    .catch(error => error)
    this.setState({
      loggedIn: false,
      loginError: true,
      modal1: this.state.modal1
    });
  }

  logout = () => {
    this.setState({
      loggedIn: false
    })
    localStorage.clear();
    window.location.reload();
    // let name = JSON.parse(localStorage.getItem("localData")).user.name;
    // name.split(" ");
    // // console.log(name[0]);
    // return name[0];
  }

  // handleLogin = (e) => {
  //   e.preventDefault();
  //   this.props.loginForm(this.state.openForm)
  // }

      render() {
        const {articles, username, email, password} = this.state;
        return (
              <div className="">
                <MDBView src={bannerImg} className="d-block img-fluid text-center bg-banner" fixed>
                  <MDBMask overlay="" className="d-flex flex-column justify-content-center align-items-start text-white text-center px-5 mt-5">
                    {/* <h1 className="text-lora text-capitalize display-5 mb-0">Healthy, beautiful smile for everyone </h1>
                    <p className="mb-0">We partner with you to straighten teeth, restore oral health and give back smiles.</p> */}
                    {/* <p className="mb-0">"Always find opportunities to make some smile, and to offer random acts of kindness in everyday life."  </p>
                    <p className="small pr-1">- Roy T. Bennet</p> */}
                    <MDBAnimation type="pulse" infinite>
                      <MDBBtn color="white" gradient="" className="shadow rounded mb-5 mb-sm-0 pink-text" onClick={this.toggle(1)} > Get Started
                        <MDBIcon icon="users" className="ml-2 pink-text" />
                      </MDBBtn>
                    </MDBAnimation>
                  </MDBMask>
                </MDBView>

                {/* ****************************************************************************** */}

                <main>
                  <MDBContainer fluid classname="mt-0 pt-0 mb-0 pb-0 bg-gray">
                    { this.state.dataError === true ?
                      <MDBAlert color="danger">
                        Error! Could not retrieve data. MAke sure you have internet connection.
                      </MDBAlert> : ''
                    }
                    <MDBCard className="my-1 px-5 pb-5">
      <MDBCardBody className="text-left">
        <h4 className="h2-responsive font-weight-bold text-center my-4">
          Articles
        </h4>
        {/* <p className="text-center w-responsive mx-auto mb-5">
          Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
          cupidatat non proident, sunt in culpa qui officia deserunt mollit
          anim id est laborum.
        </p> */}
        <MDBRow>
          <MDBCol lg="4" md="12" className="mb-lg-0 mb-4">
            <h5 className="font-weight-bold">Featured Story</h5>
            <MDBView hover className="rounded z-depth-2 mb-4" waves>
              <img
                className="img-fluid"
                src="https://mdbootstrap.com/img/Photos/Others/images/81.jpg"
                alt=""
              />
              <MDBMask overlay="white-slight" />
            </MDBView>
            <a href="#!" className="pink-text">
              <h6 className="font-weight-bold mb-1">
                <MDBIcon icon="map" className="pr-2" />
                {this.state.articles.length > 0 ? this.state.articles[0].slug : " "}
              </h6>
            </a>
            <h4 className="font-weight-bold mb-1">
              <strong>{this.state.articles.length > 0 ? this.state.articles[0].title : " "}</strong>
            </h4>
            <p className="dark-grey-text">
              {this.state.articles.length > 0 ? this.state.articles[0].description : " "}
            </p>
            <p>
            {this.state.articles.length > 0 ? this.state.articles[0].body : " "}
            </p>
            <p>
              { this.state.articles.length > 0 ? (this.state.articles[0].favorited ? <MDBIcon icon="heart" className="pr-1" /> : <MDBIcon far icon="heart" className="pr-1" />) : " "}
              { this.state.articles.length > 0 ? this.state.articles[0].favoritesCount : " "}
            </p>
            <MDBView className="rounded z-depth-2 mb-lg-0 mx-2 mb-4 float-right w-25" hover waves onClick={() => {
              this.props.sendWriter(this.state.articles[0]);
              this.props.history.push("/profile")
            }}>
              <img
                className="img-fluid"
                src={ this.state.articles.length > 0 ? this.state.articles[0].author.image : " "}
                alt=""
              />
              <a href="">
                <MDBMask overlay="white-slight" />
              </a>
            </MDBView>
            <p>
              by <a href="#!" className="font-weight-bold">{this.state.articles.length > 0 ? this.state.articles[0].author.username : " "}</a>, <br />
              {this.state.articles.length > 0 ? this.state.articles[0].createdAt : " "}
            </p>
            <p>
              { this.state.articles.length > 0 ? this.state.articles[0].tagList : " "}
            </p>
            <MDBBtn color="pink" rounded size="md" onClick={() => {
              this.props.sendArticle(this.state.articles[0]);
              this.props.history.push("/profile")
            }}>
              Read more
            </MDBBtn>
          </MDBCol>

          <MDBCol lg="4" md="12" className="mb-lg-0 mb-4">
            <h5 className="font-weight-bold">Recent Stories</h5>
            { articles.map((article) => {
              return <MDBCol key={article.createdAt} className="mb-4">
              <a href="#!" className="pink-text">
                <h6 className="font-weight-bold mb-1">
                  <MDBIcon icon="image" className="pr-2" />
                  { article.slug }
                </h6>
                <MDBView className="rounded z-depth-2 mb-lg-0 mx-2 mb-4 float-right w-25" hover waves onClick={() => {
                  this.props.sendWriter(article);
                  this.props.history.push("/profile")
                }}>
                  <img
                    className="img-fluid"
                    src={article.author.image}
                    alt="writer"
                  />
                  <a href="#!">
                    <MDBMask overlay="white-slight" />
                  </a>
                </MDBView>
              </a>
              <h5 className="font-weight-bold mb-1 p-0">
                {article.title}
              </h5>
              <p className="my-1">
                {article.description}
              </p>
              <p className="my-1">
                by
                <a href="#!" onClick={(e) => {
                  e.preventDefault();
                  this.props.sendWriter(article);
                  this.props.history.push("/profile")
                }}>
                  <strong> {article.author.username}</strong>
                </a>
                , <br/> {article.createdAt}
              </p>
              <MDBBtn
                color="pink"
                size="md"
                className="mb-lg-0 mb-4 ml-1 waves-light"  onClick={(e) => {
                  e.preventDefault();
                  this.props.sendArticle(article);
                  this.props.history.push("/story")
                }}
              >
                Read more
              </MDBBtn>
              <hr/>
            </MDBCol>
            })}
          </MDBCol>
          <MDBCol className="">
            <h5 className="font-weight-bold">Stories From People You Follow</h5>
            { this.state.followerStory === false ?
              <MDBCard
            className="card-image"
            style={{
              backgroundImage:
                "url('https://mdbootstrap.com/img/Photos/Horizontal/City/6-col/img%20(47).jpg')"
            }}
          >
            <div className="text-white text-center d-flex align-items-center rgba-indigo-strong py-5 px-4">
              <div>
                <h5 className="white-text">
                  <MDBIcon icon="desktop" /> Software
                </h5>
                <MDBCardTitle tag="h5" className="pt-2" muted>
                  <strong>What The Code in Matrix Really means</strong>
                </MDBCardTitle>
                  <MDBAlert color="warning">
                    <h6 className="font-weight-bolder">Action Required.</h6>
                    Oops! Looks like you are not logged in. You need to login to see stories from people you follow.</MDBAlert>
                <MDBBtn color="white" className="pink-text" onClick={this.toggle(1)}>
                  <MDBIcon icon="clone left" /> Login
                </MDBBtn>
              </div>
            </div>
          </MDBCard> : " "}
          </MDBCol>
        </MDBRow>
      </MDBCardBody>
    </MDBCard>

    {/* login modal */}
    <MDBModal isOpen={this.state.modal1} toggle={this.toggle(1)} centered>
<MDBModalHeader toggle={this.toggle(1)}
 titleClass="d-inline title"
 className="text-center pink darken-3 white-text px-2">
   <MDBIcon icon="user" classname="pr-2" />
   &nbsp; You
</MDBModalHeader>
<MDBModalBody>
 <MDBRow>
<MDBCol>
<form>
<div className="text-center">
  <MDBBtn color="pink" onClick={() => this.setState({loginForm: false})}>Sign up</MDBBtn>
 <MDBBtn color="white pink-text" onClick={() => this.setState({loginForm: true})}>Login</MDBBtn>
</div>
 {
   this.state.loginForm ?
   <div>
   <div className="grey-text">
     <MDBInput name="email" label="Type your email" icon="envelope" group type="email" validate error="wrong"
       success="right" className="black-text pl-5"
       onChange={this.changeHandler}
       value={email}/>
     <MDBInput name="password" label="Type your password" icon="lock" group type="password" validate  className="black-text pl-5"
     onChange={this.changeHandler}
     value={password} />
   </div>
   <div className="text-center">
     {
       this.state.loginError === true ?
         <MDBAlert color="danger">
           <strong>Oops!</strong> {this.state.errorMsg}
         </MDBAlert> : null
     }
     <MDBBtn color="white"
     onClick={() => {
       this.setState({
         submitError: false,
         loggedIn: true,
         modal1: false
       });
       this.loginSubmit()}
   }>
       <MDBIcon icon="paper-plane" claassName="pr-2" />
       &nbsp; Login </MDBBtn>
   </div>
 </div>
 :
 <div>
   <div className="grey-text">
     <MDBInput name="username" label="Type your username" icon="user" group type="text" validate error="wrong"
       success="right" className="black-text pl-5"
       onChange={this.changeHandler}
       value={username} />
     <MDBInput name='email' label="Type your email" icon="envelope" group type="email" validate error="wrong"
       success="right" className="black-text pl-5"
       onChange={this.changeHandler}
       value={email} />
     <MDBInput name="password" label="Type your password" icon="lock" group type="password" validate className="black-text pl-5"
     onChange={this.changeHandler}
     value={password} />
   </div>
   <div className="text-center">
     {
       this.state.submitError === true ?
         <MDBAlert color="danger">
           <strong>Oops!</strong> Something went wrong
         </MDBAlert> : null
     }
     <MDBBtn color="pink"
     onClick={this.signupSubmit}>
       <MDBIcon icon="paper-plane" claassName="pr-2" />
       &nbsp; Sign up </MDBBtn>
   </div>
 </div>
 }
</form>
<ToastContainer pauseOnFocusLoss={true} />
</MDBCol>
</MDBRow>
</MDBModalBody>
</MDBModal>

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
