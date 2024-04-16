/**
 * @description       : 
 * @author            : Samir Dhapke
 * @group             : 
 * @last modified on  : 04-09-2024
 * @last modified by  : Samir Dhapke
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   04-09-2024   Samir Dhapke   Initial Version
**/
import { LightningElement, api, track, wire } from 'lwc';
//import modal from "@salesforce/resourceUrl/quickActionWidth";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import NAME_FIELD from '@salesforce/schema/Quote.Name';
import QUOT_NO from '@salesforce/schema/Quote.QuoteNumber';
import CON_EMAIL from '@salesforce/schema/Contact.Email';
//import { loadStyle } from "lightning/platformResourceLoader";
import sendQuotationEmail from '@salesforce/apex/mailDetails.sendQuotationEmail';
//import getAccConOpp from '@salesforce/apex/QuotationClass.getAccConOpp';
//import { CurrentPageReference } from 'lightning/navigation';
export default class SendingEmail extends LightningElement {
    @api recordId;
    @track files;
    toCcAddress = 'ashishkurzekar.ak@gmail.com';
    mailBody = 'Hello I m Ashish Kurzekar <br/> Salesforce Developer <br/> From Cloud Intellect';
    //subject = 'This is the Quotation Number for this Quotation : ';
    connectedCallback() {
        loadStyle(this, modal);
    }
    // @wire(CurrentPageReference)
    // getPageReferenceParameters(currentPageReference) {
    //     if (currentPageReference) {
    //         this.recordId = currentPageReference.attributes.recordId;
    //         getAccConOpp({ quoteId: this.recordId })
    //             .then(result => {
    //                 console.log('Result ' + JSON.stringify(result));
    //             })
    //     }
    // }
    @wire(getRecord, { recordId: '$recordId', fields: [NAME_FIELD, QUOT_NO, CON_EMAIL] })
    records

    get toAddress() {
        return this.records.data ? getFieldValue(this.records.data, CON_EMAIL) : null;
    }
    get subject() {
        return this.records.data ? this.records.data.fields.QuoteNumber.value : null;
    }


    handleSendEmail() {
        let mailDetails = {
            toAddress: this.template.querySelector('.add').value, //this.records.data.fields.Name.value, 
            CcAddress: this.template.querySelector('.CcAdd').value,
            Subject: this.template.querySelector('.subject').value,
            mailBody: this.template.querySelector('.body').value
        }

        sendQuotationEmail({ wrapper: mailDetails })
            .then(result => {
                if (result === true) {
                    this.showToast('Success', 'Mail Sent Successfully', 'success');
                } else {
                    this.showToast('Error', 'Something is Wrong', 'error');
                }
            })
            .catch(error => {
                console.log('Error  ' + JSON.stringify(error));
            })
    }
    showToast(ttl, msg, vrt) {
        const evt = new ShowToastEvent({
            title: ttl,
            message: msg,
            variant: vrt
        })
        this.dispatchEvent(evt);
    }
    /////----File Upload------////c/accountQuickFormWireget 
    acceptedFormats() {
        return ['.pdf', '.png', '.jpg', '.jpeg'];
    }
    handleUploadFinished(event) {
        const uploadedFiles = event.detail.files;
        let uploadedFileNames = '';
        for (let i = 0; i < uploadedFiles.length; i++) {
            uploadedFileNames += uploadedFiles[i].name + ', ';
        }
        this.showToast('Success', 'Files uploaded Successfully! ', 'success');
    }
}