import { LightningElement, wire } from 'lwc';
import getContactList from '@salesforce/apex/contactController.getContactList';
export default class ContactList extends LightningElement {
    @wire(getContactList)
    getcontactList;
    selectedContact;

    selectionHandler(event) {
        let selectedContactId = event.detail;
        console.log('selectedContactId ==> ' + selectedContactId);
        this.selectedContact = this.getcontactList.data.find((currentItem) => currentItem.Id == selectedContactId);

    }
}