import { LightningElement } from 'lwc';
import newUser from './newUser.html';
import oldUser from './oldUser.html';
import defaultTemplete from './bankUserMultipleTemplete.html';

export default class BankUserMultipleTemplete extends LightningElement {

    sampletemplete;
    handleClick(event) {
        this.sampletemplete = event.target.label;

    }
    render() {
        return this.sampletemplete === 'oldUser' ? oldUser :
            this.sampletemplete === 'newUser' ? newUser :
                defaultTemplete
    }

}