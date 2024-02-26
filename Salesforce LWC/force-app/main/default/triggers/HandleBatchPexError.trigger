trigger HandleBatchPexError on BatchApexErrorEvent (after insert) {
    if(trigger.isAfter && Trigger.isInsert){
        HandleBatchApexErrorHelper.AfterInsert(trigger.new);       
    }
}