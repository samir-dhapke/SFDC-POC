trigger oppTrigger on Opportunity (before insert, before update,after insert,after Update) {
  if(Trigger.isBefore){
         if(Trigger.isInsert){
            
        }
         if(Trigger.isUpdate){
          
             
        }
    }
    if(Trigger.isAfter){
         if(Trigger.isInsert){
             OpportunityHandler.addAccountTeam(Trigger.new);
        }
         if(Trigger.isUpdate){
          
             
        }
    }
}