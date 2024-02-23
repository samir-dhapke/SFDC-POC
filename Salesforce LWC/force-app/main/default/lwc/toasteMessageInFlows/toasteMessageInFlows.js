/**
 * @description       : 
 * @author            : Samir Dhapke
 * @group             : 
 * @last modified on  : 02-02-2024
 * @last modified by  : Samir Dhapke
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   02-02-2024   Samir Dhapke   Initial Version
**/
import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class ToasteMessageInFlows extends LightningElement {

    handleStatusChange(event) {
        if (event.detail.status === 'FINISHED') {
            // set behavior after a finished flow interview
            const event = new ShowToastEvent({
                title: 'Success!',
                message: 'Record created Successfully',
                variant: 'success'
            });
            this.dispatchEvent(event);
        }
    }
}