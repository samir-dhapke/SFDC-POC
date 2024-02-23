/**
 * @description       : 
 * @author            : Samir Dhapke
 * @group             : 
 * @last modified on  : 02-01-2024
 * @last modified by  : Samir Dhapke
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   02-01-2024   Samir Dhapke   Initial Version
**/
import { LightningElement, api, track } from 'lwc';

export default class ObjectsForFlow extends LightningElement {
    @track _contacts = [];
    set contacts(contacts = []) {
        this._contacts = [...contacts];
    }

    @api get contacts() {
        return this._contacts;
    }
    get items() {
        let contactEmailArrey = this._contacts.map((currentItem) => {
            return {
                type: 'icon',
                label: currentItem.Email,
                name: currentItem.Email,
                iconName: 'standard:contact',
                alternativeText: 'Contact Email',
            }
        });
        return contactEmailArrey;
    }
    //Xml file 
    //<propertyType extends="Sobject" name="T" label="Input Type" /> 
    //use when we want to pass generic kind of object
    //<property name="contacts" type="{T[]}" label="Input Name" role="outputOnly" />
    // here T stands for Object and [] for Collection of Object .
    //This is format for sending generic data from LWC to Flow in Collection. 
}