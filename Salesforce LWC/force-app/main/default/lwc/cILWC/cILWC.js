/**
 * @description       : 
 * @author            : Samir Dhapke
 * @group             : 
 * @last modified on  : 02-27-2024
 * @last modified by  : Samir Dhapke
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   02-27-2024   Samir Dhapke   Initial Version
**/
import { LightningElement, track, wire } from 'lwc';
//import searchContactList from '@salesforce/apex/LWC_ContactController.searchContactList';
import searchAccountList from '@salesforce/apex/LWC_ContactController.searchAccountList';
export default class CILWC extends LightningElement {
    @track searchKey = '';
    //@track contacts;
    @track accounts;

    @track error;

    searchAccounts(event) {
        this.searchKey = event.target.value;
    }
    @wire(searchAccountList, { accountName: '$searchKey' })
    wiredContacts({ data, error }) {
        if (data) {
            this.accounts = data;
            this.error = undefined;
        }
        else if (error) {
            this.error = error;
            this.accounts = undefined;
        }
    }
    /*@wire(searchContactList, { accountName: '$searchKey' })
    wiredContacts({ data, error }) {
        if (data) {
            this.contacts = data;
            this.error = undefined;
        }
        else if (error) {
            this.error = error;
            this.contacts = undefined;
        }
    }
    */
}