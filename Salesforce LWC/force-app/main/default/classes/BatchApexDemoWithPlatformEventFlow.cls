global class BatchApexDemoWithPlatformEventFlow Implements Database.Batchable<sObject>,Database.RaisesPlatformEvents{
 global Database.QueryLocator start (Database.BatchableContext bc){
        return Database.getQueryLocator([Select Id,Name from Account]);
    }
    global void execute(Database.BatchableContext bc, List<Account> acc){
        try{
        List<Contact> conList=new List<Contact>();
            for(Account ac: acc){
                Contact con = new Contact();
                con.LastName = '';            
                conList.add(con);
            }
            Insert conList;
       // No need to use Try catch
        }
        catch(System.Exception ex){
            system.debug('ex.getMessage==> '+ex.getMessage());
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
    
    global void finish(Database.BatchableContext bc){
       
    }
}