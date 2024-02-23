/**
 * @description       : 
 * @author            : Samir Dhapke
 * @group             : 
 * @last modified on  : 01-07-2024
 * @last modified by  : Samir Dhapke
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   01-07-2024   Samir Dhapke   Initial Version
**/
import { LightningElement } from 'lwc';

export default class EventBubblingParent extends LightningElement {
    namereceivedbyparent;
    constructor() {
        super();
        this.template.addEventListener('mycustoemevnt', this.handleCustomEvent.bind(this));

    }
    handleCustomEvent(event) {
        this.namereceivedbyparent = event.detail;
        // const evt = new CustomEvent('mygrandcustomevent', { detail: this.namereceivedbyparent, bubbles: true });
        // this.dispatchEvent(evt);
    }



}