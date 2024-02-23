import { LightningElement, track } from 'lwc';

export default class EvnetBubblingGrandParent extends LightningElement {
    namereceivedbygrandparentt;

    namereceivedbygrandparent = (event) => {
        this.namereceivedbygrandparentt = event.detail;
    }
    // constructor() {
    //     super();
    //     this.template.addEventListener('mygrandcustomevent', this.handleCustomEvent.bind(this));
    //     //this.template.addEventListener('mycustoemevnt', this.handleCustomEvent.bind(this));
    // }
    // handleCustomEvent(event) {
    //     this.namereceivedbygrandparent = event.detail;

    // }

}