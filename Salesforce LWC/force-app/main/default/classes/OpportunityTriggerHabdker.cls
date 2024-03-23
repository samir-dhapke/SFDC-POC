public class OpportunityTriggerHabdker {
    /*	If Probability of Opportunity is grater that 80 percent then and provide edit access to the 
        opportunity owner for all the contacts belongs to Account.*/
    Public Static void shareContacts(List<Opportunity> newList){
       Map<Id,Id> mapWithOwnerId= new  Map<Id,Id>();
        for(Opportunity opp:newList){				
            if(opp.Probability>80 && opp.AccountId!=null){               
                mapWithOwnerId.put(opp.AccountId,opp.ownerId);
            }            
        } 
        	
        List<Contact> conList= [Select Id,AccountId from Contact Where AccountId IN:mapWithOwnerId.keySet()];
        List<ContactShare> shareContactRecords = new List<ContactShare>();
            
        for(Contact con:conList){
            ContactShare conShare= new ContactShare();
            conShare.ContactId=con.Id;
            conShare.UserOrGroupId = mapWithOwnerId.get(con.AccountId);
            conShare.RowCause = 'Manual';
            conShare.ContactAccessLevel='Edit';
            shareContactRecords.add(conShare);     		                 		
        }
        system.debug('shareContactRecords '+shareContactRecords);
        
            Insert shareContactRecords;
       
    }
   
    // when Probability of Opportunity is Greater than 50% and Account Industry is 'Technology'
    // then update stage of Opportunity is 'Need Analysis'
    Public Static void updateOpportunity(List<Opportunity> newList){
        Set<Id> ids = new Set<Id>();
        for(Opportunity opp:newList){
            if(opp.Probability>50 && opp.AccountId!=null){               
                ids.add(opp.AccountId);
            }            
        }        
        Map<Id,Account> accMap = new  Map<Id,Account>([ Select Id, Industry from Account 
                                                       where Id IN:ids AND Industry!=null]);        
        for(Opportunity opp:newList){
            if(opp.Probability>50 && accMap.get(opp.AccountId).Industry=='Technology'){               
                opp.StageName='Need Analysis';
            }
        }
   /* Public static void checkOppStage(List<Opportunity> newList,map<Id,Opportunity> oldMap){
        
        for(Opportunity op:newList){           
            if(op.stageName=='Closed Lost' && oldMap.get(op.Id).stageName=='Closed Won'){
                op.addError(' stageName can be change to CLosed Lost');
            }
        } 
    }
    Public static void updateVIPAccount(List<Opportunity> oppList){
        List<Account> accList = new List<Account>();
        for(Opportunity opp:oppList){
            if(opp.Probability>70){
                Account acc= new Account();
                acc.Id=opp.AccountId;
                acc.is_VIP__c=true;
                accList.add(acc);
            }
        }
        if(accList.size()>0){
            update accList;
        }
    }*/
   }
}