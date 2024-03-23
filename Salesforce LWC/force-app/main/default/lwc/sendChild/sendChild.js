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
import { LightningElement, api } from 'lwc';

export default class SendChild extends LightningElement {
    @api fullName(a, b) {
        return `${a} ${b}`;
    }


}