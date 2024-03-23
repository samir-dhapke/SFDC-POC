public class ContactTriggerHandler1 {
     //********************************Before*******************************
    //Insert Contact but phone is Empty then Copy Account Phone That you are selected.
    Public static void updateContactPhoneNumber(List<Contact> conList){
        Set<Id> accIds = new Set<Id>();
        for(Contact c:conList){
            if(c.AccountId!=null && c.Phone==null){
                accIds.add(c.AccountId);
            }
        }
       Map<Id,string> accMap = new  Map<Id,string>();
        for(Account cc:[ Select Id, Phone from Account where Id IN:accIds AND Phone!=null]){
            accMap.put(cc.Id,cc.Phone);
        }
        for(Contact c:conList){
            if(accMap.containskey(c.AccountId)){
                c.Phone=accMap.get(c.AccountId);
            }
        }
        
        
    }
    Public static void updateLevelIfLanguage_English(List<Contact> conList){
         for(Contact c:conList){
            if(c.Languages__c=='English' && c.Level__c==null){
                c.Level__c='Secondary';
            }
        }
    }
    Public static void associateAccountWithContact(List<Contact> conList){
        List<Account> accList = new List<Account>();
        if(conList!=null){
            for(Contact con:conList){
                if(con.AccountId==null){
                    Account ac= new Account();
                    ac.Name=con.LastName;
                    accList.add(ac);
                }
            }
            insert accList;
            map<String,Id> accMap = new  map<String,Id>();
            if(accList.size()>0){                
                for(Account acc:accList){
                    accMap.put(acc.Name,acc.Id);
                }  
            }           
            for(Contact c:conList){
                if(accMap.containskey(c.LastName)){
                    c.AccountId=accMap.get(c.LastName);
                }
            }
        }
    }
    Public static void checkValidAccount(List<Contact> conList){
        Set<Id> accIds = new Set<Id>();
        for(Contact con:conList){
            if(con.AccountId!=null){
                accIds.add(con.AccountId);
            } 
        }
        Set<Id> invalidAccounts = new Set<Id>();         
        for(Account acc:[Select Id From Account Where Id IN:accIds AND Phone=null]){
            invalidAccounts.add(acc.Id);
        }
        for(Contact c:conList){
            if(invalidAccounts.contains(c.AccountId)){
                c.addError('Invalid Account');
            }
        }
        
    }
    Public static void checkAccount(List<Contact> conList){
        for(Contact con:conList){
            if(con.AccountId==null && con.AccountId==''){
                con.addError('Contact is Not Created Without Account!!');
            } 
        }
    }
    Public static void checkDuplicateEmailLead(List<Contact> conList){
        Set<string> emailSet = new Set<string>();
        for(Contact con:conList){
            if(con.Email!=null && con.Email!=''){
                emailSet.add(con.Email);//10 rec 5 already in database
            }
        }
        
        // Check Emails On lead
        Set<string> existingEmailSet = new Set<string>();
        for(Lead ld:[Select Id, Email from Lead where Email=:emailSet]){           
            existingEmailSet.add(ld.Email);       
        } 
        for(Contact validateContacts:conList){          
            if(existingEmailSet.contains(validateContacts.Email)){
                validateContacts.addError('Duplicate Contacts !!!!');
            }
        }
    }        
    Public static void checkDuplicateEmail(List<Contact> conList){
        Set<string> emailSet = new Set<string>();
        for(Contact con:conList){
            if(con.Email!=null && con.Email!=''){
                emailSet.add(con.Email);//10 rec 5 already in database
            }
        }
        //  List<Contact> existringContact = [Select Id, Email from Contact where Email=:emailSet];//5 rec
        //using Map
      /*  Map<String,Contact> existingCont = new Map<String,Contact>();
        if(existringContact.size()>0){// meaning list has a record with same email as one of new contact
            for(Contact cont:existringContact){           
                existingCont.put(cont.Email,cont);     
            } 
        }
        
        for(Contact validateContacts:conList){          
            if(existingCont.containskey(validateContacts.Email)){
                validateContacts.addError('Duplicate Emails Exists!!!!');
            }
        }
        */
        // Using set
        Set<string> existingEmailSet = new Set<string>();
        for(Contact cont:[Select Id, Email from Contact where Email=:emailSet]){           
            existingEmailSet.add(cont.Email);       
        } 
        
        
        for(Contact validateContacts:conList){          
            if(existingEmailSet.contains(validateContacts.Email)){
                validateContacts.addError('Duplicate Contacts !!!!');
            }
        }
    }  
    
    //********************************AFTER*******************************
    Public static void updateTotalAmountOnAccount(List<Contact> conList,map<Id,Contact> oldMap){
       
    }
    Public static void updateBalanceOnAccountContact2(List<Contact> conList){
        Set<Id> accIds = new Set<Id>();
        for(Contact c:conList){
            if(c.AccountId!=null){
                accIds.add(c.AccountId);
            }
        }
        system.debug('accIds ==>>'+accIds);
        
        List<Account> accList = new List<Account>([
            Select 
            Id,(Select Id,Transection_Type__c,Amount__c from Contacts where Amount__c!=null) 
            from 
            Account 
            where 
            Id IN:accIds
        ]);
        system.debug('accList ==>>'+accList);
        
        for(Account acc:accList){
            decimal bal=0;
            for(Contact con:acc.Contacts){
                system.debug('Transection_Type__c ==>>'+con.Transection_Type__c);
                if(con.Transection_Type__c=='Deposit'){
                    bal=bal+con.Amount__c;
                }
                else if(con.Transection_Type__c=='withdraw'){
                    bal=bal-con.Amount__c;
                }
            }
            system.debug('bal ==>>'+bal);
            acc.Balance__c=bal;
        }
        system.debug('After Transection accList ==>>'+accList);
        update accList;
    }
    Public static void updateBalanceOnAccountContact1(List<Contact> conList){
        Set<Id> accIds = new Set<Id>();
        for(Contact c:conList){
            if(c.AccountId!=null){
                accIds.add(c.AccountId);
            }
        }
        
        List<Account> accList = new List<Account>([
            Select 
            Id,(Select Id,Transection_Type__c,Amount__c from Contacts where Amount__c!=null) 
            from 
            Account 
            where 
            Id IN:accIds
        ]);
        
        
        for(Account acc:accList){
            decimal bal=0;
            for(Contact con:acc.Contacts){
                if(con.Transection_Type__c=='Deposit'){
                    bal=bal+con.Amount__c;
                }
                else if(con.Transection_Type__c=='withdraw'){
                    bal=bal-con.Amount__c;
                }
            }
            acc.Balance__c=bal;
        }
        update accList;
    }
}