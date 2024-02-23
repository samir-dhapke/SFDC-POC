import { LightningElement, api, track } from 'lwc';
import getRelatedContact from '@salesforce/apex/ContactClass.getRelatedContact';
import updatePrimaryContact from '@salesforce/apex/ContactClass.updatePrimaryContact';
import { NavigationMixin } from 'lightning/navigation';
import { encodeDefaultFieldValues } from "lightning/pageReferenceUtils";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { notifyRecordUpdateAvailable } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';


const actions = [
    { label: 'Assign', name: 'assign' },
    { label: 'View', name: 'view' },
];
const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Phone', fieldName: 'Phone' },
    {
        type: 'action',
        typeAttributes: { rowActions: actions },
    },
];
export default class DataTableWithRowAction extends NavigationMixin(LightningElement) {
    @api recordId; // this will store current page record id
    @track contactData = [];
    columns = columns;


    connectedCallback() {
        getRelatedContact({ accId: this.recordId })
            .then(result => {
                this.contactData = result;
                //console.log('this.contactData ==>' + JSON.stringify(this.contactData));
            })
            .catch(error => {
                console.log('Apex Result error ==>' + JSON.stringify(error));
            })

    }


    handleRowAction(event) {
        const actionName = event.detail.action.name;
        // console.log('actionName ==>' + JSON.stringify(actionName));
        const rowData = event.detail.row;
        //  console.log('row ==>' + JSON.stringify(row));
        switch (actionName) {
            case 'assign':
                this.assignContact(rowData);
                break;
            case 'view':
                this.nevigateToContactRecord(rowData);
                break;
            default:
        }
    }

    handleClick() {

        const defaultValues = encodeDefaultFieldValues({
            AccountId: this.recordId,
        });

        notifyRecordUpdateAvailable([{ recordId: this.recordId }]);
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Contact',
                actionName: 'new'
            },
            state: {
                defaultFieldValues: defaultValues,
                navigationLocation: 'RELATED_LIST'
            },
        });
        // eval("$A.get('e.force:refreshView').fire();");
        refreshApex(this.contactData);

    }
    // this method will assign primary contact
    assignContact(row) {
        console.log('row for assign contact==>' + JSON.stringify(row));
        updatePrimaryContact({ accId: this.recordId, contactRowId: row.Id })
            .then(result => {
                this.dispatchEvent(new ShowToastEvent({
                    title: result,
                    message: 'Contact is Assign As A Primary Contact',
                    variant: 'success'
                })
                );
                notifyRecordUpdateAvailable([{ recordId: this.recordId }]);
                // console.log('result ==>' + JSON.stringify(result));
            })
            .catch(error => {
                console.log('Result error ==>' + JSON.stringify(error));
            })

    }
    // this method will nevigate user to selected contact Detail
    nevigateToContactRecord(row) {
        // console.log('row for nevigate contact==>' + JSON.stringify(row));
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: row.Id,
                actionName: 'view'
            },
        });
    }
}