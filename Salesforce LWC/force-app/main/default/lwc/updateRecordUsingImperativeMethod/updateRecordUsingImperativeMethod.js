import { LightningElement, api, wire } from 'lwc';
import ACCOUNT_NAME from '@salesforce/schema/Account.Name';
import ACCOUNT_TICKER from '@salesforce/schema/Account.TickerSymbol';
import { getFieldValue, getRecord } from 'lightning/uiRecordApi';
import { notifyRecordUpdateAvailable } from 'lightning/uiRecordApi';//update component
import updateTickerRecord from '@salesforce/apex/AccountHelper2.updateTickerRecord';

export default class UpdateRecordUsingImperativeMethod extends LightningElement {
    @api recordId;
    accname;
    accTicker;
    @wire(getRecord, {
        recordId: "$recordId",
        fields: [ACCOUNT_NAME, ACCOUNT_TICKER]
    }) outputFunction({ data, error }) {
        if (data) {
            console.log('Data =>', data);
            this.accname = getFieldValue(data, ACCOUNT_NAME);
            this.accTicker = getFieldValue(data, ACCOUNT_TICKER);

        }
        else if (error) {
            console.log('Data =>', error);
        }
    }

    //update the record
    changeHandler(event) {
        this.accTicker = event.target.value;
    }
    handleClick() {
        updateTickerRecord({
            recordId: this.recordId,
            newTicker: this.accTicker


        }).then(result => {
            console.log('Record Updated Successfully', result);
            notifyRecordUpdateAvailable([{ recordId: this.recordId }]);
        }).catch(error => {
            console.log('Record is Not Updated Successfully', error);
        })
    }

}