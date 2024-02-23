public with sharing class ContactManager {
    public ContactManager() {

    }
     @AuraEnabled(cacheable=true)
    public static list<Contact> fetchContactList(){
        return [SELECT Id,Name,Title,Email,Phone FROM Contact];    
    }
}
