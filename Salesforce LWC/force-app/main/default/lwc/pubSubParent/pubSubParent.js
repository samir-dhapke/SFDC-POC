import { LightningElement, wire, track } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { registerListener, unregisterAllListeners } from 'c/pubsub';

export default class PubSubParent extends LightningElement {
    @track inpVal;
    @wire(CurrentPageReference) pageRef;

    connectedCallback() {
        registerListener('inputChangeEvent', this.handleEvent, this);
    }

    handleEvent(inpVal) {
        this.inpVal = inpVal;
    }

    disconnectedCallback() {
        unregisterAllListeners(this);
    }
}