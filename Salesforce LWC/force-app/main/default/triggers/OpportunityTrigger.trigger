trigger OpportunityTrigger on Opportunity (before insert, before update,after insert,after Update) {
    if(Trigger.isBefore){
         if(Trigger.isInsert){
            OpportunityTriggerHabdker.updateOpportunity(Trigger.new);
        }
         if(Trigger.isUpdate){
            /*Task - if opportunity Stage is Close WOn and if user trying to update Stage to close lost then throw error*/
           // OpportunityTriggerHabdker.checkOppStage(Trigger.new,trigger.oldMap);
        }
    }
    
    if(Trigger.isAfter){
        if(Trigger.isInsert){
            
        }  
        if(Trigger.isUpdate){
            /*Task - if opportunity's probability is more than 50% then mark account as vip.
					Note:  Vip will be custom field on account*/
          //  OpportunityTriggerHabdker.updateVIPAccount(Trigger.new);
        }
    }
}