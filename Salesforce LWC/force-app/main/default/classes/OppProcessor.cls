public class OppProcessor Implements Database.Batchable<sObject>,Database.Stateful{
    public Integer recordCount = 0;
    Public Database.QueryLocator start (Database.BatchableContext bc){
        return Database.getQueryLocator([Select Id,AccountId,Name from Opportunity]);
    }
    Public void execute(Database.BatchableContext bc, List<Opportunity> opps){
        try{
            List<Id> idsList=new List<Id>();
            for(Opportunity op: opps){
                op.StageName = '';
                Id ids=op.AccountId;
                idsList.add(ids);
            }
            Update opps;
            recordCount+=opps.Size();
           // AccountCalculator.countContacts(idsList);
        }
        catch(System.Exception ex){
            System_Event__c sysEvent = new System_Event__c();
            sysEvent.Complete_Trace_string__c=ex.getStackTraceString();
            sysEvent.Component_Name__c='ExceptionClass';
            sysEvent.Component_Type__c='Batch Apex Class';
            sysEvent.Exception_Type__c=ex.getTypeName();
            sysEvent.Line_Number__c=Integer.valueOf(ex.getLineNumber());
            sysEvent.Message__c=ex.getMessage();
            sysEvent.User__c=UserInfo.getUserId();
            insert sysEvent;
        }
    }
    
    Public void finish(Database.BatchableContext bc){
        System.debug('Total record Processed' + recordCount);
    }
}