import React, { Component } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon, MDBModal, MDBModalHeader, MDBModalBody, MDBBtn, MDBRow, MDBCol, MDBInput, MDBAlert } from "mdbreact";
import { withRouter } from 'react-router-dom';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import logo from '../assets/images/logo.fw.png';

class Navbar extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      key: '',
      joined: new Date(),
      submitError: false,
      loginError: false,
      errorMsg: 'wrong email or password!',
      modal1: false,
      loginForm: true,
      loggedIn: false,
      isOpen: false,
      about: false,
      membership: false,
      gallery: false,
      contact: false,
      programActive: ''
    };
    if (this.props.activateForm) {
      this.setState({
        modal1: true
      });
    }
  }
  componentDidMount = () => {
    if (this.props.dataToChild !== null) {
    this.setState({
      loggedIn: true
    });
    } else {
      this.setState({
        loggedIn: false
      })
    }
  }

toggle = nr => () => {
  let modalNumber = 'modal' + nr
  this.setState({
    [modalNumber]: !this.state[modalNumber]
  });
}

toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}

handleStyle = (nr) => (e) => {
  e.preventDefault();
  this.toggleCollapse();
  if(nr === 1) {
    this.setState({
      home: true,
      about: false,
      membership: false,
      write: false,
      contact: false
    });
    this.props.history.push('/')
  }

  if(nr === 2) {
    this.setState({
      home: false,
      about: true,
      membership: false,
      write: false,
      contact: false
    });
    // this.props.history.push('/about');
  }
  // if(nr === 3) {
  //   this.setState({
  //     home: false,
  //     about: false,
  //     membership: false,
  //     write: false,
  //     contact: false
  //   });
  //   this.props.history.push('/test');
  // }
  if(nr === 4) {
    this.setState({
      home: false,
      about: false,
      membership: true,
      write: false,
      contact: false
    });
    // this.props.history.push('/membership');
  }
  if(nr === 5) {
    this.setState({
      home: false,
      about: false,
      membership: false,
      write: true,
      contact: false
    });
    // this.props.history.push('/write');
  }
  if(nr === 6) {
    this.setState({
      home: false,
      about: false,
      membership: false,
      write: false,
      contact: true
    });
    this.props.history.push('/contact');
  }
}

changeHandler = (e) => {
  e.preventDefault();
  this.setState({
    [e.target.name]: e.target.value
  })
}

toastSubmitPost = () => {
  toast.success("Operation successfull!")
}

signupSubmit = () => {
  axios.post('https://conduit.productionready.io/api/user', this.state)
  .then(response => {
    if(response.status === 200){
      this.toastSubmitPost();
        this.setState({
          submitError: false,
          modal1: false
        });
        this.loginSubmit();
    } else {
      this.setState({
        submitError: true,
        // modal1: false
      });
    }
  })
  .catch(error => error)
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
      //
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
  const { username, email, password } = this.state
  return (
     // <Router>
     <MDBNavbar color="rgba-stylish-strong" fixed="top" dark expand="lg" scrolling>
       <MDBNavbarBrand>
        <a href="#!">  <img src={logo} alt="Med Blogging logo" className="img-fluid mr-3" /> </a>
       </MDBNavbarBrand>
       <MDBNavbarToggler onClick={this.toggleCollapse} />
       <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar className="transparent-bg-strong">
         <MDBNavbarNav left>
           {this.state.home === true ?
             <MDBNavItem active className="mr-3">
               <MDBNavLink to="/" onClick={this.handleStyle(1)}>Home</MDBNavLink>
             </MDBNavItem> :
             <MDBNavItem className="mr-3">
               <MDBNavLink to="/" onClick={this.handleStyle(1)}>Home</MDBNavLink>
             </MDBNavItem>}

           {this.state.about === true ?
             <MDBNavItem active className="mr-3">
               <MDBNavLink to="#!" onClick={this.handleStyle(2)}>About</MDBNavLink>
             </MDBNavItem> :
             <MDBNavItem className="mr-3">
               <MDBNavLink to="#!" onClick={this.handleStyle(2)}>About</MDBNavLink>
             </MDBNavItem>}

           {this.state.membership === true ?
             <MDBNavItem active className="mr-3">
               <MDBNavLink to="/Join" onClick={this.handleStyle(4)}>Membership</MDBNavLink>
             </MDBNavItem> :
             <MDBNavItem className="mr-3">
               <MDBNavLink to="/Join" onClick={this.handleStyle(4)}>Membership</MDBNavLink>
             </MDBNavItem>}

           {this.state.write === true ?
             <MDBNavItem active className="mr-3">
               <MDBNavLink to="#!" onClick={this.handleStyle(5)}>Write</MDBNavLink>
             </MDBNavItem> :
             <MDBNavItem className="mr-3">
               <MDBNavLink to="#!" onClick={this.handleStyle(5)}> Write </MDBNavLink>
             </MDBNavItem>}

           {this.state.contact === true ?
             <MDBNavItem active className="mr-3">
               <MDBNavLink to="/Contact" onClick={this.handleStyle(6)}>Contact </MDBNavLink>
             </MDBNavItem> : <MDBNavItem className="mr-3">
               <MDBNavLink to="#!" onClick={this.handleStyle(6)}>Contact </MDBNavLink>
             </MDBNavItem>}

           </MDBNavbarNav>
           <MDBNavbarNav right>
             <MDBNavItem>
               <MDBNavLink className="waves-effect waves-light" to="#!" onClick={()=> window.open("https://facebook.com", "_blank")}>
                 <MDBIcon fab icon="facebook" />
               </MDBNavLink>
             </MDBNavItem>
             <MDBNavItem>
               <MDBNavLink className="waves-effect waves-light" to="#!" onClick={() =>
                   window.open("https://twitter.com/", "_blank") }>
                 <MDBIcon fab icon="twitter" />
               </MDBNavLink>
             </MDBNavItem>
             <MDBNavItem>
               <MDBNavLink className="waves-effect waves-light" to="#!" onClick={() => window.open("https://instagram.com", "_blank")}>
                 <MDBIcon fab icon="instagram" />
               </MDBNavLink>
             </MDBNavItem>
             {
               this.state.loggedIn ?
                  <MDBNavItem>
                    <MDBDropdown>
                     <MDBDropdownToggle nav caret>
                    <MDBIcon icon="user" /> User
                     </MDBDropdownToggle>
                     <MDBDropdownMenu className="dropdown-default">
                    <MDBDropdownItem href="#!">
                      <div className="waves-effect waves-light" to="#!" onClick={this.logout}>
                      <MDBIcon icon="sign-out-alt" className="px-2" />
                      Logout
                    </div>
                    </MDBDropdownItem>
                     </MDBDropdownMenu>
                    </MDBDropdown>
                  </MDBNavItem>
               :
               <MDBNavItem>
                 <MDBDropdown>
                  <MDBDropdownToggle nav caret>
                 <MDBIcon icon="user" />
                  </MDBDropdownToggle>
                  <MDBDropdownMenu className="dropdown-default">
                 <MDBDropdownItem href="#!">
                   <div className="waves-effect waves-light" to="#!" onClick={this.toggle(1)}>
                   <MDBIcon icon="sign-in-alt" className="px-2" />
                   login
                 </div>
                 </MDBDropdownItem>

                  </MDBDropdownMenu>
                 </MDBDropdown>
               </MDBNavItem>
             }
           </MDBNavbarNav>

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
        <MDBBtn color="white" onClick={() => this.setState({loginForm: true})}>Login</MDBBtn>
        <MDBBtn color="pink" onClick={() => this.setState({loginForm: false})}>Sign up</MDBBtn>
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
         </MDBCollapse>
       </MDBNavbar>
    // </Router>
    );
  }
}

export default withRouter(Navbar);
