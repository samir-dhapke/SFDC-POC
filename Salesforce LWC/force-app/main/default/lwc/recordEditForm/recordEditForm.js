import Account from '@salesforce/schema/Account';
import AccountNumber from '@salesforce/schema/Account.AccountNumber';
import BillingAddress from '@salesforce/schema/Account.BillingAddress';
import Name from '@salesforce/schema/Account.Name';
import Site from '@salesforce/schema/Account.Site';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { LightningElement } from 'lwc';
import { CloseActionScreenEvent } from 'lightning/actions';

export default class RecordEditForm extends LightningElement {
    objectName = Account;
    fieldName = [Name, AccountNumber, Site, BillingAddress];
    successHAndler(event) {
        // to close window after record is inserted/updated automatically
        // use CloseActionScreenEvent
        console.log('=================>>>' + event.detail.id);
        this.dispatchEvent(new CloseActionScreenEvent());
        this.dispatchEvent(new ShowToastEvent({
            title: "Record Save",
            message: 'Record Save Successfully' + event.detail.id,
            variant: 'Success',
        }));
    }
    handleReset(event) {
        const inputFields = this.template.querySelectorAll(
            'lightning-input-field'
        );
        if (inputFields) {
            inputFields.forEach(field => {
                field.reset();
            });
        }
    }
}