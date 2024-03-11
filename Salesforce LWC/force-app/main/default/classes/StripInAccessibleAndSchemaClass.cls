public class StripInAccessibleAndSchemaClass {
    /*
		Security with Schema Class :
		Both WITH SECURITY_ENFORCED and USER_MODE will throw exception in Security violation.
        So we Should have proper error Handling in our code.

		Schema class below will help u to check access Level before execute.
		isAccessible()
		isCreatable()
		isUpdatable()
		isDeletable()
		
	*/
    Public static Void run1(){
       
        if(Schema.SObjectType.Account.Fields.Phone.isAccessible()){
             List<Account> accList = [Select Id,Name,Phone from Account];
            System.debug('Secure record access 1: '+accList);
        } else{
            List<Account> accLists = [Select Id,Name from Account];
            System.debug('Secure record access 2: '+accLists);
        }
        
    }
    /* 1. Enforce Security with Security.stripinaccessble method(Available in Security class).
	   2. This method is used to remove the fields and relationship fields from query and sub query
		  results that user can not access.
	   3. It can also be used to remove the inaccessble field before the DML operation.
	*/
    Public static Void run(){
       SObjectAccessDecision securityDecision = Security.stripInaccessible(AccessType.READABLE, 
                                                                           [Select Id,Name,Phone from Account]);
        List<Account> accountList=securityDecision.getRecords();//return list of record
        System.debug('Secure record access: '+accountList);
        // Print removed fields and it will return map key(object) and value will be the fields
        System.debug('Fields removed by stripInaccessible: '+securityDecision.getRemovedFields());
        //return true or false
  		System.debug('Fields removed by stripInaccessible or not: '+securityDecision.getRemovedFields().get('Account').contains('Phone'));
    }
}