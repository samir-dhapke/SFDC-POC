trigger ContactTrigger1 on Contact (before insert,before Update) {
    //switch on/off trigger based on custom setting
    Map<String,forTriggerTest__c> activeCheck =forTriggerTest__c.getAll();
    if(activeCheck.get('ActiveCheckOne').isActive__c){      
        if(trigger.isBefore){        
            if(trigger.isInsert){
                //check duplicate Email on contact and Throw error
                //ContactTriggerHandler1.checkDuplicateEmail(trigger.new);
                //If lead has duplicate Email  while Creating Contact with Email then Throw error
               // ContactTriggerHandler1.checkDuplicateEmailLead(trigger.new);
                //If Account is not selected while Creating Contact then Throw error
               // ContactTriggerHandler1.checkAccount(trigger.new);
                //If Account is selected while Creating Contact and Phone is Null on Account then Throw error on contact
              //  ContactTriggerHandler1.checkValidAccount(trigger.new);
              //  before creating the contact if accountId is null then create account and associate with it.
               // ContactTriggerHandler1.associateAccountWithContact(trigger.new);
            }
        }
     if(trigger.isBefore){        
            if(trigger.isUpdate){
                //  before creating and Updating the contact if accountId is null then create account and associate with it.
                ContactTriggerHandler1.associateAccountWithContact(trigger.new);
            }
        }

    }
     if(trigger.isAfter){        
            if(trigger.isInsert){
                //  After Contact is creating and Updating then update Account Balance Field.
                ContactTriggerHandler1.updateBalanceOnAccountContact(trigger.new);
            }
        }
}