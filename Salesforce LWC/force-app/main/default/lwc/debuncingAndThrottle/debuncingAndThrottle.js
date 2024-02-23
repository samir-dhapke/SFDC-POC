import { LightningElement } from 'lwc';

export default class DebuncingAndThrottle extends LightningElement {
    myDebounce(event) {
        let valuee = event.target.value;
        let timer;
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {

            console.log('Button Clicked!!! ' + valuee);
        }, 5000);
    }

    // above code will call function multiple time to avoid this we can use debounceing

    // counter = 0;

    // myDebounce(event) {
    //     let timer;
    //     return function () {
    //         if (timer) window.clearTimeout(timer);
    //         timer = setTimeout(() => {
    //             let valuee = event.target.value;
    //             console.log('Button Clicked!!! ' + valuee);
    //         }, 5000);
    //     }
    // }


}