import { LightningElement, api, track } from 'lwc';
import Account from '@salesforce/schema/Account';
import AccountNumber from '@salesforce/schema/Account.AccountNumber';
import BillingAddress from '@salesforce/schema/Account.BillingAddress';
import Name from '@salesforce/schema/Account.Name';
import Site from '@salesforce/schema/Account.Site';
export default class RecordFormDemo extends LightningElement {

    // Record Form - View mode
    objectApiName = Account;
    @track fieldName = [Name, AccountNumber, Site, BillingAddress];
    @api recordId;

    // Record Form - Edit mode
    // objectApiName = Account;
    // @track fieldName = [Name, AccountNumber, Site, BillingAddress];
    // @api recordId;

    //default Mode
    //objectApiName = Account;
}