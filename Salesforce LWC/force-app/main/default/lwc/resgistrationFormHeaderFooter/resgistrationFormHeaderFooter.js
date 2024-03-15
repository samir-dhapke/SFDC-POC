/**
 * @description       : 
 * @author            : Samir Dhapke
 * @group             : 
 * @last modified on  : 03-15-2024
 * @last modified by  : Samir Dhapke
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   02-27-2024   Samir Dhapke   Initial Version
**/
import { LightningElement } from 'lwc';
import CILOGO from '@salesforce/resourceUrl/CILOGO';
import CILOGOSYMBOL from '@salesforce/resourceUrl/CILOGOSYMBOL';

export default class ResgistrationFormHeaderFooter extends LightningElement {
    ciLogo = CILOGO;
    cilogoSymbol = CILOGOSYMBOL;

    //Registration Form

    //define the Properties
    hideRegistrationForm = true;
    getOTPForm = false;
    isOTPVerified = false;
    educationalDetailSubmitted = false;

    //Registration Form properties
    firstName;
    lastName;
    phone;
    email;
    city;
    occupation;
    //Otp Form Properties
    emailOtp;
    phoneOtp;
    //Educational Details Properties
    ugDegree;
    passoutUg;
    ifOtherUgDeg;
    pgDegree;
    passoutPg;
    ifOtherPgDeg;
    //Student Working Details Properties
    companyName;
    designation;
    yearsOfExp;
    addInfo;

    handleChange(event) {

        let name = event.target.name;
        if (name == 'fName') {
            this.firstName = event.target.value;
            //  console.log('this.firstName ==> ' + this.firstName);
        }
        if (name == 'lName') {
            this.lastName = event.target.value;
        }
        if (name == 'phoneNumber') {
            this.phone = event.target.value;
        }
        if (name == 'email') {
            this.email = event.target.value;
        }
        if (name == 'city') {
            this.city = event.target.value;
        }
        if (name == 'occupation') {
            this.occupation = event.target.value;

        }
        //otp form
        if (name == 'emailOtp') {
            this.emailOtp = event.target.value;
        }
        if (name == 'phoneOtp') {
            this.phoneOtp = event.target.value;
        }
        //Educational Details
        if (name == 'ugDegree') {
            this.ugDegree = event.target.value;
        }
        if (name == 'passoutUg') {
            this.passoutUg = event.target.value;
        }
        if (name == 'ifOtherUgDeg') {
            this.ifOtherUgDeg = event.target.value;
        }
        if (name == 'pgDegree') {
            this.pgDegree = event.target.value;
        }
        if (name == 'passoutPg') {
            this.passoutPg = event.target.value;
        }
        if (name == 'ifOtherPgDeg') {
            this.ifOtherPgDeg = event.target.value;

        }

        // Student Working Details
        if (name == 'companyName') {
            this.companyName = event.target.value;
        }
        if (name == 'designation') {
            this.designation = event.target.value;
        }
        if (name == 'yearsOfExp') {
            this.yearsOfExp = event.target.value;
        }
        if (name == 'yearsOfExp') {
            this.yearsOfExp = event.target.value;
        }

    }

    //handle the changes
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