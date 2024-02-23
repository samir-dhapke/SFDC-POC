/**
 * @description       : 
 * @author            : Samir Dhapke
 * @group             : 
 * @last modified on  : 02-13-2024
 * @last modified by  : Samir Dhapke
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   02-09-2024   Samir Dhapke   Initial Version
**/
import { LightningElement, wire } from 'lwc';
import fetchRecords from '@salesforce/apex/csvController.fetchRecords';

export default class CsvComponent extends LightningElement {

    accountData = [];
    columns = [
        { label: 'Account Name', fieldName: 'Name' },
        { label: 'Website', fieldName: 'Website', type: 'url' },
        { label: 'Phone', fieldName: 'Phone', type: 'phone' },
        { label: 'Industry', fieldName: 'Industry', type: 'text' },

    ];
    @wire(fetchRecords)
    wiredData({ data, error }) {
        if (data) {
            this.accountData = data;
        }
        else if (error) {
            console.log('error', error);
        }
    }
    get checkRecord() {
        return this.accountData.length > 0 ? false : true;
    }
    handleClick() {
        //if records are selected in datatable
        let selectedRows = [];
        let downloadRecords = [];
        selectedRows = this.template
            .querySelector('lightning-datatable')
            .getSelectedRows();
        let rows = JSON.parse(JSON.stringify(selectedRows));

        //check records are selected of not , if not then download all the records
        if (rows.length > 0) {
            downloadRecords = [...rows];
        }
        else {
            downloadRecords = [...this.accountData];
        }
        //convert array into the csv
        let csvFile = this.converArreyToCSV(JSON.parse(JSON.stringify(downloadRecords)));

        this.createLinkForDownLoad(csvFile);
    }

    converArreyToCSV(downloadRecords) {
        let csvHeader = Object.keys(downloadRecords[0]).toString();
        let csvBody = downloadRecords.map((curretItem) =>
            Object.values(curretItem).toString()
        );

        let csvFile = csvHeader + "\n" + csvBody.join("\n");
        return csvFile;
    }

    createLinkForDownLoad(csvFile) {
        // Create Blob and download CSV file

        // Creating anchor element to download
        let downloadElement = document.createElement('a');

        // This  encodeURI encodes special characters, except:, / ? : @ & = + $ # (Use encodeURIComponent() to encode these characters).
        downloadElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvFile);
        downloadElement.target = '_self';
        // CSV File Name
        downloadElement.download = 'Account.csv';
        // below statement is required if you are using firefox browser
        document.body.appendChild(downloadElement);
        // click() Javascript function to download CSV file
        downloadElement.click();
    }
}