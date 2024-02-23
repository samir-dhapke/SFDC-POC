import { LightningElement, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import COUNTING_UPDATED_CHANNEL from '@salesforce/messageChannel/Counting_Update__c';

export default class PubLwc extends LightningElement {

    @wire(MessageContext)
    messagecontext;

    handleIncrement() {
        const payload = {
            operator: 'Add',
            constant: 1
        };
        publish(this.messagecontext, COUNTING_UPDATED_CHANNEL, payload);
    }
    handleDecrement() {
        const payload = {
            operator: 'Substract',
            constant: 1
        };
        publish(this.messagecontext, COUNTING_UPDATED_CHANNEL, payload);
    }
    handleMultiply1() {
        const payload = {
            operator: 'Multiply',
            constant: 2
        };
        publish(this.messagecontext, COUNTING_UPDATED_CHANNEL, payload);
    }
    handleMultiply2() {
        const payload = {
            operator: 'Multiply',
            constant: 5
        };
        publish(this.messagecontext, COUNTING_UPDATED_CHANNEL, payload);
    }
    handleMultiply3() {
        const payload = {
            operator: 'Multiply',
            constant: 10
        };
        publish(this.messagecontext, COUNTING_UPDATED_CHANNEL, payload);
    }
    handleRefresh() {
        const payload = {
            operator: 'Refresh',
            constant: 0
        };
        publish(this.messagecontext, COUNTING_UPDATED_CHANNEL, payload);
    }

}