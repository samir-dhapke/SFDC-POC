/**
 * @description       : 
 * @author            : Samir Dhapke
 * @group             : 
 * @last modified on  : 03-20-2024
 * @last modified by  : Samir Dhapke
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   03-20-2024   Samir Dhapke   Initial Version
**/
import { LightningElement, track } from 'lwc';

export default class SendParent extends LightningElement {
    firstname;
    lastname;
    fullName;
    handleOnChange(event) {
        if (event.target.name == 'fname') {
            this.firstname = event.target.value;
        }
        if (event.target.name == 'lname') {
            this.lastname = event.target.value;
        }
    }
    onButtonClick() {
        this.fullName = this.refs.childCmp.fullName(this.firstname, this.lastname);
        console.log(' this.fullName ' + this.fullName);
    }


}