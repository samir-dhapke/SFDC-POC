import { LightningElement, wire, api } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

const FIELDS = ['Account.Rating', 'Account.Name', 'Account.Industry'];


export default class PassSObjectDataFromChild extends LightningElement {
    @api recordId;
    eventData;
    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    wiredRecord({ error, data }) {
        if (data) {
            // Process the record data
            console.log('Record data:', typeof data);
            this.eventData = data;

        } else if (error) {
            // Handle error
            console.error('Error loading record', error);
        }
    }
    handleButtonClick() {
        const customEvent = new CustomEvent('customdata', {
            detail: { data: this.eventData }
        });
        this.dispatchEvent(customEvent);
    }
}