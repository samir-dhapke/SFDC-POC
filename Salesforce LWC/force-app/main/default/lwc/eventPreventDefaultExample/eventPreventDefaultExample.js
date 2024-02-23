import { LightningElement, api } from 'lwc';

export default class EventPreventDefaultExample extends LightningElement {
    @api contact;

    clickHandler(event) {
        //here we have adding the clickable event by using anchor tag, 
        //default behaviour of anchore tag is to nevigate to the reference 
        //and so as soon as we click on that link we have to stop their behaviour so we use event.preventDefault();
        //Bec as click on that link or button we have pass the some data to the other component.Ex. contact detail
        //  <a href="#" onclick={clickHandler}> use # to no where nevigate 
        //prevent the anchore element to nevigate 
        event.preventDefault();
        let selectedEvent = new CustomEvent('selection', {
            detail: this.contact.Id
        });
        this.dispatchEvent(selectedEvent);

    }
}