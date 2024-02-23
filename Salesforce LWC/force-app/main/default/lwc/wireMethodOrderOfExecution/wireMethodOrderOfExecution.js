/**
 * @description       : 
 * @author            : Samir Dhapke
 * @group             : 
 * @last modified on  : 02-23-2024
 * @last modified by  : Samir Dhapke 
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   02-23-2024   Samir Dhapke   Initial Version
**/
import { LightningElement, wire } from 'lwc';
//import myMethod from '@salesforce/apex/MyClass.myMethod';

export default class WireMethodOrderOfExecution extends LightningElement {
    connectedCallback() {
        const employee = {
            name: 'Samir',
            country: null
        }
        console.log(JSON.stringify(employee));

        //need to write employee.country expression twice
        // if (!employee.country) {
        //     employee.country = 'India';
        // }
        //or
        // employee.country = employee.country || 'India';
        //or
        employee.country ??= 'India';
        console.log(JSON.stringify(employee));
    }

    // constructor() {
    //     super();
    //     console.log('Inside constructor Method');
    // }
    // connectedCallback() {
    //     console.log('Inside Connected CallBack');
    // }

    // @wire(myMethod)
    // wiredContactData({ data, error }) {
    //     console.log('Inside Wire Method');
    //     console.log('data =>> ' + JSON.stringify(data));
    //     if (data) {
    //         console.log('data fetched from Apex =>> ' + JSON.stringify(data));
    //     }
    //     else if (error) {

    //     }
    // }

    /* this will be the flow of methods
    Inside constructor Method
aura_prod.js:108 Inside Wire Method
aura_prod.js:108 data =>> undefined
aura_prod.js:108 Inside Connected CallBack
aura_prod.js:108 Inside Wire Method
aura_prod.js:108 data =>> {"Id":"0035j00001DRAQjAAP","Name":"Rose Gonzalez"}
*/
}