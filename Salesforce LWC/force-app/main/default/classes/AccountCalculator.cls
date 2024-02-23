public class AccountCalculator {
    @future
    Public static void countContacts(List<Id> accIds){
        try{
            List<Account> accList = [Select Id,Rating ,(Select Id from Contacts) from Account where Id IN : accIds];
            for(Account acc :accList){
                //acc.Number_Of_Contact__c =accList.Contacts.Size();
                acc.Rating = 'Hot';
            }
            if(!accList.isEmpty()){
                Update accList;
            } 
           
        }
        catch(System.Exception ex){
            System_Event__c sysEvent = new System_Event__c();
            sysEvent.Complete_Trace_string__c=ex.getStackTraceString();
            sysEvent.Component_Name__c='ExceptionClass';
            sysEvent.Component_Type__c='Future Method';
            sysEvent.Exception_Type__c=ex.getTypeName();
            sysEvent.Line_Number__c=Integer.valueOf(ex.getLineNumber());
            sysEvent.Message__c=ex.getMessage();
            sysEvent.User__c=UserInfo.getUserId();
            insert sysEvent;
        }
    }
}