import { LightningElement, track, wire } from 'lwc';
import fetchContacts from '@salesforce/apex/DeleteMultipleRecordHandler1.fetchContacts';
import deleteSelectedContacts from '@salesforce/apex/DeleteMultipleRecordHandler1.deleteSelectedContacts';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
const columns = [
    {
        label: 'Name',
        fieldName: 'Name'
    }, {
        label: 'Email',
        fieldName: 'Email'
    }, {
        label: 'Phone',
        fieldName: 'Phone',
        type: 'phone'
    }
];
export default class DeleteMultipleRecordLWC extends LightningElement {
    @track data;
    @track columns = columns;
    @track buttonLabel = 'Delete Records';
    @track isTrue = false;
    @track recordsCount = 0;

    // non-reactive variables
    selectedRecords = [];
    refreshTable;
    error;

    @wire(fetchContacts)
    contacts(result) {
        this.refreshTable = result;
        if (result.data) {
            this.data = result.data;
            this.error = undefined;

        } else if (result.error) {
            this.error = result.error;
            this.data = undefined;
        }
    }

    getSelectedRecords(event) {
        const selectedRows = event.detail.selectedRows;
        this.recordsCount = event.detail.selectedRows.length;
        this.selectedRecords = new Array();
        for (let i = 0; i < selectedRows.length; i++) {
            this.selectedRecords.push(selectedRows[i]);
        }
    }

    deleteRecords() {
        if (this.selectedRecords) {
            this.buttonLabel = 'Processing....';
            this.isTrue = true;
            deleteSelectedContacts({ contactLst: this.selectedRecords }).then(result => {
                window.console.log('result ====> ' + result);
                this.buttonLabel = 'Delete Records';
                this.isTrue = false;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success!!',
                        message: this.recordsCount + ' records are deleted.',
                        variant: 'success'
                    }),
                );
                this.template.querySelector('lightning-datatable').selectedRows = [];
                this.recordsCount = 0;
                return refreshApex(this.refreshTable);
            }).catch(error => {
                this.buttonLabel = 'Delete Records';
                this.isTrue = false;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error while getting Contacts',
                        message: JSON.stringify(error),
                        variant: 'error'
                    }),
                );
            });
        }
    }
}