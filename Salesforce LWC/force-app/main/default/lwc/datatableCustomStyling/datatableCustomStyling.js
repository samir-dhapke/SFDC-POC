/**
 * @description       : 
 * @author            : Samir Dhapke
 * @group             : 
 * @last modified on  : 12-17-2023
 * @last modified by  : Samir Dhapke
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   12-17-2023   Samir Dhapke   Initial Version
**/
import { LightningElement, wire } from 'lwc';
import getContactListForDataTable from '@salesforce/apex/ContactControllerr.getContactListForDataTable';


const columns = [
    //{ label: 'Contact Name', fieldName: 'Name' }, display customdatatype name
    {
        label: 'Contact Name',
        type: "customName",
        typeAttributes: {
            contactName: {
                fieldName: "Name"
            }
        }
    },
    {
        label: 'Account Name',
        fieldName: 'accountLink',
        type: 'url',
        typeAttributes: { // typeAttribute: modify the field bec it will display the Account Id
            label: {
                fieldName: "accountName"
            },
            target: "_blank"// in order to open the account in another tab
        }
    },
    {
        label: 'Title',
        fieldName: 'Title',
        cellAttributes: {
            class: {
                fieldName: "titleColor"
            }
        }
    },
    //{ label: 'Rank', fieldName: 'Rank__c', type: 'number' },
    {
        label: 'Rank',
        fieldName: 'Rank__c',// not remove bec both value want to display icon with number
        type: 'customRank',
        typeAttributes: {
            rankIcon: {
                fieldName: "rankIcon"
            }
        }
    },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
    { label: 'Email', fieldName: 'Email', type: 'email' },
    {
        label: 'Picture',
        type: 'customPicture',
        typeAttributes: {
            pictureUrl: {
                fieldName: "Picture__c"
            }
        },
        cellAttributes: {
            alignment: "center"
        }
    },

];
export default class DatatableCustomStyling extends LightningElement {
    contact;
    columns = columns;
    @wire(getContactListForDataTable) wiredData({ data, error }) {
        if (data) {
            //this.contact = data;
            this.contact = data.map(record => {
                let accountLink = '/' + record.AccountId;
                let accountName = record.Account.Name;
                let titleColor = 'slds-text-color_success';
                let rankIcon = record.Rank__c > 5 ? "action:new_event" : "action:check";
                return {
                    ...record,
                    accountLink: accountLink,
                    accountName: accountName,
                    titleColor: titleColor,
                    rankIcon: rankIcon
                }
            });
            console.log('Data', data);
        }
        else {
            console.log('error', error);
        }
    }
}