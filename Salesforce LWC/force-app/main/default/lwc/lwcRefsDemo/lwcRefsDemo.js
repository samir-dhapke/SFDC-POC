import { LightningElement } from 'lwc';

export default class LwcRefsDemo extends LightningElement {

    handleChange() {
        let para = this.refs.mytext;
        para.className = 'red_text';
    }
    handleClick() {
        //this.template.querySelector('c-lwc-refs-child').sayhi();
        this.refs.myChildRefs.sayhi();


    }
}