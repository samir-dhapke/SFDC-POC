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
import { LightningElement, api } from 'lwc';
import {
    FlowAttributeChangeEvent,
} from 'lightning/flowSupport';
export default class CalculatorForFLow extends LightningElement {

    @api inputNumber1 = "";
    @api inputNumber2 = "";
    @api outputResult = "";

    clickHandler(event) {
        let name = event.target.name;
        if (name === "add") {
            this.outputResult = Number(this.inputNumber1) + Number(this.inputNumber2)
        }
        else if (name === "sub") {
            this.outputResult = Number(this.inputNumber1) - Number(this.inputNumber2)
        }
        else if (name === "mul") {
            this.outputResult = Number(this.inputNumber1) * Number(this.inputNumber2)
        }
        else if (name === "div") {
            this.outputResult = Number(this.inputNumber1) / Number(this.inputNumber2)
        }
        const attributeEvent = new FlowAttributeChangeEvent("outputResult", this.outputResult);
        this.dispatchEvent(attributeEvent);
    }
}