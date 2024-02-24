trigger subscribePlatformEventTrigger on Order_Details__e (after insert) {
    if(Trigger.isInsert && Trigger.isAfter){
        subscribePlatformEvents.afterUnsert(trigger.new);      
    }
}