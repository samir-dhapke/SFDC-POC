/**
 * @description       : 
 * @author            : Samir Dhapke
 * @group             : 
 * @last modified on  : 02-27-2024
 * @last modified by  : Samir Dhapke
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   02-27-2024   Samir Dhapke   Initial Version
**/
public with sharing class LWC_ContactController {
    @AuraEnabled(cacheable = true)
       public static List<Contact> searchContactList(String accountName){
           if (String.isBlank(accountName)) {
                return new List<Contact>();
            }
             
            String key = '%' + accountName + '%';            
            return [SELECT Id, Name, Email FROM Contact WHERE Account.Name LIKE : key];
       }
       @AuraEnabled(cacheable = true)
       public static List<Account> searchAccountList(String accountName){
           if (String.isBlank(accountName)) {
                return new List<Account>();
            }
             
            String key = '%' + accountName + '%';            
            return [SELECT Id, Name FROM Account WHERE Name LIKE : key];
       }
}