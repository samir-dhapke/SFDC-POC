/**
 * @description       : 
 * @author            : Samir Dhapke
 * @group             : 
 * @last modified on  : 02-02-2024
 * @last modified by  : Samir Dhapke
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   02-02-2024   Samir Dhapke   Initial Version
**/
import { LightningElement, api } from 'lwc';

export default class EmbadeFlowInLWC extends LightningElement {
    @api recordId;
    get inputVariables() { // get method will always return array
        return [
            {
                name: 'AccountId',
                type: 'String',
                value: this.recordId
            },
            {
                name: 'OperationType',
                type: 'String',
                value: 'Create Record'
            }
        ];
    }
    handleStatusChange(event) {
        if (event.detail.status === 'FINISHED') {
            // set behavior after a finished flow interview
            let outputValues = event.detail.outputVariables;
            for (let i = 0; i < outputValues.length; i++) {
                let outputItem = outputValues[i];
                if (outputItem.name == "outputAccountId") {
                    console.log("Output Account Id", outputItem.value);
                }
                if (outputItem.name == "outputOperationType") {
                    console.log("Output Operation Type", outputItem.value);
                }
            }
        }
    }
}