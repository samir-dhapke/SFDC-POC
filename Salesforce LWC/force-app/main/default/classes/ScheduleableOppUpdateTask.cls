public class ScheduleableOppUpdateTask Implements Schedulable{
    
    Public void Execute(SchedulableContext sc){
        
        try{
            List<Opportunity> oppList = [Select Id,LeadSource,ownerId from Opportunity where LeadSource = null LIMIT 200];
            
            for(Opportunity opp : oppList){
                opp.LeadSource = 'Web';
            }
            if(!oppList.isEmpty()){
                Update oppList;
            }
            List<Account> accList = [Select Id from Account];
            List<Id> idsList=new List<Id>();
            for(Account a:accList){
                Id ids=a.Id;
                idsList.add(ids);
            }
           AccountCalculator.countContacts(idsList);
        }
    catch(System.Exception ex){
        System_Event__c sysEvent = new System_Event__c();
        sysEvent.Complete_Trace_string__c=ex.getStackTraceString();
        sysEvent.Component_Name__c='ExceptionClass';
        sysEvent.Component_Type__c='Schedulable Apex Class';
        sysEvent.Exception_Type__c=ex.getTypeName();
        sysEvent.Line_Number__c=Integer.valueOf(ex.getLineNumber());
        sysEvent.Message__c=ex.getMessage();
        sysEvent.User__c=UserInfo.getUserId();
        insert sysEvent;
    }
}
}