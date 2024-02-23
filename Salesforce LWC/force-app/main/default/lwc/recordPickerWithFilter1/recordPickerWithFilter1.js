/**
 * @description       : 
 * @author            : Samir Dhapke
 * @group             : 
 * @last modified on  : 01-17-2024
 * @last modified by  : Samir Dhapke 
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   01-17-2024   Samir Dhapke   Initial Version
**/
import { LightningElement } from 'lwc';

export default class RecordPickerWithFilter1 extends LightningElement {
    //Example 1 - Lightning Record Picker Static Targets with Filter.
    selectedRecordId = '';

    matchingInfo = {
        primaryField: { fieldPath: "Name" },
        additionalFields: [{ fieldPath: "Title" }],
    };
    displayInfo = {
        additionalFields: ["Title"],
    };

    filter = {
        criteria: [
            {
                fieldPath: "Account.Name",
                operator: "like",
                value: "Burlington%",
            },
        ],
    };
    handleChange(event) {
        this.selectedRecordId = event.detail.recordId;
        console.log("🚀 ~ this.selectedRecordId:", this.selectedRecordId);
    }
}