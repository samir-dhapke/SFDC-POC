/**
 * @description       : 
 * @author            : Samir Dhapke
 * @group             : 
 * @last modified on  : 04-07-2024
 * @last modified by  : Samir Dhapke
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   04-07-2024   Samir Dhapke   Initial Version
**/
import { LightningElement } from 'lwc';
import fetchAccounts from '@salesforce/apex/AccountLazyController.fetchAccounts';
const COLUMNS = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Industry', fieldName: 'Industry' },
    { label: 'Account Number', fieldName: 'AccountNumber' }
];
export default class DatatableLazyLoading extends LightningElement {
    accountRecords = [];
    error;
    columns = COLUMNS;
    recordSize = 0;
    isLoadingBool = true;
    infiniteLoadingBool = true;

    connectedCallback() {

        console.log('Inside connected callback');
        this.onLoadMore();

    }
    onLoadMore() {
        console.log(
            'recordSize is ',
            this.recordSize
        );

        fetchAccounts({ intOffSet: this.recordSize })
            .then(result => {

                console.log(
                    'result is ',
                    JSON.stringify(result)
                );

                if (result.length > 0) {

                    if (this.recordSize > 0) {

                        this.accountRecords = [...this.accountRecords, ...result];
                        console.log(
                            'No of Account Records is ',
                            this.accountRecords.length
                        );

                    } else {

                        this.accountRecords = result;

                    }

                    console.log(
                        'accountRecords are ',
                        JSON.stringify(this.accountRecords)
                    );

                } else {

                    this.infiniteLoadingBool = false;

                }
                this.isLoadingBool = false;

            })
            .catch(error => {

                console.log(
                    'error is ',
                    JSON.stringify(error)
                );
                this.error = JSON.stringify(error);

            });
        this.recordSize = this.recordSize + 5;

    }

}