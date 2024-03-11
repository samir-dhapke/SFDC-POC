public class OpportunityTriggerHabdker {
    
   
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