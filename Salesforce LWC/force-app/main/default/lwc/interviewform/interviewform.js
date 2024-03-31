import { LightningElement,wire,track} from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import InterviewCreate from '@salesforce/apex/InterviewController.InterviewCreate';
import InterviewQutionscreatedCreate from '@salesforce/apex/InterviewController.InterviewQutionscreatedCreate';
 import interviewer_FIELD from '@salesforce/schema/Interview__c.interviewer_meaning__c';
import NAMEs_FIELD from '@salesforce/schema/Interview__c.Student__c';
import LightningPrompt from 'lightning/prompt';
import getAccount1 from "@salesforce/apex/Qutionlist.listgetrecored";
import getAccount from "@salesforce/apex/Qutionlist.listgetrecored";
import { refreshApex } from '@salesforce/apex';
import { RefreshEvent } from 'lightning/refresh';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
 import Object_Interview from '@salesforce/schema/Interview__c';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import Admin_Rating_FIELD from '@salesforce/schema/Interview__c.Admin_Rating__c';
import Apex_Rating_FIELD from '@salesforce/schema/Interview__c.Apex_Rating__c';
import LWC_Rating_FIELD from '@salesforce/schema/Interview__c.Apex_Rating__c';
export default class interviewform extends LightningElement {

    
    @track showSecondInput1=false;
    addPlus1a(){
        if(this.showSecondInput1==false){
            this.showSecondInput1 = true;
        }
       else if (this.showSecondInput1==true){
            this.showSecondInput1 = false;
      }
         else{
            this.showSecondInput1==false;
        }
        
    }   
     @track showSecondInput  =  false;
    addPlus(){
        if(this.showSecondInput==false){
            this.showSecondInput = true;
        }
       else if (this.showSecondInput==true){
            this.showSecondInput = false;
      }
         else{
            this.showSecondInput==false;
        }
        
    }   
    @track showSecondInput12  =  false;
    addPlus1(){
        if(this.showSecondInput12==false){
            this.showSecondInput12 = true;
        }
       else if (this.showSecondInput12==true){
            this.showSecondInput12 = false;
      }
         else{
            this.showSecondInput12==false;
        }
        
    }   

   
    
    wiredAccountResult;
     
    @wire(InterviewCreate)
    wiredData(result) {
        this.wiredAccountResult = result;
        if (result.data) {
            
            refreshApex(this.wiredAccountResult);
        } else if (result.error) {
          
        }
    }

    @wire(getObjectInfo, { objectApiName: Object_Interview }) 
    objectInfo;
   
    
    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: interviewer_FIELD})
    interviewer_optiontion ;
    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: Admin_Rating_FIELD})
    Admin_Rating_optiontion ;
    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: Apex_Rating_FIELD})
    Apex_Rating_optiontion ;
    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: LWC_Rating_FIELD})
    LWC_Rating_optiontion ;


    @track Name = '';
    @track selectedAccountId;

    @track  Accountvalue='';
    
    @track Interviewervalue='';
    @track InterviewDatevalue ='';
    @track  AdminRatingvalue ='';
   
  @track  Admin_RemarksArea= '';
  @track AdminQuestions='';
  @track AdminAns;
  @track ApexRatingvalue = '';
 @track ApexRemarksArea ='';
 @track LWCRatingvalue='';
 @track LWCRemarksArea='';
 @track OverallFeedbackvalue='';
 @track ValueApexQ='';
 @track AdminAns1;
 @track leaddata={};
 //@track leaddata='';
 //c/ad_OppDashboard

 

    // Flexipage provides recordId and objectApiName
    
@track accountName = '';


@track accountList = [];

@track accountId;

@track messageResult = false;

@track showSerachedValues = false;



@wire(getAccount,{acList:'$AdminAns'})

retrieveAccounts({ error,data }) {

if (data) {

this.accountList = data;

this.showSerachedValues = data.length > 0;

this.messageResult = data.length === 0 && this.AdminAns!==''; 
} else if (error) {

console.error(error);

}

}

@track otherqutionsvalue;

@track showSecondInput1 = false;

@track inputValue;
handleKeyChange1(event){
   this.AdminAns1=event.target.value;
}

@track accountI1;


@track leaddata = [];
@track messageResult1 = false;

@track showSerachedValuesrt = false;


 @wire(getAccount1,{acList:'$AdminAns1'})
 
 retrieveAccountswe({error,data}) {
 if (data) {
 this.leaddata = data[0];

 console.log('succes'+this.leaddata );
 
 this.showSerachedValuesrt = data.length > 0;

this.messageResult1 = data.length === 0 && this.AdminAns1 !== '';

 } else if(error){
   
 console.log(error);
 }
 
 }
//c/ad_OppDashboard

handleParentSelectionoption(event) {

    this.accountI1 = event.target.dataset.value;
    
    this.AdminAns1 = event.target.dataset.label;
    
    const selectedEvent = new CustomEvent('selected', {detail:this.accountI1});
    
    this.dispatchEvent(selectedEvent);
    this.showSerachedValuesrt=false;
    }

//c/demoLead
 


async handleKeyChange(event) {
    this.AdminAns = event.target.value;
   
    const inputValue = event.target.value;
    
    if(inputValue.toLowerCase()==='other'&&this.showSecondInput1==false){

        const result = await LightningPrompt.open({
            theme: 'alt-inverse',
            label: 'Other Questions',
            message: "Enter your new Questions.",
        });
       
        // Modal has been closed, user clicked OK or Cancel
        if (result !== null) {
            this.otherqutionsvalue=result;
            console.log('ty'+this.otherqutionsvalue);
            InterviewQutionscreatedCreate({ otherqutionsvalue: this.otherqutionsvalue,
                Accountvalue:this.Accountvalue  })
            .then((result) => {
             console.log('Result '+result);
            })
            .catch((error) => {
                console.log('error'+error);
              
              
            });


              
            } else {
                // User entered valid email. Continue with the action
            }

    }
   else if (this.showSecondInput1==true){
        this.showSecondInput1 = false;
  }
     else{
        this.showSecondInput1==false;
    }
}

handleParentSelection(event) {

this.accountId = event.target.dataset.value;

this.AdminAns = event.target.dataset.label;

const selectedEvent = new CustomEvent('selected', {detail:this.accountId});

this.dispatchEvent(selectedEvent);
this.showSerachedValues=false;
}


    handleAccountRemarksChange(event) {
        this.Accountvalue = event.target.value;
console.log('j'+ this.Accountvalue);
    }
    handleInterviewerChange(event) {
        this.Interviewervalue = event.target.value;
    }
    handleInterviewDateChange(event) {
   this.InterviewDatevalue = event.target.value;
    }

    handleAdminRatingChange(event) {
        this.AdminRatingvalue = event.target.value;
         }
         
         handleAdminRemarksChange(event) {
            this.Admin_RemarksArea = event.target.value;
             }
             

             
             handleAdminQuestionssChange(event) {
                this.AdminQuestions = event.target.value;
                 }
                // handleAdminAnsChange(event) {
             //       this.AdminAns = event.target.value;
             //}


             handleApexnRatingChange(event) {
                this.ApexRatingvalue = event.target.value;
                 }
                 handleApexRemarksChange(event) {
                    this.ApexRemarksArea = event.target.value;
                     }
                     handleLWCRatingChange(event) {
                        this.LWCRatingvalue = event.target.value;
                         }

                         handleLWCRemarksChange(event) {
                            this.LWCRemarksArea = event.target.value;
                             }


                             handleOverallChange(event) {
                                this.OverallFeedbackvalue = event.target.value;
                                 }


    handleFirstNameChange(event) {
        this.Name = event.target.value;
    }

    handleAccountSelect(event) {
        // Assuming the custom lookup component sends the selected record's Id
        this.selectedAccountId = event.detail;
    }

  
    handleSaveClick(){

        InterviewCreate({ Accountvalue : this.Accountvalue,
            Interviewervalue:this.Interviewervalue,
            InterviewDatevalue:this.InterviewDatevalue,
            AdminRatingvalue:this.AdminRatingvalue,


    Admin_RemarksArea:this.Admin_RemarksArea,
    AdminQuestions : this.AdminQuestions,
    AdminAns : this.AdminAns,
  ApexRatingvalue : this. ApexRatingvalue,
  ApexRemarksArea :this.ApexRemarksArea,
LWCRatingvalue:this.LWCRatingvalue,
 LWCRemarksArea:this.LWCRemarksArea,
  OverallFeedbackvalue:this.OverallFeedbackvalue
                                     
         })

        .then(result => {
                console.log('Lead created successfully: ', result);
                const event = new ShowToastEvent({
                    title: 'Success',
                    message: 'interview from successfulppp',
                    variant: 'success',
                });
                this.dispatchEvent(event);
 
                this.Name = '';
              this.Accountvalue='';
    
              this.Interviewervalue='';
              this.InterviewDatevalue ='';
              this.AdminRatingvalue ='';
               
                this.Admin_RemarksArea= '';
                this.AdminQuestions='';
                this.AdminAns;
                this.ApexRatingvalue = '';
                this.ApexRemarksArea ='';
                this.LWCRatingvalue='';
                this.LWCRemarksArea='';
                this.OverallFeedbackvalue='';
            

              //  refreshApex(this.wiredAccountResult);
               // return refreshApex(this.wiredResult);
                //drefreshApex(this.createLead);
            
            })
            .catch(error => {
                console.error('Error creating lead: ', error);
                
                    const evt = new ShowToastEvent({
                        title: 'Toast Error',
                        message: 'Some unexpected error',
                        variant: 'error',
                        mode: 'dismissable'
                    });
                    this.dispatchEvent(evt);
               
                
            });
            
        }

















}