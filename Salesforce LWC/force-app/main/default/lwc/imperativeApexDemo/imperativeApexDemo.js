import { LightningElement, wire } from 'lwc';
import getParentAccount from '@salesforce/apex/AccountHelper.getParentAccount';
import ACCOUNT_INDUSTRY from '@salesforce/schema/Account.Industry';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';

export default class ImperativeApexDemo extends LightningElement {
    data = [];
    options = [];
    columns = [
        { label: 'Account Id', fieldName: 'Id' },
        { label: 'Industry', fieldName: 'Industry' },
        { label: 'Name', fieldName: 'Name' },
    ];
    selectedIndustry;
    industryPicklists;

    @wire(getObjectInfo, {
        objectApiName: ACCOUNT_OBJECT
    })
    accountInfo;

    @wire(getPicklistValues, {
        recordTypeId: '$accountInfo.data.defaultRecordTypeId',
        fieldApiName: ACCOUNT_INDUSTRY
    })
    industryPicklist({ data, error }) {
        if (data) {

            this.industryPicklists = data.values;
            console.log('industryPicklist data ==> ', this.industryPicklists);
        }
        else if (error) {
            console.log('industryPicklist error ==> ', error);
        }
    }
    handleChange(event) {
        this.selectedIndustry = event.target.value;
        console.log('this.selectedIndustry=> ', this.selectedIndustry);
    }
    clickHandler() {
        getParentAccount({ inputIndustry: this.selectedIndustry })
            .then(result => {
                console.log('Account Records', result);
                this.data = result;
            })
            .catch(error => {
                console.log('Account Records error', error);
            });
    }
}