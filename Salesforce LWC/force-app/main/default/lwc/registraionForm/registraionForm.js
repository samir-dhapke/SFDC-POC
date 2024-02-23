/**
 * @description       : 
 * @author            : Samir Dhapke
 * @group             : 
 * @last modified on  : 02-23-2024
 * @last modified by  : Samir Dhapke
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   02-23-2024   Samir Dhapke   Initial Version
**/
import { LightningElement } from 'lwc';

export default class RegistraionForm extends LightningElement {

    alignCenter = 'slds-align_absolute-center';
    hideRegistrationForm = true;
    getOTPForm = false;
    handleNext() {
        this.hideRegistrationForm = false;
        this.getOTPForm = true;
    }
}