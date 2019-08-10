import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import Cohort from "./pages/Cohort"
import Login from "./pages/Login"
import CohortList from "./pages/CohortList"
import {
  Container, Menu
} from 'semantic-ui-react'
import {BCS_TOKEN} from "./localKeys"
import Emoji from "./components/Emoji"
import Footer from "./components/Footer";

class App extends Component {
  state = {
    loggedIn: false
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  logOut = () => {
    localStorage.removeItem(BCS_TOKEN);
    console.log(this.props.router);
    // this.props.history.push('/login');
  }

  render() {
    return (
      <Router>
        <Menu fixed='top' inverted>
        <Menu.Item color='green'>
        <Emoji label="sheep" symbol="🐸"/> BCS-MISSING-VIDEOS
        </Menu.Item>

        <Route
                path="/cohort"
                render={ props => (
                    <Menu.Item as={Link} to='/cohortList'
                      name='CohortList'
                    >
                      Cohort List
                    </Menu.Item>
                )}
              />
        
        <Menu.Menu position='right'>
          <Menu.Item
            name='LogOut'
            as={Link} to="/login"
            onClick={this.logOut}
          >
            Log Out
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      <Container style={{ marginTop: '6em'}}>
      <div>
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/cohort" component={Cohort} />
          <Route exact path="/cohort/:id" component={Cohort} />
          <Route exact path="/cohortList" component={CohortList} />
      </div>
      </Container>
      <Footer/>
    </Router>
    );
  }
}

export default App;
