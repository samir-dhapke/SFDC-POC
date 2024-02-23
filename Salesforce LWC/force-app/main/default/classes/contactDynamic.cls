public with sharing class contactDynamic {
    public contactDynamic() {

    }
    @AuraEnabled(cacheable=true)
    public static list<contact> searchContact(string searchKey){
        string key = '%'+searchKey+'%';
        return [SELECT id,Name,Title,Phone,Email From Contact where name like :Key];    
    }
}
