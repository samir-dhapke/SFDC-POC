import { LightningElement, api, wire } from 'lwc';
import getParentAccount from '@salesforce/apex/AccountHelper.getParentAccount';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import ACCOUNT_PARENT from '@salesforce/schema/Account.ParentId';
import ACCOUNT_ID from '@salesforce/schema/Account.Id';
import ACCOUNT_NAME from '@salesforce/schema/Account.Name';
import ACCOUNT_SLAEXPRIY from '@salesforce/schema/Account.SLAExpirationDate__c';
import ACCOUNT_SLA_Type from '@salesforce/schema/Account.SLA__c';
import ACCOUNT_NUM_LOCATIONS from '@salesforce/schema/Account.NumberofLocations__c';
import ACCOUNT_DESCRIPTION from '@salesforce/schema/Account.Description';
import { createRecord, deleteRecord, getFieldValue, getRecord, updateRecord } from 'lightning/uiRecordApi';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const fieldsToLoad = [ACCOUNT_NAME, ACCOUNT_PARENT, ACCOUNT_SLAEXPRIY, ACCOUNT_SLA_Type, ACCOUNT_NUM_LOCATIONS, ACCOUNT_DESCRIPTION];
export default class WireAdapterCreateRecord extends NavigationMixin(LightningElement) {

    parentOptions = [];
    selectedAccount = '';
    selectedNoOfLocation = "1";
    selctedAccountName = "";
    selectedExpiryDate = null;
    selectedSLAType = "";
    selectedDescription = "";
    @api recordId;

    // perform Get Record operation

    @wire(getRecord, {
        recordId: '$recordId',
        fields: fieldsToLoad
    }) wiredGetRecord_function({ data, error }) {
        if (data) {
            console.log('getRecord => ', data);
            this.selectedAccount = getFieldValue(data, ACCOUNT_PARENT);
            this.selctedAccountName = getFieldValue(data, ACCOUNT_NAME);
            this.selectedExpiryDate = getFieldValue(data, ACCOUNT_SLAEXPRIY);
            this.selectedSLAType = getFieldValue(data, ACCOUNT_SLA_Type);
            this.selectedNoOfLocation = getFieldValue(data, ACCOUNT_NUM_LOCATIONS);
            this.selectedDescription = getFieldValue(data, ACCOUNT_DESCRIPTION);
        }
        else if (error) {
            console.log('Error While getting Parent record', error);
            this.showToast('Error Occured', JSON.stringify(error), 'error');
        }
    }
    // Get Records FOr Parent Account Combobox
    @wire(getParentAccount) wire_getParentAccount({ data, error }) {
        this.parentOptions = [];
        if (data) {
            this.parentOptions = data.map((currentItem) => ({
                label: currentItem.Name,
                value: currentItem.Id
            }));
        }
        else if (error) {
            console.log('Error While getting Parent record', error);
        }
    }
    handleChange(event) {
        let { name, value } = event.target;
        if (name === 'parentAcc') {
            this.selectedAccount = value;
        }
        if (name === 'accName') {
            this.selctedAccountName = value;
        }
        if (name === 'slaexpt') {
            this.selectedExpiryDate = value;
        }
        if (name === 'slatype') {
            this.selectedSLAType = value;
        }
        if (name === 'numberOfLocation') {
            this.selectedNoOfLocation = value;
        }
        if (name === 'description') {
            this.selectedDescription = value.replace(/(<([^>]+)>)/gi, "");;
        }
    }

    // get SLA Type Values
    @wire(getObjectInfo, {
        objectApiName: ACCOUNT_OBJECT,
    })
    accountObjectInfos;

    @wire(getPicklistValues, {
        recordTypeId: "$accountObjectInfos.data.defaultRecordTypeId",
        fieldApiName: ACCOUNT_SLA_Type
    })
    slaPickList;

    // create Record
    saveRecord() {
        console.log('ACCOUNT_OBJECT ', ACCOUNT_OBJECT);
        if (this.validateInput()) {
            let inputFields = {}
            inputFields[ACCOUNT_PARENT.fieldApiName] = this.selectedAccount;
            inputFields[ACCOUNT_NAME.fieldApiName] = this.selctedAccountName;
            inputFields[ACCOUNT_SLAEXPRIY.fieldApiName] = this.selectedExpiryDate;
            inputFields[ACCOUNT_SLA_Type.fieldApiName] = this.selectedSLAType;
            inputFields[ACCOUNT_NUM_LOCATIONS.fieldApiName] = this.selectedNoOfLocation;
            inputFields[ACCOUNT_DESCRIPTION.fieldApiName] = this.selectedDescription;

            if (this.recordId) {
                //Update the Operation
                inputFields[ACCOUNT_ID.fieldApiName] = this.recordId;
                let recordinput = {
                    fields: inputFields
                }

                updateRecord(recordinput)
                    .then((result) => {
                        console.log('Account is Updated SuccessFully', result);
                        this.showToast('Success', 'Account is Updated SuccessFully', 'success');
                    }).catch((error) => {
                        console.log('Error is Updation', error);
                        this.showToast('Error Occured', JSON.stringify(error), 'error');
                    })
            } else {
                let recordInput = {
                    apiName: ACCOUNT_OBJECT.objectApiName,
                    fields: inputFields
                }
                createRecord(recordInput)
                    .then((result) => {
                        console.log('Account is Created SuccessFully', result);
                        this[NavigationMixin.Navigate]({
                            type: 'standard__recordPage',
                            attributes: {
                                recordId: result.id,
                                actionName: 'view'
                            }
                        });

                    }).catch((error) => {
                        console.log('Error is Creation', error);
                    })
            }


        }
        else {
            console.log('Inputs are not Valid');
        }
    }
    // validateFirst
    validateInput() {
        let fields = Array.from(this.template.querySelectorAll(".validateMe"));
        //this.template.querySelectorAll('validateMe') this will return arrey so sometimes wehave to manually convert it into arrey form bec sometimes it will not work.
        // every() method is use with arrey ,it will check all condition is satisfied or not.
        let isValid = fields.every((currItem) => currItem.checkValidity());
        console.log('isValid=>', isValid);
        // checkValidity() this method will check each condition is valid or not then return boolean value
        return isValid;
    }

    get formTitle() {
        if (this.recordId) {
            return 'Edit Record';
        } else {
            return 'Create Record';
        }
    }

    get isDeleteAvailabe() {
        if (this.recordId) {
            return true;
        } else {
            return false;
        }
    }
    // deleteHandler
    deleteHandler() {
        deleteRecord(this.recordId)
            .then(() => {
                //return type of delete method is void
                //nevigation to to list view afte deleteing the record
                this[NavigationMixin.Navigate]({
                    type: 'standard__objectPage',
                    attributes: {
                        objectApiName: ACCOUNT_OBJECT.objectApiName,
                        actionName: 'list'
                    },
                    state: {
                        filterName: 'Recent'
                    },
                });
                this.showToast('Success', 'Account is Deleted SuccessFully', 'success');
            }).catch((error) => {
                console.log('Error is While Deletion', error);
            })
    }
    showToast(Title, Message, Variant) {
        const event = new ShowToastEvent({
            title: Title,
            message: Message,
            variant: Variant,
            // mode: 'dismissable'
        });
        this.dispatchEvent(event);
    }
}