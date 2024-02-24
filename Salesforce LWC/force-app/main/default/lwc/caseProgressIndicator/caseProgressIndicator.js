/**
 * @description       : 
 * @author            : Samir Dhapke
 * @group             : 
 * @last modified on  : 02-24-2024
 * @last modified by  : Samir Dhapke
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   02-24-2024   Samir Dhapke   Initial Version
**/
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';
import { LightningElement, api, wire } from 'lwc';
import CASE_OBJECT from '@salesforce/schema/Case';
import CASE_STATUS from '@salesforce/schema/Case.Status';
import CASE_ID from '@salesforce/schema/Case.Id';
import { getFieldValue, getRecord, updateRecord, notifyRecordUpdateAvailable } from 'lightning/uiRecordApi';
import { subscribe, unsubscribe, onError } from 'lightning/empApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CaseProgressIndicator extends LightningElement {
    statusOption;
    @api recordId;
    getCaseStatusValue;
    channelName = '/event/Case_Details__e';
    subscription = [];

    @wire(getObjectInfo, {
        objectApiName: CASE_OBJECT
    })
    objectInfo;

    @wire(getPicklistValues, {
        recordTypeId: '$objectInfo.data.defaultRecordTypeId',
        fieldApiName: CASE_STATUS
    }) picklistFunction({ data, error }) {
        if (data) {
            this.statusOption = data.values;
            console.log('fetching Piclist Field' + JSON.stringify(this.statusOption));
        } else if (error) {
            console.log('error While fetching Piclist Field' + JSON.stringify(error));
        }
    }

    // get the current value of case status
    @wire(getRecord, {
        recordId: '$recordId',
        fields: [CASE_STATUS]
    })
    getRecordOutput({ data, error }) {
        if (data) {
            this.getCaseStatusValue = getFieldValue(data, CASE_STATUS);
            console.log('fetching record data' + JSON.stringify(this.getCaseStatusValue));
        } else if (error) {
            console.log('error While fetching Piclist fetching record data' + JSON.stringify(error));
        }
    }

    // Initializes the component
    connectedCallback() {
        this.handleSubscribe();
        // Register error listener
        this.registerErrorListener();
    }

    // Handles subscribe button click
    handleSubscribe() {
        // Callback invoked whenever a new event message is received
        const messageCallback = (response) => {
            console.log('New message received: ', JSON.stringify(response));
            this.handleEventResponse(response);
        };

        // Invoke subscribe method of empApi. Pass reference to messageCallback
        subscribe(this.channelName, -1, messageCallback).then((response) => {
            // Response contains the subscription information on subscribe call
            console.log(
                'Subscription request sent to: ',
                JSON.stringify(response.channel)
            );
            this.subscription = response;

        });
    }
    async handleEventResponse(response) {
        console.log('Response From Postman' + JSON.stringify(response));
        if (response.hasOwnProperty('data')) {
            let jsonObj = response.data;
            if (jsonObj.hasOwnProperty('payload')) {
                let responseCaseId = response.data.payload.Case_Id__c;
                let responseCaseStatus = response.data.payload.Case_Status__c;
                let fields = {};
                fields[CASE_ID.fieldApiName] = responseCaseId;
                fields[CASE_STATUS.fieldApiName] = responseCaseStatus;
                let recordInput = { fields }
                await updateRecord(recordInput)
                // Notify LDS that you've changed the record outside its mechanisms
                // Await the Promise object returned by notifyRecordUpdateAvailable()
                await notifyRecordUpdateAvailable([{ recordId: this.recordId }]);
                const event = new ShowToastEvent({
                    title: 'Success',
                    message: `Case Status is Set To ${responseCaseStatus}`,
                    variant: 'success'
                });
                this.dispatchEvent(event);
            }
        }
    }
    disconnectedCallback() {
        // Invoke unsubscribe method of empApi
        unsubscribe(this.subscription, (response) => {
            console.log('unsubscribe() response: ', JSON.stringify(response));
            // Response is true for successful unsubscribe
        });
    }
    registerErrorListener() {
        // Invoke onError empApi method
        onError((error) => {
            console.log('Received error from server: ', JSON.stringify(error));
            // Error contains the server-side error
        });
    }
}