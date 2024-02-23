/**
 * @description       : 
 * @author            : Samir Dhapke
 * @group             : 
 * @last modified on  : 12-16-2023
 * @last modified by  : Samir Dhapke
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   12-16-2023   Samir Dhapke   Initial Version
**/
public with sharing class AccountAccordian {
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccount(){
        return [Select Id, name,(Select Id,name,Phone,Email,Account.Name from Contacts) from Account where Id IN (Select AccountId from Contact) LIMIT 5];
    }
    
}