import React from 'react';
import ReactDOM from 'react-dom';
import {
    renderIntoDocument,
    findAllInRenderedTree,
    findRenderedDOMComponentWithClass,
    findRenderedDOMComponentWithTag,
    scryRenderedDOMComponentsWithClass,
    Simulate
} from 'react-addons-test-utils';
import {KidComponent} from '../src/components/FormComponents';
import { expect } from 'chai';


function findAllClass(tree, name) {
    return findAllInRenderedTree(tree, (e) => {
        if (e != undefined && e.props != undefined && (e.props.className == name || e.props.class == name)) {
            return true;
        }
        return false;
    });
}

describe('KidComponent', () => {
    it('should render a div with "KidComponent" class', () => {
        const component = renderIntoDocument(
            <KidComponent />
        );
        const todoEle = findRenderedDOMComponentWithClass(component, 'kids');

        expect(todoEle).to.be.ok;
    });

    it('should check for default slider status', () => {
        const component = renderIntoDocument(
            <KidComponent/>
        );
        const slider = findAllClass(component, "kidsSlider")[0];
        expect(slider).to.be.ok;
        expect(slider.props.value).to.equal(0);
        expect(slider.props.min).to.equal(0);
        expect(slider.props.max).to.equal(9);
    });

    it('should change slider value and check for info', () => {
        const component = renderIntoDocument(
            <KidComponent/>
        );
        const slider = findAllClass(component, "kidsSlider")[0];
        component.state.number = slider.props.max;
        component.handleChange(slider.props.max);
        let kidAges = scryRenderedDOMComponentsWithClass(component, 'kidAgeField');
        expect(kidAges.length).to.equal(slider.props.max+1);
        component.state.number = 0;
        component.handleChange(0);
        kidAges = scryRenderedDOMComponentsWithClass(component, 'kidAgeField');
        expect(kidAges.length).to.equal(1);

    });
    it('check kid calender and label', () => {
        const component = renderIntoDocument(
            <KidComponent/>
        );
        const slider = findAllClass(component, "kidsSlider")[0];
        component.state.number = slider.props.max;
        component.handleChange(slider.props.max);
        let kidAges = findAllClass(component, "kidAge");
        for (let i=0; i<slider.props.max; ++i) {
            expect(kidAges[i].props.number).to.equal(i+1);
        }
    });


});