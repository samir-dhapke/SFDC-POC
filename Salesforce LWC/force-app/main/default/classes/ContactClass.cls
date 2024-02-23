public class ContactClass {
    @AuraEnabled
    public static List<Contact> getRelatedContact(string accId){
        List<Contact> conList = [Select Id,name,Phone,AccountId from Contact where AccountId=:accId]; 
        system.debug(conList);
        if(!conList.isEmpty()){
            return conList;
        }
        return null;
    }
    
    @AuraEnabled
    public static Boolean updatePrimaryContact(string accId, string contactRowId){
        List<Account> accListToUpdate = new List<Account>();
        Account accObject = new Account();
        accObject.Id = accId;
        accObject.Primary_Contact__c = contactRowId;
        accListToUpdate.add(accObject);
        
        if(!accListToUpdate.isEmpty()){
            update accListToUpdate;
            return true;
        }
        return false;
    }
    
}