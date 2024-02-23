import { LightningElement } from 'lwc';

export default class GetSObjectDataToParent extends LightningElement {
    handleCustomData(event) {
        const eventData = event.detail.data;
        // Do something with the data received from the child component
        console.log('Received data:', eventData);
    }
}