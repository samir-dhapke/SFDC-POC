/**
 * @description       : 
 * @author            : Samir Dhapke
 * @group             : 
 * @last modified on  : 12-19-2023
 * @last modified by  : Samir Dhapke
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   12-19-2023   Samir Dhapke   Initial Version
**/
import { LightningElement, api, wire } from 'lwc';
import getContactListBasedOnAccount from '@salesforce/apex/ContactControllerr.getContactListBasedOnAccount';
import FIRSTNAME_FIELD from "@salesforce/schema/Contact.FirstName";
import LASTNAME_FIELD from "@salesforce/schema/Contact.LastName";
import TITLE_FIELD from "@salesforce/schema/Contact.Title";
import PHONE_FIELD from "@salesforce/schema/Contact.Phone";
import EMAIL_FIELD from "@salesforce/schema/Contact.Email";
import LEAD_SOURCE_FIELD from '@salesforce/schema/Contact.LeadSource';
import { updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';

const COLS = [
    {
        label: "First Name",
        fieldName: FIRSTNAME_FIELD.fieldApiName,
        editable: true,
    },
    {
        label: "Last Name",
        fieldName: LASTNAME_FIELD.fieldApiName,
        editable: true,
    },
    { label: "Title", fieldName: TITLE_FIELD.fieldApiName, editable: true },
    {
        label: "Phone",
        fieldName: PHONE_FIELD.fieldApiName,
        type: "phone",
        editable: true,
    },
    {
        label: "Email",
        fieldName: EMAIL_FIELD.fieldApiName,
        type: "email",
        editable: true,
    },
    { label: "LeadSource", fieldName: LEAD_SOURCE_FIELD.fieldApiName, editable: true },
];
export default class DatatableUpdateRowsAndAddPicklist extends LightningElement {
    contactData;
    contactError;
    columns = COLS;
    @api recordId;
    draftValues = [];

    @wire(getContactListBasedOnAccount, { accountId: '$recordId' })
    wiredData({ data, error }) {
        if (data) {
            this.contactData = data;
        }
        else if (error) {
            this.contactError = error;
        }
    }

    async handleSave(event) {
        // Convert datatable draft values into record objects
        const records = event.detail.draftValues.slice().map((draftValue) => {
            const fields = Object.assign({}, draftValue);
            return { fields };
        });

        // Clear all datatable draft values
        this.draftValues = [];

        try {
            // Update all records in parallel thanks to the UI API
            const recordUpdatePromises = records.map((record) => updateRecord(record));
            await Promise.all(recordUpdatePromises);

            // Report success with a toast
            this.dispatchEvent(
                new ShowToastEvent({
                    title: "Success",
                    message: "Contacts updated",
                    variant: "success",
                }),
            );

            // Display fresh data in the datatable
            await refreshApex(this.contactData);
        } catch (error) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: "Error updating or reloading contacts",
                    message: error.body.message,
                    variant: "error",
                }),
            );
        }
    }
}