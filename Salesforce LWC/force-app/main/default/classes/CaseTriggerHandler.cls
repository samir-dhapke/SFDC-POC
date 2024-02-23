public class CaseTriggerHandler{
    public static void countCases(List<Case> cList){
        List<Account> accList= new List<Account>();
        Set<Id> idSet= new Set<Id>();                                 
        for(Case c:cList){
            if(c.AccountId!=null){
                idSet.add(c.AccountId);
            }
        }
        // Update Account custom fields based on the count of Partner and Customer Cases
        Map<Id, Account> accountsToUpdate1 = new Map<Id, Account>();
        Map<Id, Account> accountsToUpdate2 = new Map<Id, Account>();
        for (AggregateResult aggResult : [
            SELECT AccountId, RecordType.Name recordTypeName, COUNT(Id) countCases
            FROM Case
            WHERE AccountId IN :idSet
            GROUP BY AccountId, RecordType.Name
        ]) {
            Id accountId = (Id) aggResult.get('AccountId');
            string recordTypeName = (string) aggResult.get('recordTypeName');
            Integer countCases = (Integer) aggResult.get('countCases');
            
            Account acc = new Account(Id = accountId);
            
            if (recordTypeName == 'Customer Case') {
                acc.Customer_Case__c = countCases;  
                 accountsToUpdate1.put(accountId, acc);
            } else if (recordTypeName == 'Partner Case') {
                 acc.Partner_Case__c = countCases;
                 accountsToUpdate2.put(accountId, acc);
            }
            
           
        }
        
        // Perform the update
        update accountsToUpdate1.values();
        update accountsToUpdate2.values();
    }
}