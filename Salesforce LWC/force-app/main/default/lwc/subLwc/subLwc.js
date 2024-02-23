import { LightningElement, wire } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import COUNTING_UPDATED_CHANNEL from '@salesforce/messageChannel/Counting_Update__c';

export default class SubLwc extends LightningElement {
    counter = 0;
    subscription = null;

    @wire(MessageContext)
    messagecontext;

    connectedCallback() {
        this.subscribeToMessageChannel();
    }

    subscribeToMessageChannel() {
        //console.log('hi');
        this.subscription = subscribe(
            this.messagecontext,
            COUNTING_UPDATED_CHANNEL,
            (message) => this.handleMessage(message)
        );
    }
    handleMessage(message) {
        //alert('message'+JSON.stringify(message));
        if (message.operator == 'Add') {
            this.counter += message.constant;
        }
        else if (message.operator == 'Substract') {
            this.counter -= message.constant;
        }
        else if (message.operator == 'Multiply') {
            console.log('hiiiiiiiiiiiiiii' + message.constant);
            this.counter *= message.constant;
        }
        else if (message.operator == 'Refresh') {

            this.counter *= message.constant;
        }
    }
}