import { LightningElement } from 'lwc';

export default class LwcDynamicFormValidation extends LightningElement {
    validateAction(event) {
        let fieldErrorMsg = "Please Enter the";
        this.template.querySelectorAll("lightning-input").forEach(item => {
            let fieldValue = item.value;
            let fieldLabel = item.label;
            if (!fieldValue) {
                item.setCustomValidity(fieldErrorMsg + ' ' + fieldLabel);
            }
            else {
                item.setCustomValidity("");
            }
            item.reportValidity();
        });
    }
}