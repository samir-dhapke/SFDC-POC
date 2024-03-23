trigger ContactTrigger1 on Contact (before insert,before Update) {
    //switch on/off trigger based on custom setting
    Map<String,forTriggerTest__c> activeCheck =forTriggerTest__c.getAll();
    if(activeCheck.get('ActiveCheckOne').isActive__c){      
        if(trigger.isBefore){        
            if(trigger.isInsert){
              /*  1. check duplicate Email on contact and Throw error
               ContactTriggerHandler1.checkDuplicateEmail(trigger.new);
                2. If lead has duplicate Email while Creating Contact with Email then Throw error
                 ContactTriggerHandler1.checkDuplicateEmailLead(trigger.new);
                3. If Account is not selected while Creating Contact then Throw error
                 ContactTriggerHandler1.checkAccount(trigger.new);
			    4. If Account is selected while Creating Contact and Phone is Null on Account then Throw error on contact
             	 ContactTriggerHandler1.checkValidAccount(trigger.new);
                5. before creating the contact if accountId is null then create account and associate with it.
               		ContactTriggerHandler1.associateAccountWithContact(trigger.new);
                6. Check Phone Number with Acount Phone and If yes they Matched then Update Account Email on contact
               	  ContactTriggerHandler1.checkPhoneNumberWithAccount(trigger.new);
                7. while creating Contact if Language is English then Update Level is Secondary 
                ContactTriggerHandler1.updateLevelIfLanguage_English(trigger.new);
				8. Insert Contact but phone is Empty then Copy Account Phone That you are selected */
                ContactTriggerHandler1.updateContactPhoneNumber(trigger.new);
            }
            if(trigger.isUpdate){
                //  before creating and Updating the contact if accountId is null then create account and associate with it.
               // ContactTriggerHandler1.(trigger.new);
            }
        }
        }
    if(trigger.isAfter){        
        if(trigger.isInsert){
           		 /* 
           		  * 1. After Contact is creating and Updating then update Account Balance Field.
					ContactTriggerHandler1.updateBalanceOnAccountContact1(trigger.new);
					another way
           			 ContactTriggerHandler1.updateBalanceOnAccountContact2(trigger.new);
					
				 																*/
        }
        if(trigger.isUpdate){
            
        }
    }
}