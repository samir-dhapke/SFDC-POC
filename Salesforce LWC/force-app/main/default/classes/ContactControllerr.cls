/**
 * @description       : 
 * @author            : Samir Dhapke
 * @group             : 
 * @last modified on  : 12-19-2023
 * @last modified by  : Samir Dhapke
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   12-19-2023   Samir Dhapke   Initial Version
**/
public class ContactControllerr {
    @AuraEnabled( cacheable = true )
    public static List<Contact> fetchContacts(String recordId) {
        return [SELECT Id, AccountId, FirstName, LastName, Email FROM Contact WHERE AccountId =:recordId LIMIT 100];
    }
    @AuraEnabled( cacheable = true )
    public static List<Contact> getContactListForDataTable() {
        return [SELECT Id,Name, AccountId,Title,Phone,Account.Name, FirstName, LastName, Email, Picture__c,Rank__c 
                FROM Contact
                WHERE AccountId !=null
                LIMIT 100];
    }
    
    @AuraEnabled( cacheable = true )
    public static List<Contact> getContactListBasedOnAccount(String accountId) {
        return [
            SELECT 
            Id,
            Name, 
            AccountId,
            Title,
            Phone,
            Account.Name, 
            LeadSource,
            FirstName, 
            LastName, 
            Email, 
            Picture__c,
            Rank__c 
                FROM Contact
                WHERE AccountId =:accountId
                LIMIT 100];
    }

    @AuraEnabled
    public static string dmlOnContacts(Object data, String removeContactIds) {
        List<Contact> updateContact = (List<Contact>) JSON.deserialize(JSON.serialize(data), List<Contact>.class);
        List<Contact> deleteContact = new List<Contact>();
        
        if(String.isNotBlank(removeContactIds)){
            List<Id> contactIds = removeContactIds.split(',');
            deleteContact = [SELECT Id FROM Contact WHERE Id IN :contactIds];
        }
        
        try {
            if(updateContact != null && !updateContact.isEmpty()){
                upsert updateContact;
            }
            
            if(deleteContact != null && !deleteContact.isEmpty()){    
                delete deleteContact;
            }
            return 'Success: Contact(s) upsert/delete successfully';
        }
        catch (Exception e) {
            String errorMsg = 'The following exception has occurred: ' + e.getMessage();
            throw new AuraHandledException(ErrorMsg);
        }
        // return '';
    }
}