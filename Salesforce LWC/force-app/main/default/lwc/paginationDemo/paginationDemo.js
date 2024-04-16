/**
 * @description       : 
 * @author            : Samir Dhapke
 * @group             : 
 * @last modified on  : 04-08-2024
 * @last modified by  : Samir Dhapke
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   04-08-2024   Samir Dhapke   Initial Version
**/
import { LightningElement, wire } from 'lwc';
import getContactList from '@salesforce/apex/paginationController.getContactList';
import getAccountList from '@salesforce/apex/paginationController.getAccountList';

const columns = [
    { label: 'Id', fieldName: 'Id' },
    { label: 'Name', fieldName: 'Name' },

];

export default class PaginationDemo extends LightningElement {
    columns = columns;
    totalContacts;
    visibleContacts;

    totalAccounts;
    visibleAccounts;

    @wire(getContactList)
    wiredContact({ error, data }) {
        if (data) {
            this.totalContacts = data;
            //console.log('this.totalContacts -> ' + JSON.stringify(this.totalContacts));
        }
        if (error) {
            console.error(error);
        }
    }
    // @wire(getAccountList)
    // wiredaccount({ error, data }) {
    //     if (data) {
    //         this.totalAccounts = data
    //         console.log(this.totalAccounts)
    //     }
    //     if (error) {
    //         console.error(error)
    //     }
    // }

    updateContactHandler(event) {
        this.visibleContacts = [...event.detail.records]
        // console.log(event.detail.records)
    }
    // updateAccountHandler(event) {
    //     this.visibleAccounts = [...event.detail.records]
    //     //  console.log(event.detail.records)
    // }
}