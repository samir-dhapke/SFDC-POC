/**
 * @description       : 
 * @author            : Samir Dhapke
 * @group             : 
 * @last modified on  : 04-06-2024
 * @last modified by  : Samir Dhapke
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   04-06-2024   Samir Dhapke   Initial Version
**/

import { LightningElement, api, wire } from 'lwc';
import ACCOUNT_RATING from '@salesforce/schema/Account.Rating';
import { getFieldValue, getRecord } from 'lightning/uiRecordApi';
export default class DisplayFlowConditionally extends LightningElement {

    @api recordId;
    accountrating;
    @wire(getRecord, {
        recordId: "$recordId",
        fields: [ACCOUNT_RATING]
    }) getRecordOuptuput({ data, error }) {
        if (data) {
            this.accountrating = getFieldValue(data, ACCOUNT_RATING);
        } else if (error) {
            console.log("error", error);
        }
    }
    get isAccountRatingHot() {
        return this.accountrating === "Hot" ? true : false;
    }
    get isAccountRatingWarm() {
        return this.accountrating === "Warm" ? true : false;
    }
    get isAccountRatingCold() {
        return this.accountrating === "Cold" ? true : false;
    }

    get inputVariables() {// we can also pass SObject here
        return [
            {
                name: 'inputRating',
                type: 'String',
                value: this.accountrating
            }

        ];
    }
}