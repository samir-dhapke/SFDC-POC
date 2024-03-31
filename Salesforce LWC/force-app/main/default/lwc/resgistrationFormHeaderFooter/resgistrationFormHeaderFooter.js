/**
 * @description       : 
 * @author            : Samir Dhapke
 * @group             : 
 * @last modified on  : 03-23-2024
 * @last modified by  : Samir Dhapke
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   02-27-2024   Samir Dhapke   Initial Version
**/
import { LightningElement } from 'lwc';
import CILOGO from '@salesforce/resourceUrl/CILOGO';
import CILOGOSYMBOL from '@salesforce/resourceUrl/CILOGOSYMBOL';
import sendOTP from "@salesforce/apex/ApexIntegrationController.sendOTP";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
//import createLeadRecord from '@salesforce/apex/ApexIntegrationController.createLead';

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
    ugDegreeValue;
    passoutUg;
    pgDegreeValue;
    passoutPg;

    //Student Working Details Properties
    companyName;
    designation;
    yearsOfExp;
    addInfo;

    //Generate Otp Values Properties
    generatedPhoneOtpValue;
    generatedEmailOtpValue;

    //Define UG Degree Options
    get optionsUG() {
        return [
            { label: "--None--", value: "" },
            { label: '10th', value: '10' },
            { label: '12th', value: '12' },
            { label: 'BE IT/CS', value: 'BE IT/CS' },
            { label: 'BE EC/EE/CIVIL/MECH', value: 'BE EC/EE/CIVIL/MECH' },
            { label: 'BE Other', value: 'BE Other' },
            { label: 'BSC', value: 'BSC' },
            { label: 'BSC IT/CS', value: 'BSC IT/CS' },
            { label: 'BSC Other', value: 'BSC Other' },
            { label: 'BCCA', value: 'BCCA' },
            { label: 'BA', value: 'BA' },
            { label: 'BCom', value: 'BCom' },
            { label: 'BVoc', value: 'BVoc' },
            { label: 'BBA', value: 'BBA' },
            { label: 'Other', value: 'Other' },
        ];
    }

    //Define PG Degree Options
    get optionsPG() {
        return [
            { label: 'MTECH IT/CS', value: 'MTECH IT/CS' },
            { label: 'MTECH Other', value: 'MTECH Other' },
            { label: 'MCA', value: 'MCA' },
            { label: 'MSC IT/CS', value: 'MSC IT/CS' },
            { label: 'BE EC/EE/CIVIL/MECH', value: 'BE EC/EE/CIVIL/MECH' },
            { label: 'MSC Other', value: 'BSC Other' },
            { label: 'MCOM', value: 'MCOM' },
            { label: 'MA', value: 'MA' },
            { label: 'MBA', value: 'MBA' },
            { label: 'Other', value: 'Other' },
            { label: 'MCM', value: 'MCM' },

        ];
    }


    handleChange(event) {

        let name = event.target.name;
        //Registration Form
        if (name == 'fName') {
            this.firstName = event.target.value;
            //  console.log('this.firstName ==> ' + this.firstName);
        }
        if (name == 'lName') {
            this.lastName = event.target.value;
        }
        if (name == 'phoneNumber') {
            this.phone = event.target.value.replace(',', '');
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
        // if (name == 'ugDegree') {
        //     this.ugDegree = event.target.value;
        // }

        if (name == 'passoutUg') {
            this.passoutUg = event.target.value;

        }
        if (name == 'ifOtherUgDeg') {
            this.ugDegreeValue = event.target.value;
        }
        // if (name == 'pgDegree') {
        //     this.pgDegree = event.target.value;
        // }
        if (name == 'passoutPg') {
            this.passoutPg = event.target.value;
        }
        if (name == 'ifOtherPgDeg') {
            this.pgDegreeValue = event.target.value;

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
        if (name == 'addInfo') {
            this.addInfo = event.target.value;
        }
    }

    handleUGGraduationChange(event) {
        this.ugDegreeValue = event.detail.value;
    }
    handlePGGraduationChange(event) {
        this.pgDegreeValue = event.detail.value;
    }

    //handle the next button changes
    handleNext() {
        this.hideRegistrationForm = false;
        this.getOTPForm = true;
        //generate Otp
        this.generateOtpForPhoneAndEmail();
        // console.log('generatedPhoneOtpValue ' + this.generatedPhoneOtpValue);
        //console.log('generatedPhoneOtpValue ' + this.generatedEmailOtpValue);

        //send Otp to the user
        /*  sendOTP({
              email: this.email,
              emailOtp: this.generatedEmailOtpValue,
              phone: this.phone,
              phoneOtp: this.generatedPhoneOtpValue
          })
              .then((result) => {
                  this.showToastMessage('Success', 'OTP has been sent Successfully!', 'success');
                  //display OTP Pannel to verify OTP
                  this.hideRegistrationForm = false;
                  this.getOTPForm = true;
              })
              .catch((error) => {
                  this.showToastMessage('Error', 'OTP has not sent!', 'error');
                  this.hideRegistrationForm = true;
                  this.getOTPForm = false;
              });
  
  */
    }
    //handle the Verify OTP button changes
    verifyOTP() {
        this.hideRegistrationForm = false;
        this.isOTPVerified = true;
        this.getOTPForm = false;
        // Compare Users OTP with sent OTP
        // if (this.phoneOtp === this.generatedPhoneOtpValue && this.emailOtp === this.generatedEmailOtpValue) {
        //     this.hideRegistrationForm = false;
        //     this.isOTPVerified = true;
        //     this.getOTPForm = false;
        // }
        // else {
        //     this.hideRegistrationForm = false;
        //     this.isOTPVerified = false;
        //     this.getOTPForm = true;
        // }

    }

    submitEducationalDetails() {
        this.isOTPVerified = false;
        this.educationalDetailSubmitted = true;
    }

    // Submit the Form and Create the Lead Record
    handleSubmit() {

        let passWrapper =
        {
            FirstName: this.firstName,
            LastName: this.lastName,
            Email: this.email,
            phone: this.phone,
            City: this.city,
            Occupation: this.occupation,
            ugDegree: this.ugDegreeValue,
            ugPassoutYear: this.passoutUg,
            pgDegree: this.pgDegreeValue,
            pgPassoutYear: this.passoutPg,
            companyName: this.companyName,
            designation: this.designation,
            yearOfExp: this.yearsOfExp,
            addInfo: this.addInfo
        };
        //console.log('passWrapper =======>>> ' + JSON.stringify(passWrapper));

        createLeadRecord({ lWrapper: passWrapper })
            .then(result => {
                console.log('Data:' + JSON.stringify(result));
                this.showToastMessage('Success', 'Student has been Registered Successfully!', 'success');
            }).catch(error => {
                this.showToastMessage('Error', 'Student Registration Failed!', 'error');
            });
    }

    //Generate OTP for Phone and Mobile
    generateOtpForPhoneAndEmail() {
        let otpPhone = [];
        for (let i = 0; i < 7; i++) {
            otpPhone.push(Math.floor(Math.random() * 10));
        }
        this.generatedPhoneOtpValue = otpPhone.join('');

        let otpEmail = [];
        for (let i = 0; i < 7; i++) {
            otpEmail.push(Math.floor(Math.random() * 10));
        }
        this.generatedEmailOtpValue = otpEmail.join('');
    }

    //Handle Notification/Response
    showToastMessage(title, message, variant) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(evt);
    }
}