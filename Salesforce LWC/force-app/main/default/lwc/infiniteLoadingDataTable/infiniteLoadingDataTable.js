/**
 * @description       : 
 * @author            : Samir Dhapke
 * @group             : 
 * @last modified on  : 04-08-2024
 * @last modified by  : Samir Dhapke
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   04-08-2024   Samir Dhapke   Initial Version
**/
import { LightningElement } from 'lwc';
import loadDataById from '@salesforce/apex/infiniteLoadController.loadDataById';
import loadMoreData from '@salesforce/apex/infiniteLoadController.loadMoreData';
import countOfAccount from '@salesforce/apex/infiniteLoadController.countOfAccount';

const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Industry', fieldName: 'Industry' },
    { label: 'Rating', fieldName: 'Rating' }
];
export default class InfiniteLoadingDataTable extends LightningElement {
    data = [];
    columns = columns;
    totalRecords = 0;
    recordLoaded = 0;
    //to load initial data
    connectedCallback() {
        this.loadData();
    }

    async loadData() {
        try {
            this.totalRecords = await countOfAccount();
            this.data = await loadDataById();
            this.recordLoaded = this.data.length;
        } catch (error) {
            console.log('error while loading', error);
        }
    }

    async loadMoreData(event) {
        try {
            const { target } = event
            target.isLoading = true;//it will enable the spinner by default
            let currentRecords = this.data;// store the current records
            let lastRecord = currentRecords[currentRecords.length - 1];
            console.log('last Record ' + JSON.stringify(lastRecord));
            let newRecords = await loadMoreData({
                lastName: lastRecord.Name,
                lastId: lastRecord.Id
            });
            this.data = [...currentRecords, ...newRecords];
            this.recordLoaded = this.data.length;
            target.isLoading = false;// remove the spinner when data is loaded

        } catch (error) {
            console.log('error while loading', error);
        }
    }
}