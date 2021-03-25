import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { MDBContainer, MDBMask, MDBView, MDBBtn, MDBIcon, MDBAnimation, MDBRow, MDBCol, MDBCard, MDBCardTitle, MDBCardBody, MDBModal, MDBModalHeader, MDBModalBody, MDBInput, MDBAlert } from 'mdbreact';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../index.css';

import bannerImg from "../assets/images/banner.fw.png";


class Home extends Component {
  constructor(props){
    super(props)

    this.state = {
      articles: [],
      recentStory: [],
      trendingStory: [],
      techStory: [],
      moreStory: [],
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
  }

  getArticles = () => {
    this.setState({
      articles: [],
      dataError: false,
    });
    axios.get('https://conduit.productionready.io/api/articles?limit=18&offset=1')
    .then(response => {
      if(response.status === 200) {
        this.setState({
          articles: response.data.articles.slice(0,3),
          trendingStory: response.data.articles.slice(3,8),
          techStory: response.data.articles.slice(8,13),
          moreStory: response.data.articles.slice(13,18),
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
    axios({
      method: 'post',
      url: 'https://conduit.productionready.io/api/user',
      data:
      this.state.user
    })
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
        });
      }
    })
    .catch(error => console.log(error))
    this.setState({
      submitError: true,
    });
  }

  toastWrongUser = () => {
    toast.error('wrong username or password!');
  }
  loginSubmit = () => {
    axios.post('https://conduit.productionready.io/api/users/login', this.state)
    .then(response => {
      if(response.status === 200){
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
        this.setState({
          loggedIn: false,
          loginError: true,
          errorMsg: 'wrong email or password!',
          modal1: this.state.modal1
        });
      }
      else {
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
  }

      render() {
        const {articles, username, email, password} = this.state;
        return (
              <div className="">
                <MDBView src={bannerImg} className="d-block img-fluid text-center bg-banner" fixed>
                  <MDBMask overlay="" className="d-flex flex-column justify-content-center align-items-start text-white text-center px-5 mt-5">

                    <MDBAnimation type="pulse" infinite>
                      <MDBBtn color="white" gradient="" className="shadow rounded mb-5 mb-sm-0 pink-text" onClick={this.toggle(1)} > Get Started
                        <MDBIcon icon="users" className="ml-2 pink-text" />
                      </MDBBtn>
                    </MDBAnimation>
                  </MDBMask>
                </MDBView>

                <main>
                  <MDBContainer fluid className="mt-0 pt-0 mb-0 pb-0">
                      { this.state.dataError === true ? <MDBAlert color="danger">
                          Error! Could not retrieve data. Make sure you have internet connection.
                        </MDBAlert> : ' '
                      }
                    <MDBCard className="my-1 px-5 pb-5">
                      <MDBCardBody className="text-left">
                        <h4 className="h2-responsive font-weight-bold text-center my-4">
          Articles
        </h4>
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
            <h4 className="font-weight-bold text-capitalize mb-1">
              <strong>{this.state.articles.length > 0 ? this.state.articles[0].title : " "}</strong>
            </h4>
            <p className="dark-grey-text">
              {this.state.articles.length > 0 ? (this.state.articles[0].description.length > 120 ? this.state.articles[0].description.slice(0, 120)+"..." : this.state.articles[0].description) : " "}
            </p>
            <p>
            {this.state.articles.length > 0 ? (this.state.articles[0].body.length > 100 ? this.state.articles[0].body.slice(0, 100)+"..." : this.state.articles[0].body) : " "}
            </p>
            <p>
              { this.state.articles.length > 0 ? (this.state.articles[0].favoritesCount > 0 ? <MDBIcon icon="heart" className="pr-1 pink-text" /> : <MDBIcon far icon="heart" className="pr-1" />) : " "}
              { this.state.articles.length > 0 ? this.state.articles[0].favoritesCount : " "}
            </p>
            <MDBView className="rounded z-depth-2 mb-lg-0 mx-2 mb-4 float-right w-25" hover waves onClick={(e) => {
              e.preventDefault();
              this.props.sendWriter(this.state.articles[0]);
              this.props.history.push("/profile")
            }}>
              <img
                className="img-fluid"
                src={ this.state.articles.length > 0 ? this.state.articles[0].author.image : " "}
                alt=""
              />
              <a href="#!">
                <MDBMask overlay="white-slight" />
              </a>
            </MDBView>
            <p>
              by <a href="#!" className="font-weight-bold">{this.state.articles.length > 0 ? this.state.articles[0].author.username : " "}</a>, <br /> <p className="small">
              {this.state.articles.length > 0 ? this.state.articles[0].createdAt : " "}
            </p>
            </p>
            <p>
              { this.state.articles.length > 0 ? this.state.articles[0].tagList : " "}
            </p>
            <MDBBtn color="pink" rounded size="md" onClick={() => {
              this.props.sendArticle(this.state.articles[0]);
              this.props.history.push("/story")
            }}>
              Read more
            </MDBBtn>
          </MDBCol>

          <MDBCol lg="4" md="12" className="mb-lg-0 mb-4">
            <h5 className="font-weight-bold">Recent Stories</h5>
            { articles.map((article) => {
              return <MDBCol key={article.createdAt} className="mb-2">
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
                </a> <br />
                <span className="small"> {article.createdAt} </span>
              </p>
              <MDBBtn
                color="pink"
                size="md"
                className="mb-lg-0 mt-1 mb-2 ml-1 waves-light"  onClick={(e) => {
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
     onClick={(e) => {
       e.preventDefault();
       this.setState({
         user: {
           username: this.state.username,
           email: this.state.email,
           password: this.state.password
         }
       })
       this.signupSubmit()
     }
     }>
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

<MDBContainer fluid className="mt-5">
  <MDBRow>
    <MDBCol md="4" sm="12" className="">
      <div className="custom-div">
        <h5 className="font-weight-bold">Trending Stories</h5>
        { this.state.trendingStory.map((trending) =>
        <MDBRow>
          <MDBCol md="3">
            <MDBView hover rounded className="z-depth-1-half mb-4 w-75"  onClick={(e) => {
              e.preventDefault();
              this.props.sendWriter(trending);
              this.props.history.push("/profile")
            }}>
              <img
                className="img-fluid"
                src={trending.author ? trending.author.image : "https://mdbootstrap.com/img/Photos/Others/photo8.jpg"}
                alt=""
              />
              <a href="#!">
                <MDBMask overlay="white-slight" className="waves-light" />
              </a>
            </MDBView>
          </MDBCol>
          <MDBCol md="9">
            <div className="d-flex justify-content-between">
              <MDBCol size="11" className="text-truncate pl-0 mb-3">
                <a href="#!" className="font-weight-bold black-text text-capitalize" onClick={(e) => {
                  e.preventDefault();
                  this.props.sendArticle(trending);
                  this.props.history.push("/story")
                }}>
                  {trending.title}
                </a>
                <p className="grey-text small">
                  by <span className="pink-text"> {trending.author.username} </span>
                </p>
              </MDBCol>
              <a href="#!" onClick={() => {
                this.props.sendArticle(trending);
                this.props.history.push("/story")
              }}>
                <MDBIcon icon="angle-double-right" className="black-text" />
              </a>
            </div>
          </MDBCol>
        </MDBRow>)}
      </div>
    </MDBCol>

    <MDBCol md="4" sm="12">
      <div className="custom-div">
        <h5 className="font-weight-bold">Tech Stories</h5>
        {this.state.techStory.map((tech) =>
        <MDBRow>
          <MDBCol md="3">
            <MDBView hover rounded className="z-depth-1-half mb-4 w-75" onClick={(e) => {
              e.preventDefault();
              this.props.sendWriter(tech);
              this.props.history.push("/profile")
            }}>
              <img
                className="img-fluid"
                src={tech.author? tech.author.image : "https://mdbootstrap.com/img/Photos/Others/images/86.jpg"}
                alt=""
              />
              <a href="#!">
                <MDBMask overlay="white-slight" className="waves-light" />
              </a>
            </MDBView>
          </MDBCol>
          <MDBCol md="9">
            <div className="d-flex justify-content-between">
              <MDBCol size="11" className="text-truncate pl-0 mb-3">
                <a href="#!" className="black-text font-weight-bold text-capitalize" onClick={(e) => {
                  e.preventDefault();
                  this.props.sendArticle(tech);
                  this.props.history.push("/story")
                }}>
                  {tech.title}
                </a>
                <p className="grey-text small">
                  by <span className="pink-text"> {tech.author.username} </span>
                </p>
              </MDBCol>
              <a href="#!">
                <MDBIcon icon="angle-double-right" className="black-text" onClick={(e) => {
                  e.preventDefault();
                  this.props.sendArticle(tech);
                  this.props.history.push("/story")
                }} />
              </a>
            </div>
          </MDBCol>
        </MDBRow>
      )}
      </div>
    </MDBCol>

    <MDBCol md="4" sm="12">
      <div className="custom-div">
        <h5 className="font-weight-bold">More Stories</h5>
        {this.state.moreStory.map((more) =>
        <MDBRow>
          <MDBCol md="3">
            <MDBView hover rounded className="z-depth-1-half mb-4 w-75" onClick={(e) => {
              e.preventDefault();
              this.props.sendWriter(more);
              this.props.history.push("/profile")
            }}>
              <img
                className="img-fluid"
                src={more.author? more.author.image : "https://mdbootstrap.com/img/Photos/Others/images/86.jpg"}
                alt=""
              />
              <a href="#!">
                <MDBMask overlay="white-slight" className="waves-light" />
              </a>
            </MDBView>
          </MDBCol>
          <MDBCol md="9">
            <div className="d-flex justify-content-between">
              <MDBCol size="11" className="text-truncate pl-0 mb-3">
                <a href="#!" className="black-text font-weight-bold" onClick={(e) => {
                  e.preventDefault();
                  this.props.sendArticle(more);
                  this.props.history.push("/story")
                }}>
                  {more.title}
                </a>
                <p className="grey-text small">
                  by <span className="pink-text"> {more.author.username} </span>
                </p>
              </MDBCol>
              <a href="#!">
                <MDBIcon icon="angle-double-right" className="black-text" onClick={(e) => {
                  e.preventDefault();
                  this.props.sendArticle(more);
                  this.props.history.push("/story")
                }}/>
              </a>
            </div>
          </MDBCol>
        </MDBRow>
      )}
      </div>
    </MDBCol>

  </MDBRow>
</MDBContainer>
                  </MDBContainer>
                </main>

              </div>
  )
}
}

export default withRouter(Home);
