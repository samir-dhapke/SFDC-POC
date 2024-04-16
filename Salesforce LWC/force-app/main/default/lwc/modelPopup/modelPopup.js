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
import LightningModal from 'lightning/modal';
export default class ModelPopup extends LightningModal {
    handleOkey() {
        this.close('Work is COmpleted');
    }
}