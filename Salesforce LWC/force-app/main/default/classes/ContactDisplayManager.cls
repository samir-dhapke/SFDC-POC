public with sharing class ContactDisplayManager {
    public ContactDisplayManager() {

    }
    @AuraEnabled(cacheable= true)
    public static list<contact> fetchAllContact(){
        return [SELECT Id,Name,Email,Phone FROM Contact];    
    }
}
