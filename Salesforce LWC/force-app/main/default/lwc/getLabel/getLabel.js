import { LightningElement, wire } from 'lwc';
import greeting from '@salesforce/label/c.greeting';
import Id from "@salesforce/user/Id";
import USER_NAME from "@salesforce/schema/User.Name";
import { getFieldValue, getRecord } from 'lightning/uiRecordApi';
import DISPLAY_TEXT from "@salesforce/customPermission/display_text";//true or false return
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import ANIMATE from '@salesforce/resourceUrl/ThirdPartyCss';
import MOMENT from '@salesforce/resourceUrl/ThirdPartJs';

export default class GetLabel extends LightningElement {
    userId = Id;
    NameOfUser;
    isFirstLoad = true;
    displayDate;
    label = {
        greeting
    };

    // by using this module we can only get currently loggedin User Id 
    //other fileds we can get by using User Id using getRecord,Apex class 
    @wire(getRecord, {
        recordId: Id,
        fields: [USER_NAME]
    }) wired_ootput({ data, error }) {
        if (data) {
            //console.log("'User's Information", JSON.stringify(data));
            this.NameOfUser = getFieldValue(data, USER_NAME);
        }
        else if (error) {
            console.log("'User's Information error", JSON.stringify(error));
        }
    }
    // Call third party css
    renderedCallback() {
        if (this.isFirstLoad) {
            this.isFirstLoad = false;
            Promise.all([loadStyle(this, ANIMATE), loadScript(this, MOMENT)])
                .then(() => {
                    console.log('CSS File Loaded Successfully');
                    this.fetchDate();
                })
                .catch((error) => {
                    console.log('CSS File Loaded Successfully', error);
                })
        }
    }

    //check the permissions
    get checkPermission() {
        return DISPLAY_TEXT;
    }

    fetchDate() {
        this.displayDate = moment().format('LLLL');
    }
}