import { LightningElement, wire } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import SELECTED_PLAYER_CHANNEL from "@salesforce/messageChannel/SelectedPlayer__c";
import getSelectedPlayerDetailt from "@salesforce/apex/CricketerController1.getSelectedPlayerDetailt";
import { NavigationMixin } from 'lightning/navigation';

export default class PlayerDetailCard extends NavigationMixin(LightningElement) {

    selectedPlayerId;
    cricketerData;


    @wire(MessageContext)
    messageContext;

    connectedCallback() {

        subscribe(
            this.messageContext,
            SELECTED_PLAYER_CHANNEL,
            (message) => {
                // console.log('Message from LMS ====> ' + JSON.stringify(message));
                this.handleSelectedCricketers(message.cricketerId);
            }

        );
    }
    handleSelectedCricketers(cricketerId) {
        this.selectedPlayerId = cricketerId;

        getSelectedPlayerDetailt({ playerId: this.selectedPlayerId })
            .then(result => {
                //console.log('Selected Player Detail ====> ' + JSON.stringify(result));
                this.cricketerData = result;
            })
            .catch(error => {
                console.error(error);
            })
    }

    handleNevigateToRecord() {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.selectedPlayerId,
                objectApiName: 'Cricketers__c',
                actionName: 'view'
            },
        });
    }
}