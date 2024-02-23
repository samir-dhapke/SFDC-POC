import { LightningElement } from 'lwc';
import LightningAlert from 'lightning/alert';

export default class LightningAlert1 extends LightningElement {
    async handleAlertClick() {
        await LightningAlert.open({
            message: 'this is the alert message',
            theme: 'offline', // a red theme intended for error states
            label: 'offline!', // this is the header text
        });
        //Alert has been closed
    }
}