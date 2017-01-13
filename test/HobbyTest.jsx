import React from 'react';
import {
    renderIntoDocument,
    findRenderedDOMComponentWithClass,
    findRenderedDOMComponentWithTag,
    scryRenderedDOMComponentsWithClass,
    Simulate
} from 'react-addons-test-utils';
import {HobbiesComponent} from '../src/components/FormComponents';
import { expect } from 'chai';

describe('HobbyComponent', () => {
    it('should render a div with "HobbyComponent" class', () => {
        const component = renderIntoDocument(
            <HobbiesComponent />
        );
        const todoEle = findRenderedDOMComponentWithClass(component, 'hobby');

        expect(todoEle).to.be.ok;
    });

    it('should render a div with the \'Add Hobby\' text', () => {
        const component = renderIntoDocument(
            <HobbiesComponent/>
        );
        const todoEle = findRenderedDOMComponentWithClass(component, 'hobbyLabel');
        const todoText = todoEle.textContent;

        expect(todoText).to.equal('Add Hobby');
    });

    it('Test hobby input is available', () => {
        const component = renderIntoDocument(
            <HobbiesComponent/>
        );
        const inputField = findRenderedDOMComponentWithTag(component, 'input');
        expect(inputField).to.be.ok;
    });

    it('Test hobby input \'Running\' and \'Jumping\' with return key', () => {
        const component = renderIntoDocument(
            <HobbiesComponent/>
        );
        const inputField = findRenderedDOMComponentWithTag(component, 'input');
        const button = findRenderedDOMComponentWithTag(component, 'button');
        inputField.value = 'Running';
        Simulate.change(inputField);
        Simulate.click(button);
        const hobbyItem = findRenderedDOMComponentWithClass(component, 'hobbyItem');
        expect(hobbyItem.textContent).to.equal("Running");
        inputField.value = 'Jumping';
        Simulate.change(inputField);
        Simulate.keyPress(inputField, {key: 'Enter'});
        expect(scryRenderedDOMComponentsWithClass(component, 'hobbyItem').length).to.equal(2);
        expect(scryRenderedDOMComponentsWithClass(component, 'hobbyItem')[1].textContent).to.equal("Jumping");

    });
    it('Test hobby input same item', () => {
        const component = renderIntoDocument(
            <HobbiesComponent/>
        );
        const inputField = findRenderedDOMComponentWithTag(component, 'input');
        const button = findRenderedDOMComponentWithTag(component, 'button');
        inputField.value = 'Running';
        Simulate.change(inputField);
        Simulate.click(button);
        inputField.value = 'Jumping';
        Simulate.change(inputField);
        Simulate.click(button);
        inputField.value = 'Running';
        Simulate.change(inputField);
        Simulate.click(button);

        const hobbyItems = scryRenderedDOMComponentsWithClass(component, 'hobbyItem');
        expect(hobbyItems.length).to.equal(2);
        expect(hobbyItems[0].textContent).to.equal("Running");
        expect(hobbyItems[1].textContent).to.equal("Jumping");

    });
    it('Test hobby for 10 items', () => {
        const component = renderIntoDocument(
            <HobbiesComponent/>
        );
        const inputField = findRenderedDOMComponentWithTag(component, 'input');
        const button = findRenderedDOMComponentWithTag(component, 'button');
        for (let i=0; i<15; i++) {
            inputField.value = 'item'+i;
            Simulate.change(inputField);
            Simulate.click(button);
        }

        const hobbyLimit = findRenderedDOMComponentWithClass(component, 'hobbyLimit');
        const hobbyItems = scryRenderedDOMComponentsWithClass(component, 'hobbyItem');
        expect(hobbyItems.length).to.equal(10);
        expect(hobbyLimit).to.be.ok;

    });
    it('Test hobby for delete', () => {
        const component = renderIntoDocument(
            <HobbiesComponent/>
        );
        const inputField = findRenderedDOMComponentWithTag(component, 'input');
        const button = findRenderedDOMComponentWithTag(component, 'button');
        for (let i=0; i<10; i++) {
            inputField.value = 'item'+i;
            Simulate.change(inputField);
            Simulate.click(button);
        }

        const hobbyLimit = findRenderedDOMComponentWithClass(component, 'hobbyLimit');
        const hobbyItems = scryRenderedDOMComponentsWithClass(component, 'hobbyItem');
        expect(hobbyItems.length).to.equal(10);
        expect(hobbyLimit).to.be.ok;

        let hobbyDeletes = scryRenderedDOMComponentsWithClass(component, 'hobbyDelete');

        expect(hobbyDeletes).to.be.ok;
        expect(hobbyDeletes.length).to.equal(10);

        Simulate.click(hobbyDeletes[0]);

        expect(scryRenderedDOMComponentsWithClass(component, 'hobbyLimit').length).to.equal(0);
        expect(scryRenderedDOMComponentsWithClass(component, 'hobbyItem').length).to.equal(9);
        hobbyDeletes = scryRenderedDOMComponentsWithClass(component, 'hobbyDelete');
        for (let del = hobbyDeletes.length-1; del >= 0; del-- ) {
            Simulate.click(hobbyDeletes[del]);
        }
        expect(scryRenderedDOMComponentsWithClass(component, 'hobbyItem').length).to.equal(0);
    });

    it('Test hobby button status', () => {
        const component = renderIntoDocument(
            <HobbiesComponent/>
        );
        const inputField = findRenderedDOMComponentWithTag(component, 'input');
        expect(component.state.canAdd).to.equal(false);
        for (let i=0; i<10; i++) {
            inputField.value = 'item'+i;
            Simulate.change(inputField);
            expect(component.state.canAdd).to.equal(true);
            Simulate.click(findRenderedDOMComponentWithTag(component, 'button'));
            expect(component.state.canAdd).to.equal(false);
        }
        inputField.value = 'final';
        Simulate.change(inputField);
        expect(component.state.canAdd).to.equal(false);
        let hobbyDeletes = scryRenderedDOMComponentsWithClass(component, 'hobbyDelete');
        Simulate.click(hobbyDeletes[0]);
        inputField.value = 'final2';
        Simulate.change(inputField);
        expect(component.state.canAdd).to.equal(true);
    });


});