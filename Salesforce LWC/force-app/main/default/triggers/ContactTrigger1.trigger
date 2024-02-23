trigger ContactTrigger1 on Contact (before insert) {
    if(trigger.isBefore){
        if(trigger.isInsert){
            ContactTriggerHandler1.checkDuplicateEmail(trigger.new);
        }
    }
}