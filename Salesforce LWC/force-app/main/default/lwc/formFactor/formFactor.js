/**
 * @description       : 
 * @author            : Samir Dhapke
 * @group             : 
 * @last modified on  : 03-13-2024
 * @last modified by  : Samir Dhapke
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   03-13-2024   Samir Dhapke   Initial Version
**/
import { LightningElement } from 'lwc';
import FORM_FACTOR from '@salesforce/client/formFactor';
export default class FormFactor extends LightningElement {
    formFactor = FORM_FACTOR;
    devicTypeName;

    connectedCallback() {
        switch (FORM_FACTOR) {
            case "Large":
                this.devicTypeName = "Dextop/Laptop";
                break;
            case "Medium":
                this.devicTypeName = "Tablet";
                break;
            case "Small":
                this.devicTypeName = "Mobile";
                break;
            default:
                this.devicTypeName = "Unknown";
                break;
        }
    }

}