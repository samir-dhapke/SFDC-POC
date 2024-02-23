import { LightningElement } from 'lwc';

export default class ParentLWC extends LightningElement {
    countValue = 0;

    handleSubstract() {
        this.countValue--;
    }
    handleAdd() {
        this.countValue++;
    }
    handleMultiply(event) {
        const multiplyingNumber = event.detail;
        this.countValue *= multiplyingNumber;
    }
}