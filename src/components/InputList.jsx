import React, { Component } from 'react';
import './InputList.css'

// Create component for app header composed of input and button
const HobbyHead = ({addHobby}) => {
    // Input Tracker
    let input;

    // Return AppHead component
    return (
        <div className='input-group'>
            <input ref={node => {
                input = node;
            }} className='form-control' type='text' />

            <button onClick={() => {
                addHobby(input.value);
                input.value = '';
            }} className='input-group-addon'>
                Add Hobby
            </button>
        </div>
    );
};

// Create component for new task composed of list item, text and icon
const Hobby = ({hobby, remove}) => {
    // For each task create list item with specific text and icon to remove the task
    return (
        <li className='hobby-item'>{hobby.text} <span className='fa fa-trash-o input-remover pull-right' onClick={() => {remove(hobby.id)}}></span></li>
    );
}

// Create component for list of tasks
const HobbyList = ({hobbies,remove}) => {
    // Create new node for each task
    const hobbyNode = hobbies.map((hobby) => {
        return (<Hobby hobby={hobby} key={hobby.id} remove={remove}/>)
    });

    // Return the list component with all tasks
    return (<ul className='hobby-list'>{hobbyNode}</ul>);
}

// Create global variable for task id
window.id = 0;

// Create main task app component
class HobbyCreator extends Component {
    constructor(prop) {
        // Provide parent class with prop
        super(prop);

        // Set initial state as empty
        this.state = {
            data: []
        }
    }

    // Add task handler
    addHobby(val) {
        // Get the data for tasks such as text and id
        const hobby = {
            text: val,
            id: window.id++
        }

        // Update data if input contains some text
        if (val.length > 0) this.state.data.push(hobby);

        // Update state with newest data - append new task
        this.setState({
            data: this.state.data
        });
    }

    // Handle remove
    removeHobby(id) {
        // Filter all tasks except the one to be removed
        const hobbyCollection = this.state.data.filter((hobby) => {
            if (hobby.id !== id) return hobby;
        });

        // Update state with filtered results
        this.setState({
            data: hobbyCollection
        });
    }

    render() {
        // Render whole App component
        // use AppHead and AppList components
        return (
            <div>
                <HobbyHead addHobby={this.addHobby.bind(this)}/>
                    <HobbyList
                        hobbies={this.state.data}
                        remove={this.removeHobby.bind(this)}
                    />
            </div>
        );
    }
}

module.exports = {HobbyCreator};