/**
 * @description       : 
 * @author            : Samir Dhapke
 * @group             : 
 * @last modified on  : 04-12-2024
 * @last modified by  : Samir Dhapke
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   04-09-2024   Samir Dhapke   Initial Version
**/
import { LightningElement, api, track, wire } from 'lwc';
import QuickActionFullScreen from '@salesforce/resourceUrl/QuickActionFullScreen';
import { loadStyle } from 'lightning/platformResourceLoader';
import { NavigationMixin } from 'lightning/navigation';
import getOpportunityLineItem from '@salesforce/apex/OpportunityLineItemController.getOpportunityLineItem';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import updateOppLineItem from '@salesforce/apex/OpportunityLineItemController.updateOppLineItem';
import { deleteRecord } from 'lightning/uiRecordApi';
import getDiscountTypePicklistValues from '@salesforce/apex/OpportunityLineItemController.getDiscountTypePicklistValues';
export default class DataTableDisplayOppLineItem extends NavigationMixin(LightningElement) {

    @api recordId;
    @track records = [];
    @track options = [];
    wiredRecords;
    connectedCallback() {
        loadStyle(this, QuickActionFullScreen); // this will make compoent bigger on load .
    }
    @wire(getDiscountTypePicklistValues)
    discountTypePicklist({ data, error }) {
        if (data) {
            // console.log('discountTypePicklist Data =>', data);
            this.options = data.map(item => ({ label: item, value: item }));
        }
        else {
            console.log('Error While getting Parent record', JSON.stringify(error));
        }
    }
    // wire to get OpportunityLineItems
    @wire(getOpportunityLineItem, { recrdIds: '$recordId' })
    getOliData(result) {
        this.wiredRecords = result; // track the provisioned value
        const { data, error } = result;
        //console.log('getOpportunityLineItem Data =>', JSON.stringify(data));
        if (data) {
            this.records = data.map((obj, index) => ({
                ...obj,
                displayIndex: index + 1 // Increment index by 1 for display
            }));
            // console.log('getOpportunityLineItem Data =>', JSON.stringify(data));
        } else if (error) {
            console.log('Error While getting Parent record', JSON.stringify(error));
        }
    }

    //handle Delete Records
    async handleDeleteAction(event) {
        let deletedRow = event.target.dataset.id;
        await deleteRecord(deletedRow);
        this.showToastMessage('Success', 'Opportunity Line Item Deleted Successfully!', 'success');
        await refreshApex(this.wiredRecords);
    }
    handleComboBoxChange(event) {
        const { name, value } = event.detail;
        const recordId = event.target.dataset.id;
        //console.log('recordId recordIds ==> ' + JSON.stringify(recordIds));
        const updatedRecords = this.records.map(record => {
            if (record.Id === recordId) {
                return { ...record, Discount_Type__c: value };
            }
            return record;
        });
        this.records = [...updatedRecords];

    }
    handleDiscountChange(event) {
        const { value } = event.target;
        const recordId = event.target.dataset.id;
        const updatedRecords = this.records.map(record => {
            if (record.Id === recordId) {
                return { ...record, Dicount_Value__c: value };
            }
            return record;
        });
        this.records = [...updatedRecords];
    }
    handleQuantityChange(event) {
        const { value } = event.target;
        const recordId = event.target.dataset.id;
        const updatedRecords = this.records.map(record => {
            if (record.Id === recordId) {
                return { ...record, Quantity: value };
            }
            return record;
        });
        this.records = [...updatedRecords];
    }
    handleSaveAction() {
        updateOppLineItem({ oppLineItem: this.records })
            .then(result => {
                refreshApex(this.wiredRecords);
                this.closeAction();
                this.showToastMessage('Success', 'Opportunity Line Item Updated Successfully!', 'success');
            }).catch(error => {
                this.showToastMessage('Error', 'Opportunity Line Item Failed to Update!', 'error');
            });

    }

    closeAction() {
        //Use navigation to Close the Window
        this[NavigationMixin.Navigate]({
            type: "standard__recordPage",
            attributes: {
                recordId: this.recordId,
                objectApiName: "Opportunity",
                actionName: "view"
            }
        });
    }
    showToastMessage(title, message, variant) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: title,
                message: message,
                variant: variant
            })
        );
    }
}