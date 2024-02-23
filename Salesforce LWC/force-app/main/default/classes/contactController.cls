public with sharing class contactController {
    
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(String accId) {
        return [
            SELECT AccountId, Id, FirstName, LastName, Title, Phone, Email
            FROM Contact
            WHERE AccountId = :accId
            WITH SECURITY_ENFORCED
        ];
    }
    @AuraEnabled
    public static string updateContacts(Object data) {
    List<Contact> contactsForUpdate = (List<Contact>) JSON.deserialize(
         JSON.serialize(data),
         List<Contact>.class
    );
    try {
        update contactsForUpdate;
        return 'Success: contacts updated successfully';
    }
    catch (Exception e) {
        return 'The following exception has occurred: ' + e.getMessage();
    }
}


    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList() {
        try {
            List<Contact> conList = [Select Id,Name,FirstName,LastName,Title,Phone,Email,PhotoUrl from Contact Where PhotoUrl!= null WITH USER_MODE LIMIT 10];
            return conList;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        
    }
    
    @AuraEnabled(cacheable=true)
    public static List<Contact> getAllContacts() {
        return [
            SELECT Id, FirstName, LastName, Title, Phone, Email
            FROM Contact
            WITH SECURITY_ENFORCED
            limit 10
        ];
    }
    
    @AuraEnabled(Cacheable=true)
    public static List <Contact> getAllContactsSorting(String orderBy, String direction) {
        String query;
        query  = 'SELECT Id, FirstName, LastName, Phone, Email FROM Contact';
            query += ' ORDER BY '+orderBy+' '+direction;
        return Database.query(query);
    }
}