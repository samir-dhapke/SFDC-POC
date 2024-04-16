/**
 * @description       : 
 * @author            : Samir Dhapke
 * @group             : 
 * @last modified on  : 04-16-2024
 * @last modified by  : Samir Dhapke
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   04-12-2024   Samir Dhapke   Initial Version
**/
import { LightningElement, track, wire } from 'lwc';
import QuickActionFullScreen from '@salesforce/resourceUrl/QuickActionFullScreen';
import { loadStyle } from 'lightning/platformResourceLoader';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';
import PRODUCT from '@salesforce/schema/Product2';
import PRINCIPAL_FIELD from '@salesforce/schema/Product2.Principal__c';
import getProducts from '@salesforce/apex/Product2Controller.getProducts';

export default class AddProductDetails extends LightningElement {
    productPrincipal;
    productName;
    @track options = [];
    @track productsData = [];
    @track allSelected = false;
    selectedRecords = [];
    // UpdatedProductsData = [];
    @track selectedProductIds = [];
    @track selectedRecordList = [];
    selectedRecordListUpdated = [];
    connectedCallback() {
        loadStyle(this, QuickActionFullScreen); // this will make compoent bigger on load .
    }

    @wire(getObjectInfo, { objectApiName: PRODUCT })
    productInfo;

    @wire(getPicklistValues, {
        recordTypeId: '$productInfo.data.defaultRecordTypeId',
        fieldApiName: PRINCIPAL_FIELD
    })
    principalPicklistValues({ data, error }) {
        if (data) {
            console.log('principalPicklistValues =>', JSON.stringify(data.values));
            this.options = data.values.map(item => ({ label: item.label, value: item.value }));
            console.log('options =>', JSON.stringify(this.options));
        }
        else {
            console.log('Error While getting Parent record', JSON.stringify(error));
        }
    }

    handlePrincipalChange(event) {
        this.productPrincipal = event.target.value;
        console.log('this.productPrincipal =>', this.productPrincipal);
    }
    handleChange(event) {
        this.productName = event.target.value;
        console.log('this.productName =>', this.productName);
    }

    handleOnClick() {
        const selectedRecordIds = new Set(this.selectedRecordList.map(record => record.Id));

        getProducts({ productName: this.productName, productPrincipal: this.productPrincipal, recordIds: selectedRecordIds })
            .then(result => {
                const selectedRecordIds = new Set(this.selectedRecordList.map(record => record.Id));
                //console.log('selectedRecordIds=>> ' + JSON.stringify(selectedRecordIds));

                if (selectedRecordIds) {
                    this.productsData = result.map(record => ({
                        ...record,
                        isChecked: false // Add isChecked property to each record
                    })).filter(record => !selectedRecordIds.has(record.Id));
                    // console.log('Result=>> ' + JSON.stringify(this.productsData));
                }
                else {
                    this.productsData = result.map(record => ({
                        ...record,
                        isChecked: false // Add isChecked property to each record
                    }));
                }
                // console.log('Result=>> ' + JSON.stringify(this.productsData));

            })
            .catch(error => {
                console.log('error=>> ' + JSON.stringify(result));
            })
    }
    handleCheckboxChange(event) {
        const selectedId = event.target.dataset.id;
        const isChecked = event.target.checked;
        if (isChecked) {
            this.selectedProductIds.push(selectedId);
            //console.log('selectedProductIds ' + this.selectedProductIds);
        }
        else {
            const index = this.selectedProductIds.indexOf(selectedId);
            console.log('index ' + index);
            if (index !== -1) {
                this.selectedProductIds.splice(index, 1);
            }

        }
        // console.log('selectedProductIds ' + JSON.stringify(this.selectedProductIds));


    }
    handleCheckAll(event) {
        const isChecked = event.target.checked;
        if (isChecked) {
            this.productsData = this.productsData.map(record => ({
                ...record, isChecked: true
            }));
            this.allSelected = isChecked;
        }
        else {
            this.productsData = this.productsData.map(record => ({
                ...record, isChecked: false
            }));
            this.allSelected = isChecked;
        }
        this.UpdatedProductsData = [...this.productsData];
        // console.log('handleCheckAll ' + JSON.stringify(this.UpdatedProductsData));

    }

    handleOnAddMoreClick() {

        this.selectedRecords = [...this.UpdatedProductsData];
        const filterRecords = this.productsData.filter(item => this.selectedProductIds.includes(item.Id));
        //  console.log('filterRecords ' + JSON.stringify(filterRecords));

        this.selectedRecordList = this.selectedRecords ?? filterRecords;
        //  console.log('selectedRecordList ' + JSON.stringify(this.selectedRecordList));
        // Filter `productsData` to remove records present in `selectedRecords`
        this.selectedRecordListUpdated = this.selectedRecordList.map((obj, index) => ({
            ...obj,
            displayIndex: index + 1 // Increment index by 1 for display
        }));
        this.productsData = this.productsData.filter(item => !this.selectedRecordList.some(record => record.Id === item.Id));
        // Store data In Table for Insert Operation

    }

}