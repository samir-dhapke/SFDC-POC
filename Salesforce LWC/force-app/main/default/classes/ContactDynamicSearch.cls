public with sharing class ContactDynamicSearch {
    public ContactDynamicSearch() {

    }
    @AuraEnabled(cacheable=true)
    public static list<Contact> searchContact(string searchName){
        
        string sName='%'+searchName+'%';
        return [SELECT Id,Name,Email,Phone From Contact Where Name like:sName];
    }
}
