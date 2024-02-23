public class ExceptionClass {
    
    Public static void getException(){
        //   Account newAccount = new Account();
        //newAccount.name = '';
        
        
        
        /* try{

insert newAccount;  
String abc;
abc.Length();
}
catch(System.DmlException dmlException){
System.debug('DML Exception block is Executed');
System.debug('Line Number=>'+dmlException.getLineNumber());
System.debug('GetMessage=>'+dmlException.getMessage());
System.debug('Line Number=>'+dmlException.getStackTraceString());
System_Event__c sysEvent = new System_Event__c();
sysEvent.Complete_Trace_string__c=dmlException.getStackTraceString();
sysEvent.Component_Name__c='ExceptionClass';
sysEvent.Component_Type__c='Apex Class';
sysEvent.Exception_Type__c=dmlException.getTypeName();
sysEvent.Line_Number__c=Integer.valueOf(dmlException.getLineNumber());
sysEvent.Message__c=dmlException.getMessage();
sysEvent.User__c=UserInfo.getUserId();
insert sysEvent;
}
catch(System.MathException mathException){
System.debug('MathException block is Executed');
System.debug('Line Number=>'+mathException.getLineNumber());
System.debug('GetMessage=>'+mathException.getMessage());
System.debug('Line Number=>'+mathException.getStackTraceString());
System_Event__c sysEvent = new System_Event__c();
sysEvent.Complete_Trace_string__c=mathException.getStackTraceString();
sysEvent.Component_Name__c='ExceptionClass';
sysEvent.Component_Type__c='Apex Class';
sysEvent.Exception_Type__c=mathException.getTypeName();
sysEvent.Line_Number__c=Integer.valueOf(mathException.getLineNumber());
sysEvent.Message__c=mathException.getMessage();
sysEvent.User__c=UserInfo.getUserId();
insert sysEvent;
}
catch(System.Exception ex){
System.debug('MathException block is Executed');
System.debug('Line Number=>'+ex.getLineNumber());
System.debug('GetMessage=>'+ex.getMessage());
System.debug('Line Number=>'+ex.getStackTraceString());
System_Event__c sysEvent = new System_Event__c();
sysEvent.Complete_Trace_string__c=ex.getStackTraceString();
sysEvent.Component_Name__c='ExceptionClass';
sysEvent.Component_Type__c='Apex Class';
sysEvent.Exception_Type__c=ex.getTypeName();
sysEvent.Line_Number__c=Integer.valueOf(ex.getLineNumber());
sysEvent.Message__c=ex.getMessage();
sysEvent.User__c=UserInfo.getUserId();
insert sysEvent;
}
}
*/
        try{
            
            List<Account> recordIdss = [SELECT Id, Name FROM Account];
            List<Id> ids = new List<Id>();
            for(Account acc:recordIdss){
                ids.add(acc.Id);
            }
            
            List<UserRecordAccess> recordAccessList = [
                SELECT RecordId, HasReadAccess, HasEditAccess, HasDeleteAccess, 
                HasTransferAccess, HasAllAccess, MaxAccessLevel 
                FROM UserRecordAccess
                WHERE UserId = '0055g00000Iy0pBAAR' AND RecordId IN :ids
            ];
        }
        catch(System.Exception ex){
            System_Event__c sysEvent = new System_Event__c();
            sysEvent.Complete_Trace_string__c=ex.getStackTraceString();
            sysEvent.Component_Name__c='ExceptionClass';
            sysEvent.Component_Type__c='Apex Class';
            sysEvent.Exception_Type__c=ex.getTypeName();
            sysEvent.Line_Number__c=Integer.valueOf(ex.getLineNumber());
            sysEvent.Message__c=ex.getMessage();
            sysEvent.User__c=UserInfo.getUserId();
            insert sysEvent;
        }
        
        
    }
}