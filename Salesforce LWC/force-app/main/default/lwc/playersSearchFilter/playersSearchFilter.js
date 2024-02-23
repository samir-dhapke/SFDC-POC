import { LightningElement, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { getObjectInfo, getPicklistValues } from "lightning/uiObjectInfoApi";
import Cricketers_obj from "@salesforce/schema/Cricketers__c";
import NATIONALITY_FIELD from "@salesforce/schema/Cricketers__c.Nationality__c";

export default class PlayersSearchFilter extends NavigationMixin(LightningElement) {

    recordTypeId;
    pickListvalues;
    optionArray = [];
    selectedCricketerNationality = '';
    selectedPlayerId;
    // New Cricketrs Button using NavigationMixin
    createCricketers() {

        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Cricketers__c',
                actionName: 'new'
            },
        });

    }
    // Combobix Picklist & Fetch Nationality Value
    // get recordTypeId by using getObjectInfo method
    @wire(getObjectInfo, { objectApiName: Cricketers_obj })
    objectInfos({ data, error }) {
        if (error) {
            console.log('error' + JSON.stringify(error));
        }
        else if (data) {
            this.recordTypeId = data.defaultRecordTypeId;
            //console.log('this.recordTypeId====> ' + data.defaultRecordTypeId);
        }
    }

    // use recordTypeId and pass in getPicklistValues method to get Nationality picklist
    @wire(getPicklistValues, { recordTypeId: '$recordTypeId', fieldApiName: NATIONALITY_FIELD })
    nationalityFieldValue({ data, error }) {
        if (error) {
            console.log('error' + JSON.stringify(error));
        }
        else if (data) {
            let arr = [];
            this.pickListvalues = data.values;
            //console.log('Nationality Value====> ' + JSON.stringify(this.pickListvalues));
            this.pickListvalues.forEach(element => {
                arr.push({ label: element.value, value: element.value })
            })
            this.optionArray = arr;
        }
    }

    // select Nationality and pass it to child component
    handleOptionChange(event) {
        this.selectedCricketerNationality = event.detail.value;
        //console.log('this.selectedCricketerNationality====> ' + this.selectedCricketerNationality);
        this.template.querySelector('c-player-search-result').searchCricketers(this.selectedCricketerNationality);
    }
    handleCustomEvent(event) {
        this.selectedPlayerId = event.detail.playerId;
    }
}