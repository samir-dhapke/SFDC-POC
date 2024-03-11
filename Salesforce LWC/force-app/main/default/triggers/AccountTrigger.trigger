/*User Can Not Change Industry of Account from 'Technology' to picklist value
if Account has more than 5 opportunity with Probability > 50%.*/

trigger AccountTrigger on Account(before update){
    
    if(trigger.isBefore && Trigger.isUpdate){
        List<Id> accIds = new List<Id>();
        for(Account acc:trigger.new){
            if(acc.Industry=='Technology' && acc.Industry!= trigger.oldMap.get(acc.Id).Industry){
                accIds.add(acc.Id);
            }
        }
        /*
        Map<Id,Integer> checkOppOnAccount = new Map<Id,Integer>();
        List<Opportunity> oppList=[Select Id,AccountId,Probability from Opportunity Where AccountId IN:accIds AND Probability>50];
        if(!oppList.isEmpty()){
            for(Opportunity op:oppList){
                checkOppOnAccount.put(op.AccountId,oppList.size());
            }
        }
        system.debug('======>'+OppList);*/
        
         Map<Id,Integer> checkOppOnAccount = new Map<Id,Integer>();
        List<Opportunity> oppList=[Select Id,AccountId,Probability from Opportunity Where AccountId IN:accIds AND Probability>50];
        if(!oppList.isEmpty()){
            for(Opportunity op:oppList){
                checkOppOnAccount.put(op.AccountId,oppList.size());
            }
        }
        system.debug('======>'+OppList);
        for(Account acc1:trigger.new){
            system.debug('=====>'+acc1);
            if(checkOppOnAccount.get(acc1.Id) > 2){
                acc1.addError('You can Not Change Account Industry for more than 5 Opportunity With Probability > 50%');
            }
        }
        
    }	
    
}