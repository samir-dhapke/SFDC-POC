import { LightningElement, api, wire } from 'lwc';
import getCricketList from '@salesforce/apex/CricketerController1.getCricketList';
import { publish, MessageContext } from 'lightning/messageService';
import SELECTED_PLAYER_CHANNEL from "@salesforce/messageChannel/SelectedPlayer__c";

export default class PlayerSearchResult extends LightningElement {

    cricketersNationality = '';
    cricketersData;
    selectedPlayerId;

    @wire(getCricketList, { nationality: '$cricketersNationality' })
    wiredCricketers({ data, error }) {
        if (error) {
            console.log('error' + JSON.stringify(error));
        }
        else if (data) {
            this.cricketersData = data;
            //  console.log('cricketersData ====> ' + JSON.stringify(this.cricketersData));
        }
    }
    //playerSearchResult (publisher) --> LMS (RecordId) --> playerDetailCard (Subscriber)
    @wire(MessageContext)
    messageContext;

    handleClickPlayerCard(event) {
        // select the currently selected PlayerId Id
        this.selectedPlayerId = event.currentTarget.dataset.id;
        //console.log('this.selectedPlayerId ====> ' + JSON.stringify(this.selectedPlayerId));

        // publish to LMS this.selectedPlayerId
        publish(this.messageContext, SELECTED_PLAYER_CHANNEL, { cricketerId: this.selectedPlayerId });

        // remove blue border from image when select another Image
        let boxClass = this.template.querySelectorAll('.selected');
        //console.log('boxClass ====> ' + JSON.stringify(boxClass));
        if (boxClass.length > 0) {
            this.removeClass();
        }

        //currently selected player card details with bule border
        let playerBox = this.template.querySelector(`[data-id="${this.selectedPlayerId}"]`);
        if (playerBox) {
            playerBox.className = 'title_wrapper selected'
        }
        //custom event firing to parent
        this.dispatchEvent(new CustomEvent('select', {
            detail: {
                playerId: this.selectedPlayerId
            }
        }))
    }
    removeClass() {
        this.template.querySelectorAll('.selected')[0].classList.remove('selected');
    }
    //Search Players based on the Nationality and pass it to the wire method
    @api searchCricketers(nationalityOfCricketers) {
        //  console.log('nationalityOfCricketers ====> ' + JSON.stringify(nationalityOfCricketers));
        this.cricketersNationality = nationalityOfCricketers;
    }
}