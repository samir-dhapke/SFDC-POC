/**
 * @description       : 
 * @author            : Samir Dhapke
 * @group             : 
 * @last modified on  : 03-09-2024
 * @last modified by  : Samir Dhapke
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   03-08-2024   Samir Dhapke   Initial Version
**/
import { LightningElement, api } from 'lwc';

export default class FlowComponentCIB10 extends LightningElement {

    @api accList = [];
    showError;
    @api fromFlow;
    connectedCallback() {
        console.log('accList ==> ' + JSON.stringify(this.accList));
    }

    @api inputValue;
    handleChange(event) {
        this.inputValue = event.target.value;
    }

    connectedCallback() {
        if (this.accList.length > 0) {
            this.showError = false;
        }
        else {
            this.showError = true;

        }
    }

    renderedCallback() {
        let inputElement = this.template.querySelector('.error');
        if (this.fromFlow) {
            if (this.showError) {
                inputElement.setCustomValidity('Active Account with such text does\'t exist');
                this.showError = false;
            }
            else {
                inputElement.setCustomValidity('');
            }
        }
        else {
            inputElement.setCustomValidity('');
        }
        inputElement.reportValidity();
    }
}