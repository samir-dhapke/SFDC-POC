public class ContactTriggerHandler {

   /* public static void handleBeforeInsert(List<Contact> conList){
        set<id> accId = new set<Id>();
        for(Contact c : conList){
            if(c.AccountId != null){
                accId.add(c.AccountId);
            }
        }
        set<Id> accIds = new set<Id>();
        list<opportunity> opp = [SELECT AccountId,StageName FROM Opportunity WHERE AccountId IN : accId AND
                                 StageName ='Closed Lost'];
        for(Opportunity op : opp){
            accIds.add(op.AccountId);
        }
        for(Contact con : conList){
            if(accIds.contains(con.AccountId)){
                con.addError('You can not insert Contact');
            }
        }
    }*/
    public static void handleAfterInsert(Map<Id, Contact> newRecordsMap){
        ContactTriggerHelper.countContact(newRecordsMap);
    }
    public static void handleAfterUndelete(Map<Id, Contact> newRecordsMap){
        ContactTriggerHelper.countContact(newRecordsMap);
    }
    public static void handleAfterDelete(Map<Id, Contact> oldRecordsMap){
        ContactTriggerHelper.countContact(oldRecordsMap);
    }
    public static void handleAfterUpdate(Map<Id, Contact> newRecordsMap, Map<Id, Contact> oldRecordsMap){
        Set<Id> accountIdsSet = new Set<Id>();
        for(Contact newRecord : newRecordsMap.values() ){
            Contact oldRecord = oldRecordsMap.get(newRecord.Id);
            if(oldRecord.AccountId <> newRecord.AccountId){
                accountIdsSet.add(oldRecord.AccountId); // ABC
                accountIdsSet.add(newRecord.AccountId); // XYZ
            }
        }
        system.debug(accountIdsSet);
        // here in aggregate query although we are updating the account id but and now older account will have 0 contact
        // but still aggregate query returns 1 row for that account
        List<AggregateResult> aggregateList = [SELECT count(Id), AccountId
                                               FROM Contact
                                               WHERE AccountId IN:accountIdsSet
                                               Group By AccountId];

        List<Account> accountListToUpdate = new List<Account>();
        for(AggregateResult ag : aggregateList){
            String accountId = (String)ag.get('AccountId'); // Object
            Integer totalContact = (Integer)ag.get('expr0'); // Object
            Account accountRecord = new Account();
            accountRecord.Id = accountId;
            accountRecord.Number_of_Contacts__c = totalContact;
            accountListToUpdate.add(accountRecord);
            system.debug(accountId);
       //remove accountId
            accountIdsSet.remove(accountId);
        }
        system.debug('accountIdsSet '+accountIdsSet);
        if(accountIdsSet.size()>0){
            for(Id accountId:accountIdsSet){
                Account accountRecord = new Account();
                accountRecord.Id = accountId;
                accountRecord.Number_of_Contacts__c = 0;
                accountListToUpdate.add(accountRecord);
            }
        }
       
        // if any account will have 0 contacts while updating in that case aggregate query 
// will not update it we have to handle it manually in code bec aggregate query return atleast one row for that
        system.debug(accountListToUpdate);
        update accountListToUpdate;
    }
}