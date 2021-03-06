import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import Profile from './components/Profile';
import Story from './components/Story';
import Contact from './components/Contact';
import './App.css';

function App() {
  const [initialForm, setForm] = useState(null);
  const [initialArticle, setArticle] = useState(null);
  const [initialWriter, setWriter] = useState(null);
  let userLogin;
  let loggedIn = null;
  if (localStorage.getItem("localData")) {
    loggedIn = JSON.parse(localStorage.getItem('localData')).token;
  }

  function grabLogin (loginFromHome) {
    userLogin = loginFromHome;
    setForm(userLogin);
    return userLogin;
  };

  return (
    <div>
      <Router>
        <Navbar dataToChild ={loggedIn}/>
        <Switch>
          <Route path="/" render={(props) => {
            return (
              <div>
                <Home dataToChild = {loggedIn} loginForm={grabLogin} sendArticle={(article) => setArticle(article)} sendWriter={(writer) => setWriter(writer)} />
              </div>
            )
          }} exact/>
          <Route path={'/profile'} render={props => (
            <Profile dataToChild ={loggedIn} writer={initialWriter} />
          )} exact />
          <Route path={'/story'} render={props => (
            <Story dataToChild ={loggedIn} article={initialArticle} />
          )} exact />
          <Route path={'/contact'} render={props =>  (
            <Contact dataToChild = {loggedIn} />
          )} exact />
        </Switch>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
