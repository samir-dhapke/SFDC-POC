/**
 * @description       : 
 * @author            : Samir Dhapke
 * @group             : 
 * @last modified on  : 02-01-2024
 * @last modified by  : Samir Dhapke
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   02-01-2024   Samir Dhapke   Initial Version
**/
import { LightningElement, api } from 'lwc';
import {
    FlowAttributeChangeEvent,
    FlowNavigationNextEvent,
} from 'lightning/flowSupport';
export default class InputFromFlow extends LightningElement {

    @api inputName;
    changehandler(event) {
        this.inputName = event.target.value;
        const attributeEvent = new FlowAttributeChangeEvent("inputName", this.inputName);
        this.dispatchEvent(attributeEvent);
    }
}