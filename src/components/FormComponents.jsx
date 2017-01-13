/**
 * Created by Ryan on 12/24/2016.
 */
import React, { Component } from 'react';
import '../../node_modules/rc-slider/assets/index.css'
import {Row, Column} from 'react-cellblock';
import {Button, Icon, Form, Input, Segment, Dropdown, Grid} from 'semantic-ui-react'
import Slider from 'rc-slider';

class NameComponent extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            name:"name",
        }
    }
    handleChange(e) {
        this.setState({name:e.target.value});
    }

    render() {
        return (
        <Row className="row">
            <Column width="1/2" className="cell-left"><label>Please enter your first name</label></Column>
            <Column width="1/2" className="cell-right"><input value={this.state.name} onChange={this.handleChange}/></Column>
        </Row>
        );
    }
}

class AgeComponent extends Component {
    constructor(props) {
        super(props);
        this.style = {height: 100};
        this.marks = {
            0: {
                style: {
                    textAlign: 'right',
                },
                label: '25 or younger',
            },
            1: '26-35 years',
            2: '36-45 years',
            3: '46-55 years',
            4: {
                style: {
                    textAlign: 'left',
                },
                label: '56 or older',
            },
        };
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            age:0,
            min:0,
            max:Object.keys(this.marks).length-1
        }
    }
    handleChange(value) {
        this.setState({age:value});
    }

    render() {
        return (
                <Row className="row">
                    <Column width="1/3" className="cell-left"><label>Please enter your age range</label></Column>
                    <Column width="2/3" className="cell-right slider"><Slider value={this.state.age} step={null} marks={this.marks} min={this.state.min} max={this.state.max} onChange={this.handleChange}/></Column>
                </Row>
        );
    }
}

class AgeComponent2 extends Component {
    constructor(props) {
        super(props);
        this.style = {height: 100};
        this.marks = {
            0: {
                style: {
                    textAlign: 'right',
                },
                label: '25 or younger',
            },
            1: '26-35 years',
            2: '36-45 years',
            3: '46-55 years',
            4: {
                style: {
                    textAlign: 'left',
                },
                label: '56 or older',
            },
        };
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            age:0,
            min:0,
            max:Object.keys(this.marks).length-1
        }
    }
    handleChange(value) {
        this.setState({age:value});
    }

    render() {
        return (
            <Slider value={this.state.age} step={null} marks={this.marks} min={this.state.min} max={this.state.max} onChange={this.handleChange}/>
        );
    }
}


class GenderComponent extends Component {
    constructor(props) {
        super(props);
        this.style = {height: 100};
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            female:true,
        }
    }
    handleChange(value) {
        this.setState({female:value});
    }

    render() {
        return (
            <Button.Group widths="2" size="large">
                <Button color='pink' icon="female" content="Female"></Button>
                <Button.Or/>
                <Button color='blue' icon="male" content="Male"></Button>
            </Button.Group>
        );
    }
}

class YearMonthComponent extends Component {
    constructor(props) {
        super(props);
        this.number = props.number;
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            years:0,
            months:0
        }
        this.months = [
            {
                "text": 'January',
                "value": 1
            },
            {
                "text": 'February',
                "value": 2
            },
            {
                "text": 'March',
                "value": 3
            },
            {
                "text": 'April',
                "value": 4
            },
            {
                "text": 'May',
                "value": 5
            },
            {
                "text": 'June',
                "value": 6
            },
            {
                "text": 'July',
                "value": 7
            },
            {
                "text": 'August',
                "value": 8
            },
            {
                "text": 'September',
                "value": 9
            },
            {
                "text": 'October',
                "value": 10
            },
            {
                "text": 'November',
                "value": 11
            },
            {
                "text": 'December',
                "value": 12
            },

        ]
        this.year = [];
        const currentYear = new Date().getFullYear();
        for (let i=currentYear; i>currentYear-12; i--) {
            this.year.push(
                {
                    'text': i,
                    'value': i
                }
            );
        }
        this.style = {
            width:700,
            borderStyle:"dotted"
        }
    }
    handleChange(value) {
        this.setState({years:value});
    }

    render() {
        return (
            <Form.Group>
                {/*
                    <div style={this.style}/>
                */}
                <Dropdown defaultValue={this.months[0].value} fluid selection options={this.months} />
                <Dropdown defaultValue={this.year[0].value} fluid selection options={this.year} />
            </Form.Group>
        );
    }

}


class KidComponent extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.setupChildren = this.setupChildren.bind(this);
        this.state = {
            number: 0,
            kids: []
        }

        this.segmentStyle = {
            width:300,
            position:"absolute",
            right:0,
        }
        this.marks = {
            0: '1',
            1: '2',
            2: '3',
            3: '4',
            4: '5',
            5: '6',
            6: '7',
            7: '8',
            8: '9',
            9: '10',
        };
        this.childrenStyle = { paddingBottom:30}
        this.setupChildren()
    }
    handleChange(value) {
        let newKids = this.setupChildren();
        this.setState({number:value, kids:newKids});
    }

    setupChildren(){
        let kidlen = this.state.kids.length;

        if (kidlen === 0) { //we need to initialize the kids
            let newKids = [];
            for (let i=0; i<this.state.number+1; i++) {
                newKids.push({years:1, months:0});
            }
            return newKids;
        }
        if (this.state.number+1 < kidlen) { //we have less kids than what is presented
            let newKids = [];
            for (let i=0; i<this.state.number; i++) {
                newKids.push(this.state.kids[i]);
            }
            return newKids;
        }
        return [];
    }

    render() {
        let fields = [];
        for (let i=0; i<this.state.number+1; i++) {
            fields.push(
                <div>
                    <Segment>
                        <Form.Field control={YearMonthComponent} number={(i + 1)}
                                    class="kidAge" className="kidAgeField"
                                    label={"Child " + (i + 1) + ": Birth month and year"}/>
                    </Segment>
                </div>
            );
        }
        return (
            <div className="kids">
            <Slider className="kidsSlider" value={this.state.number} step={null} marks={this.marks} min={0} max={9} onChange={this.handleChange}/>
                <div className="ptop">
                    <Segment.Group style={this.segmentStyle}>
                        { fields }
                    </Segment.Group>
                </div>
            </div>
        );
    }
}

class TestComponent extends Component {
    constructor(props) {
        super(props);
        this.style = {height: 100};
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            female:true,
        }
        this.marks = {
            0: {
                style: {
                    textAlign: 'right',
                },
                label: '25 or younger',
            },
            1: '26-35 years',
            2: '36-45 years',
            3: '46-55 years',
            4: {
                style: {
                    textAlign: 'left',
                },
                label: '56 or older',
            },
        };

    }
    handleChange(value) {
        this.setState({female:value});
    }

    render2() {
        return (
            <div>
                {
                    <Form>
                        <Form.Group widths="equal">
                            <Form.Field control={Input} label="First Name" placeholder="First Name"/>
                            <Form.Field control={GenderComponent} label="Gender"/>
                        </Form.Group>
                        <Form.Field>
                            <label>Age</label>
                            <AgeComponent2/>
                        </Form.Field>
                        <Form.Field>
                            <label>How many children do you have?</label>
                            <KidComponent/>
                            <HobbiesComponent/>
                        </Form.Field>
                    </Form>
                }
            </div>

        );
    }

    render() {
        return (
            <div>
                <HobbiesComponent/>
            </div>

        );
    }
}

class HobbiesComponent extends Component {
    constructor(props) {
        super(props);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.hobbyLimit = 10;
        this.state = {
            data: [],
            input: "",
            canAdd: false,
        }
        this.segmentStyle = {
            fontSize: 13,
            color: "Gray",
        }
        this.limitStyle = {
            fontSize: 12,
            fontWeight: "bold",
            color: "Red"
        }
        this.segmentGroupStyle = {
            width:300,
            marginTop:0,
            marginBottom:0,
            marginLeft:'auto',
            marginRight:'auto'
        }
    }

    handleKeyPress(event) {
        if (!this.state.canAdd)
            return;
        if (event.key == 'Enter') {//return was pressed
            this.handleAdd();
        }
    }
    handleInput(e) {
        this.state.canAdd = (this.state.data.length < this.hobbyLimit && e.target.value.length > 0);
        this.setState({input: e.target.value});
    }
    handleAdd() {
        if (this.state.input.length <= 0)
            return;
        let entries = this.state.data;
        if (entries.some(e => this.state.input.toLocaleLowerCase() === e.toLowerCase())) {
            this.setState({input:""});
            return;
        }
        entries.push(this.state.input);
        this.setState({data: entries, input:"", canAdd:false});
    }

    handleRemove(e) {
        const name = e.target.id;
        if (name === undefined || !name.startsWith("remove_"))
            return;
        var value = parseInt(name.substr(7));
        if (isNaN(value))
            return;
        let entries=this.state.data;
        entries.splice(value, 1);
        this.setState({data:entries});
    }

    render() {
        let entriesHtml = [];
        if (this.state.data.length > 0) {
            for (let i = 0; i < this.state.data.length; i++) {
                var name="remove_"+i;
                var hobby_name="hobby_"+i;
                entriesHtml.push(
                    <Segment style={this.segmentStyle}>
                        <Grid>
                            <Grid.Column floated="left" width={13}>
                                <b className="hobbyItem">{this.state.data[i]}</b>
                            </Grid.Column>
                            <Grid.Column floated="right" width={3}>
                                <Icon link id={name} className="hobbyDelete" onClick={this.handleRemove} name="remove"/>
                            </Grid.Column>
                        </Grid>
                    </Segment>
                );
            }
        }

        return (
        <div className="hobby">
            <Form.Field control={Input} onKeyPress={this.handleKeyPress} onChange={this.handleInput} action={{className:"hobbyLabel", content:"Add Hobby", onClick:this.handleAdd, disabled:!this.state.canAdd}} value={this.state.input} placeholder="Hobby"/>
            { entriesHtml.length >= this.hobbyLimit &&
            <p className="hobbyLimit" style={this.limitStyle}>That's a lot of hobbies!  Lets leave it at that for now.</p>
            }
            { entriesHtml.length > 0 &&
                <Segment.Group className="hobbyList" style={this.segmentGroupStyle} raised>
                {entriesHtml}
                </Segment.Group>
            }
        </div>
        );
    }
}



module.exports = {NameComponent, AgeComponent, GenderComponent, HobbiesComponent, KidComponent, TestComponent};
