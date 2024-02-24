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


    hideRegistrationForm = true;
    getOTPForm = false;
    isOTPVerified = false;
    educationalDetailSubmitted = false;
    handleNext() {
        this.hideRegistrationForm = false;
        this.getOTPForm = true;
    }
    verifyOTP() {
        this.hideRegistrationForm = false;
        this.isOTPVerified = true;
        this.getOTPForm = false;
    }

    submitEducationalDetails() {
        this.isOTPVerified = false;
        this.educationalDetailSubmitted = true;
    }


}