import React, { Component } from "react";
import API from "../utils/API"
import SessionCard from "../components/SessionCard";

class App extends Component {

    state = {
        msg: "Hola",
        sessions: [{session:{id: -1}, videoUrlList:[]}],
        loading: true,
        loggedIn: true,
        enrollmentId: -1
    }

    componentDidMount(){
        const enrollmentId  = this.props.match.params.id;
        console.log(enrollmentId);
        API.getSessions(enrollmentId).then(r => {
            console.log(r.data[0]);
            this.setState({
                sessions: r.data,
                loading: false,
                loggedIn: true
            }, () => console.log(this.state.sessions));
        }).catch(err => {
            console.log(err);
            this.setState({
                loggedIn: false
            });
        });
    }

    onClearArray = () => {
        this.setState({ sessions: [{session:{id:99}}] }, console.log(this.state.sessions));
    };

    render() {
        return (
            <div>
                { (this.state.loading) ? <img src={require('../resources/loading.gif')}></img> : "" } 
                { (this.state.loggedIn) ? "" : "Not logged in" }
                {this.state.sessions.filter(x => x.session.id !== -1).map(item => 
                    <SessionCard name={item.session.name}></SessionCard>
                )} 
                
                <ul>
                    {
                        this.state.sessions.filter(x => x.session.id !== -1).map(item => 
                            <li key={item.session.id}>  {item.session.name} - {item.videoUrlList.length}</li>
                            
                        )
                    }
                </ul>
            </div>
        );
    }
}

export default App;