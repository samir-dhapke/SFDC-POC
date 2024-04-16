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
import ModelPopup from 'c/modelPopup';
export default class ModelApp extends LightningElement {
    result;
    async handleClick() {
        const result = await ModelPopup.open({
            size: 'Large',
            description: "This is a Model Popup"
        });

        this.result = result;
        console.log('this.result ' + this.result);
    }
}