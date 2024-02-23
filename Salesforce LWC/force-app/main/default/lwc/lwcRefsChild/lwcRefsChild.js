import { LightningElement, api } from 'lwc';
import LightningAlert from 'lightning/alert';
export default class LwcRefsChild extends LightningElement {
    @api async sayhi() {
        await LightningAlert.open({
            message: 'Welcome to the Salesforce',
            theme: 'success', // a red theme intended for error states
            label: 'Greating', // this is the header text
        });
        //Alert has been closed

    }
}