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
import { LightningElement, track } from 'lwc';

export default class EventBubblingChild extends LightningElement {

    name;
    nameChangeHandler(event) {

        this.name = event.target.value;
        const evt = new CustomEvent('mycustoemevnt', {
            detail: this.name,
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(evt);
    }
}