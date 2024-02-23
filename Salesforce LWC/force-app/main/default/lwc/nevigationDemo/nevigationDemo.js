import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
export default class NevigationDemo extends NavigationMixin(LightningElement) {

    //Nevigation to the Tab
    // nevigateToPlayersTab() {
    //     this[NavigationMixin.Navigate]({
    //         type: 'standard__navItemPage',
    //         attributes: {
    //             apiName: 'Player_Management',
    //         },
    //     });
    // }

    //Nevigation to the Object Page
    // nevigateToPlayersTab() {
    //     this[NavigationMixin.Navigate]({
    //         type: 'standard__objectPage',
    //         attributes: {
    //             objectApiName: 'Account',
    //             actionName: 'home'
    //         },
    //     });
    // }

    //Nevigation to the Object Recent Filter
    // nevigateToPlayersTab() {
    //     this[NavigationMixin.Navigate]({
    //         type: 'standard__objectPage',
    //         attributes: {
    //             objectApiName: 'Account',
    //             actionName: 'home'
    //         },
    //         state: {
    //             filterName: 'recent'
    //         }
    //     });
    // }

    //Nevigation to the Object new record
    // nevigateToPlayersTab() {
    //     this[NavigationMixin.Navigate]({
    //         type: 'standard__objectPage',
    //         attributes: {
    //             objectApiName: 'Account',
    //             actionName: 'new'
    //         }
    //     });
    // }
    //Nevigation to the Object edit record
    // @api recordId = '0015i00000xWFo1AAG';
    // nevigateToPlayersTab() {
    //     this[NavigationMixin.Navigate]({
    //         type: 'standard__objectPage',
    //         attributes: {
    //             recordId: this.recordId,
    //             objectApiName: 'Account',
    //             actionName: 'edit'
    //         }
    //     });
    // }

    // Navigation to Contact related list of account

    // Navigation to web page 
    // nevigateToPlayersTab() {
    //     this[NavigationMixin.Navigate]({
    //         type: "standard__webPage",
    //         attributes: {
    //             url: "https://www.sfdcpoint.com/"
    //         }
    //     });
    // }

    //Navigate to visualforce page
    // 
    refUrl;

    connectedCallback() {
        this.caseHomePageRef = {
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Case',
                actionName: 'home'
            }
        };
        this[NavigationMixin.GenerateUrl](this.caseHomePageRef)
            .then(url => this.refUrl = url);
    }

    // handleNavigationClick(evt) {
    //     evt.preventDefault();
    //     evt.stopPropagation();
    //     this[NavigationMixin.Navigate](this.caseHomePageRef);
    // }

}