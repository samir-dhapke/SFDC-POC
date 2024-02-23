/**
 * @description       : 
 * @author            : Samir Dhapke
 * @group             : 
 * @last modified on  : 01-02-2024
 * @last modified by  : Samir Dhapke
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   12-30-2023   Samir Dhapke   Initial Version
**/
import { LightningElement, track } from 'lwc';
import getAccountRecords from '@salesforce/apex/ComboboxDemo.getAccountRecords';
import getAccountContacts from '@salesforce/apex/ComboboxDemo.getAccountContacts';
const columns = [
    { label: 'Contact Name', fieldName: 'Name' },
    { label: 'Email', fieldName: 'Email' },
];
export default class ComboboxWithDatatableAccountRelatedContactDisplay extends LightningElement {
    @track value = '';
    @track accOption = [];
    @track isVisible = false;
    @track columns = columns;
    @track data = [];
    get options() {
        return this.accOption;
    }

    connectedCallback() {
        getAccountRecords()
            .then(result => {
                console.log('result', result);
                let arr = [];
                for (var i = 0; i < result.length; i++) {
                    arr.push({
                        label: result[i].Name,
                        value: result[i].Id,

                    });
                }
                this.accOption = arr;
            })
            .catch(error => {

            })
    }
    handleChangeAccount(event) {
        this.isVisible = true;
        this.value = event.detail.value;
        //window.alert(this.value);
        getAccountContacts({ selectedAccountId: this.value })
            .then(result => {
                this.data = result;
            })
            .catch(error => {

            })
    }

}