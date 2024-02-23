public class Exception1 {
    Public static void run(){
        try{
            /*for(integer i=0; i<=151;i++){
List<Account> acc=[Select Id,Name from Account Where Name ='mmmm' LIMIT 10];
System.debug(acc);
// Account acc = new Account(Name='Tanmay');
//  insert acc;
}


*/
            List<Account> acc=[Select Id,Name from Account Where Name ='uyjthererytuihn'];
            System.debug(acc);
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
    
    //custom exceptions
   /*decimal amount=5000000;
    
    try{
        if(amount>500000){
            throw new opportunityException('The amount is more than 500000'); 
        }  
    }
    catch(opportunityException ex){
        System.debug(ex.getMessage());
    }
*/ 
}