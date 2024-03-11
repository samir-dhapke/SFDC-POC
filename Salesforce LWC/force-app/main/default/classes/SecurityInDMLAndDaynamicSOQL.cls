public class SecurityInDMLAndDaynamicSOQL {
    /* 
     * SOQL Injection is the type of attack that make it possible to execute malicious SOQL Statement.
     * Specially public facing Application like customer and partner portals.
     * For static SOQL Query they Already provide EscapeSingleQuote mechanisam
     * for Dynamic SOQL 
     		--> WE have to use EscapeSingleQuote or Database.QueryWithBinds introduce in spring 23		
	*/
    Public static Void DynamicSOQLInjection(String userParams){
        
       /* This is The Problem
        String query ='Select Id,Name,AnnualRevenue From Account';
        String whereClause=' Where Name=\''+userParams+'\'';
        query+=whereClause;
        System.debug('query : '+query);
        
        List<Account> accList = Database.query(query);
        //SecurityInDMLAndDaynamicSOQL.DynamicSOQLInjection('\' or AnnualRevenue>0 or Rating=\'');
        //this will be malecious and returns all Account
        for(Account acc:accList){
            System.debug('*******************************');
            System.debug(acc.Name);
            System.debug(acc.AnnualRevenue);
            System.debug('*******************************');
        }*/
        
         /* This is The Solution 1*/
      //  userParams=String.escapeSingleQuotes(userParams);//Senitize the Parameter
      
        /* This is The Solution 2*/
       // Database.queryWithBinds(query,Map<Name,userParams>,AccessLevel.USER_MODE);
       Map<String,Object> accountBindWithMap = new Map<String,Object>();
        accountBindWithMap.put('AccountName',userParams);
        
        String query ='Select Id,Name,AnnualRevenue From Account';
        String whereClause=' Where Name=:AccountName';
        query+=whereClause;
        System.debug('query : '+query);
        
        List<Account> accList = Database.queryWithBinds(query,accountBindWithMap,AccessLevel.USER_MODE);
        for(Account acc:accList){
            System.debug('*******************************');
            System.debug(acc.Name);
            System.debug(acc.AnnualRevenue);
            System.debug('*******************************');
        }
    }
    Public static Void run(){
         /*
			List<Account> accList = [Select Id,Name,Phone from Account Where Phone!=null];
            System.debug('Secure record access 1: '+accList);
		 */
        try{
            //Static Query
            //List<Account> accList = [Select Id,Name,Phone from Account Where Phone!=null WITH USER_MODE];
            //System.debug('Secure record access 1: '+accList);
            // Dynamic Query
            String query ='Select Id,Name,Phone from Account Where Phone!=null';
            Database.query(query,AccessLevel.USER_MODE);
        }
        catch(Exception ex){
             System.debug('Exception Thrown : '+ex.getMessage());
        }
       	    
    }
}