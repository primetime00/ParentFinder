import React, { Component, View, Text } from 'react';
import {KidComponent, NameComponent, GenderComponent, AgeComponent, HobbiesComponent} from './components/FormComponents';
import {Button, Icon, Form, Input, Segment, Dropdown, Grid} from 'semantic-ui-react'
import logo from './logo.svg';
import './App.css';

class App extends Component {

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to React</h2>
                </div>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <div>
                    <Form>
                        <Form.Group widths="equal">
                            <Form.Field control={NameComponent} label="First Name" placeholder="First Name"/>
                            <Form.Field control={GenderComponent} label="Gender"/>
                        </Form.Group>
                        <Form.Field control={AgeComponent} label="Age"/>
                        <Form.Field control={KidComponent} label="How many children do you have?"/>
                        <Form.Field control={HobbiesComponent} label="List a few of your hobbies."/>
                    </Form>
                </div>
            </div>
        );
    }
}


export default App;
