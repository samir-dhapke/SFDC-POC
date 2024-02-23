import { LightningElement, api } from 'lwc';

export default class LwcSpreadChild extends LightningElement {
    @api name;
    @api age;
    @api email;
}