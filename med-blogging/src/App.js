import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
// import Join from './components/Join';
// import Contact from './components/Contact';
import About from './components/About';
// import Programs from './components/Programs';
import './App.css';

function App() {
  let loggedIn = null;
  if (localStorage.getItem("localData")) {
    loggedIn = JSON.parse(localStorage.getItem('localData')).token;
  }

  return (
    <div>
      <Router>
        <Navbar dataToChild = {loggedIn}/>
        <Switch>
          <Route path="/" render={(props) => {
            return (
              <div>
                <Home dataToChild = {loggedIn} />
              </div>
            )
          }} exact/>
          {/* <Route path={'/contact'}
            render={props => (
              <Contact dataToChild = {loggedIn} />
            )} exact /> */}
          <Route path={'/about'} render={props =>  (
            <About dataToChild = {loggedIn} />
          )} exact />
          {/* <Route path={'/programs'} render={props => (
            <Programs dataToChild = {loggedIn} />
          )} exact /> */}
        </Switch>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;














// import logo from './logo.svg';
// import './App.css';
//
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
//
// export default App;
