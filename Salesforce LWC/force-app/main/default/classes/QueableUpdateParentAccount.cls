public class QueableUpdateParentAccount implements Queueable{
    
    Private List<Account> accList;
    Private Id parentAccId;
    
    Public QueableUpdateParentAccount(List<Account> accRecords, Id id){
        this.accList = accRecords;
        this.parentAccId = id;
    }
    Public void Execute(QueueableContext qc){
        try{
            for(Account acc : accList){
                acc.ParentId = parentAccId;
            }
            Update accList;
        }
        catch(System.Exception ex){
            System_Event__c sysEvent = new System_Event__c();
            sysEvent.Complete_Trace_string__c=ex.getStackTraceString();
            sysEvent.Component_Name__c='ExceptionClass';
            sysEvent.Component_Type__c='Queueable Apex Class';
            sysEvent.Exception_Type__c=ex.getTypeName();
            sysEvent.Line_Number__c=Integer.valueOf(ex.getLineNumber());
            sysEvent.Message__c=ex.getMessage();
            sysEvent.User__c=UserInfo.getUserId();
            insert sysEvent;
        }
    }
    
}