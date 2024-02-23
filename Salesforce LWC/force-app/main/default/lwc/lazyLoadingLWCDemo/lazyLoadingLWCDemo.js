import { LightningElement, track, wire } from 'lwc';
import getAccounts from '@salesforce/apex/lazyLoading.getAccounts';

const columns = [
    { label: 'Id', fieldName: 'Id', type: 'text' },
    { label: 'Name', fieldName: 'Name', type: 'text' },
    { label: 'Rating', fieldName: 'Rating', type: 'text' }

];

export default class LazyLoadingLWCDemo extends LightningElement {
    accounts = [];
    error;
    columns = columns;
    rowLimit = 25;
    rowOffSet = 0;

    connectedCallback() {
        this.loadData();
    }

    loadData() {
        return getAccounts({ limitSize: this.rowLimit, offset: this.rowOffSet })
            .then(result => {
                let updatedRecords = [...this.accounts, ...result];
                this.accounts = updatedRecords;
                this.error = undefined;
            })
            .catch(error => {
                this.error = error;
                this.accounts = undefined;
            });
    }

    loadMoreData(event) {
        const currentRecord = this.accounts;
        const { target } = event;
        target.isLoading = true;

        this.rowOffSet = this.rowOffSet + this.rowLimit;
        this.loadData()
            .then(() => {
                target.isLoading = false;
            });
    }

    // We create connectedCallback function to load the initial data and then 
    // we are useing loadmoreData function to load more record from Apex base on offset. 
    // The onloadmore event handler retrieves more data when you scroll to the bottom of 
    // the table until there are no more data to load. To display a spinner while data is 
    // being loaded, set the isLoading property to true
}