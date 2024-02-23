import { api, LightningElement } from 'lwc';
import ACCOUNT_OBJECT from '@salesforce/schema/Account'
import Name from '@salesforce/schema/Account.Name'
import Type from '@salesforce/schema/Account.Type'
import AnnualRevenue from '@salesforce/schema/Account.AnnualRevenue'


export default class RecordViewForm extends LightningElement {
    //Display the specific record of Account object.
    // objectApiName = ACCOUNT_OBJECT;
    fildsnames = [Name, Type, AnnualRevenue];
    // @api recordId = "0015i00000mrmGmAAI";

    @api recordId;
    @api objectApiName;
}