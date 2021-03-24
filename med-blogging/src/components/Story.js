import React, { Component } from "react";
import { MDBContainer, MDBView, MDBCard, MDBCardImage, MDBMask, MDBCardTitle, MDBCardText, MDBCardBody, MDBIcon, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBBtn, MDBRow, MDBCol, MDBInput, MDBAlert } from "mdbreact";
import { BrowserRouter as Router, withRouter, Link } from 'react-router-dom';
import axios from "axios";

class Story extends Component {
  constructor(props){
    super(props)
    this.state = {
      similar: [],
      comments: [],
      articleState: this.props.article,
      slug: null,
      dataError: false
    }
  }
  componentDidMount() {
    localStorage.getItem('localArticle') ? this.setState({
      slug: localStorage.getItem('localArticle')
    }) : localStorage.setItem("localArticle", JSON.stringify(this.props.article));
    this.getStories();
    setTimeout(() => {
      this.getComments();
    }, 500)
  }

  componentDidUpdate = () => {
    this.scrollToTop();
  }

  scrollToTop = () => {
    // this.articleSet.scrollIntoView({ behavior: "smooth"})
  }

  getComments = () => {
    this.setState({
      comments: []
    });
    let slug = JSON.parse(localStorage.getItem('localArticle')).slug;
    axios.get(`https://conduit.productionready.io/api/articles/${slug}/comments`)
    .then(response => {
      console.log('comment is ', response.data.comments);
      if(response.status === 200) {
        this.setState({
          comments: response.data.comments,
          dataError: false
        });
      } else {
        this.setState({
          dataError: true,
        });
      }
    }).catch(error => error);
  }

  getStories = () => {
    this.setState({
      similar: [],
      dataError: false,
    });
    axios.get('https://conduit.productionready.io/api/articles?limit=5&offset=3')
    .then(response => {
      // console.log('slug is ', this.props.article.slug);
      if(response.status === 200) {
        this.setState({
          similar: response.data.articles,
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

  render(){
    let article = this.state.articleState || this.state.similar;
    return(
      <div className="">
      { article ?
        <MDBCard
          className="my-5 pt-5 px-5 custom-card mx-auto"
        >
          <MDBCardBody className="pt-0">
            {/* <MDBRow ref={(el) => { this.articleSet = el}}> */}
            <MDBRow>
              <MDBCol sm='12' className="my-5">
                <h3 className="font-weight-bold dark-grey-text mb-4 p-0">
                  {article.title ? article.title : JSON.parse(localStorage.getItem('localArticle')).title } <br />
                  <h6 className="">{article.slug ? article.slug : JSON.parse(localStorage.getItem('localArticle')).slug}</h6>
                </h3>
                <div className="custom-div">
                  <MDBView hover rounded className="z-depth-1-half mb-4">
                    <img
                      className="img-fluid w-50 mx-auto"
                      src="https://mdbootstrap.com/img/Photos/Slides/img%20(142).jpg"
                      alt=""
                    />
                    <a href="#!">
                      <MDBMask overlay="white-slight" className="waves-light" />
                    </a>
                  </MDBView>
                  <div className="d-flex justify-content-between">
                    <a href="#!" className="light-blue-text">
                      <h6 className="font-weight-bold">
                        <MDBIcon icon="plane" className="pr-2" />
                        {article.tagList ? article.tagList : "misc"}
                      </h6>
                    </a>
                  </div>
                  <p className="dark-grey-text">
                    {article.description ? article.description : JSON.parse(localStorage.getItem('localArticle')).description }
                  </p>
                  <p className="dark-grey-text">
                    {article.body ? article.body : JSON.parse(localStorage.getItem('localArticle')).body}
                  </p>
                  { article.author ? <img src={article.author.image} alt="author thumbnal" className="author-thumbnail mb-0 pb-0" /> : " "}
                  <p className="small mt-1 pt-1">{article.author ? article.author.username : JSON.parse(localStorage.getItem('localArticle')).author.username } </p>
                  <p className="font-weight-bold dark-grey-text">
                    <MDBIcon far icon="clock" className="pr-2" />
                    {article.updatedAt ? article.updatedAt : article.created}
                  </p>
                </div>
              </MDBCol>
              <hr />

              {/* implement comment  */}
              <MDBCol sm='12' className="mb-5 py-2">
                <h5 className="mb-2 pb-2 font-weight-bold">Comments ({this.state.comments.length})</h5>
                {this.state.comments.map((comment) =>
                <div key={comment.createdAt}>
                  <img src={comment.author.image} alt="comment author" className="img-thumbnail float-left author-thumbnail mx-2" />
                  <h6 className="small pink-text">{comment.author.username}</h6>
                  <p className="">{comment.body}</p>
                  <p className="small">{comment.updatedAt || comment.createdAt}</p>
                </div>)}
              </MDBCol>
              <hr />


              <MDBCol lg="6" md="12">
                <div className="custom-div">
                  <h5 className="font-weight-bold">Similar Stories</h5>
                  { this.state.similar.map((story) =>
                  <MDBRow>
                    <MDBCol md="3">
                      <MDBView hover rounded className="z-depth-1-half mb-4 w-75">
                        <img
                          className="img-fluid"
                          src={story.author ? story.author.image : "https://mdbootstrap.com/img/Photos/Others/photo8.jpg"}
                          alt=""
                        />
                        <a href="#!">
                          <MDBMask overlay="white-slight" className="waves-light" />
                        </a>
                      </MDBView>
                    </MDBCol>
                    <MDBCol md="9">
                      <p className="font-weight-bold dark-grey-text">
                        {story.updatedAt ? story.updatedAt : story.crreatedAt}
                      </p>
                      <div className="d-flex justify-content-between">
                        <MDBCol size="11" className="text-truncate pl-0 mb-3">
                          <a href="#!" className="pink-text" onClick={(e) => {
                            e.preventDefault();
                            this.setState({
                              articleState: story
                            });
                          }}>
                            {story.title}
                          </a>
                        </MDBCol>
                        <a href="#!">
                          <MDBIcon icon="angle-double-right" className="pink-text" />
                        </a>
                      </div>
                    </MDBCol>
                  </MDBRow>)}
                </div>
              </MDBCol>

              <MDBCol lg="6" md="12">
                <div className="custom-div">
                  <h5 className="font-weight-bold">Recommended Stories</h5>
                  {this.state.similar.map((recommended) =>
                  <MDBRow>
                    <MDBCol md="3">
                      <MDBView hover rounded className="z-depth-1-half mb-4 w-75">
                        <img
                          className="img-fluid"
                          src={recommended.author? recommended.author.image : "https://mdbootstrap.com/img/Photos/Others/images/86.jpg"}
                          alt=""
                        />
                        <a href="#!">
                          <MDBMask overlay="white-slight" className="waves-light" />
                        </a>
                      </MDBView>
                    </MDBCol>
                    <MDBCol md="9">
                      <p className="font-weight-bold dark-grey-text">
                        {recommended.updatedAt ? recommended.updatedAt : recommended.createdAt}
                      </p>
                      <div className="d-flex justify-content-between">
                        <MDBCol size="11" className="text-truncate pl-0 mb-3">
                          <a href="#!" className="pink-text" onClick={(e) => {
                            e.preventDefault();
                            this.setState({
                              articleState: recommended
                            });
                          }}>
                            {recommended.title}
                          </a>
                        </MDBCol>
                        <a href="#!">
                          <MDBIcon icon="angle-double-right" className="pink-text" />
                        </a>
                      </div>
                    </MDBCol>
                  </MDBRow>
                )}
                </div>

              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard> : <MDBAlert color="warning" className="mt-5 pt-5 text-center"> <h4> Oops! There was problem fetching this article. </h4> </MDBAlert> }
      </div>
    )
  }
}

export default withRouter(Story);
