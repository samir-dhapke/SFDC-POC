import { LightningElement, api } from "lwc";
import ACCOUNT_NAME from '@salesforce/schema/Account.Name';
import ACCOUNT_INDUSTRY from '@salesforce/schema/Account.Industry';
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { CloseActionScreenEvent } from "lightning/actions";

export default class ScreenQuickActions extends LightningElement {
    @api recordId;
    @api objectApiName;
    fields = {
        accountName: ACCOUNT_NAME,
        accountIndustry: ACCOUNT_INDUSTRY
    }
    closeModel() {
        this.dispatchEvent(new CloseActionScreenEvent());
    }
    handleSuccess() {
        // Close the modal window and display a success toast

        this.dispatchEvent(
            new ShowToastEvent({
                title: "Success",
                message: "Record updated!",
                variant: "success",
            }),
        );
        this.dispatchEvent(new CloseActionScreenEvent());
    }
}