/**
 * @description       : 
 * @author            : Samir Dhapke
 * @group             : 
 * @last modified on  : 12-16-2023
 * @last modified by  : Samir Dhapke
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   12-16-2023   Samir Dhapke   Initial Version
**/
import { LightningElement, wire } from 'lwc';
import getAccount from '@salesforce/apex/AccountAccordian.getAccount';

const column = [
    { label: "Contact Name", fieldName: 'Name' },
    { label: "Contact Phone", fieldName: 'Phone' },
    { label: 'Contact Email', fieldName: 'Email' }
];
export default class Accordian extends LightningElement {
    columnsList = column;
    allData;
    @wire(getAccount)
    wiredData({ error, data }) {
        if (data) {
            this.allData = data;
            console.log('Data', data);
        } else if (error) {
            console.error('Error:', error);
        }
    }
}