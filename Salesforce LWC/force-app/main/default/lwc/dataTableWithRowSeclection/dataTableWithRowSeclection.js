/**
 * @description       : 
 * @author            : Samir Dhapke
 * @group             : 
 * @last modified on  : 04-07-2024
 * @last modified by  : Samir Dhapke 
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   04-07-2024   Samir Dhapke   Initial Version
**/
import { api, LightningElement, track } from 'lwc';
import getContactlst from '@salesforce/apex/DataTableWithRowSelection.getContactList';

const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Phone', fieldName: 'Phone' }
]
export default class DataTableWithRowSeclection extends LightningElement {
    @track showContact = 'Show Contacts';
    @track isVisible = false;
    columns = columns;
    @track data = [];
    @api recordId;//Its Store the current page reocrdId
    @track searchKey;

    //get related contacts from apex class
    connectedCallback() {
        //calling apex method
        getContactlst({ lwcRecordId: this.recordId })
            .then(response => {
                this.data = response;
            })
            .catch(err => {
                console.log('error occured' + err);
            })
    }
    // search functionality

    handleChanged(event) {
        this.searchKey = event.target.value;
        getContactlst({ searchKeys: this.searchKey, lwcRecordId: this.recordId })
            .then(res => {
                this.data = res;
            })
            .catch(error => {
                console.log('error occured');
            })
    }
    //show/Hide Button toggle Functionality
    handleClick(event) {
        const label = event.target.label;
        if (label === 'Show Contacts') {
            this.showContact = 'Hide Contacts';
            this.isVisible = true;
        } else if (label === 'Hide Contacts') {
            this.showContact = 'Show Contacts';
            this.isVisible = false;
        }

    }
    //get details of row selected
    getSelectedRow(event) {
        const selectedRows = event.detail.selectedRows;
        window.alert(JSON.stringify(selectedRows));
        console.log('event.detail.config.value => ' + event.detail.config.value);
    }

}