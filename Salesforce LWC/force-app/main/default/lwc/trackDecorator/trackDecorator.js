import { LightningElement, track } from 'lwc';

export default class TrackDecorator extends LightningElement {



    //complex data type like object , arrey.
    @track fullName = { firstName: "", lastName: "" };
    handleChange(event) {
        const field = event.target.name;
        // window.alert('field' + field);
        if (field === 'firstName') {
            this.fullName.firstName = event.target.value;

        }
        else if (field === 'lastName') {
            this.fullName.lastName = event.target.value;
        }
    }

}