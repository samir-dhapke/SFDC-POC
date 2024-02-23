/**
 * @description       : 
 * @author            : Samir Dhapke
 * @group             : 
 * @last modified on  : 12-30-2023
 * @last modified by  : Samir Dhapke 
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   12-30-2023   Samir Dhapke   Initial Version
**/
public class ComboboxDemo {
    @AuraEnabled
    public static List<Account> getAccountRecords(){
        List<Account> accList = [select Id,Name,Description from Account where name='samir Dhapke' ];
        return accList;
    }
    
    @AuraEnabled //This method will return the contact releated to the Account
    public static List<Contact> getAccountContacts(string selectedAccountId){
        List<Contact> conList = [select Id,Name,Email from Contact where AccountId =:selectedAccountId];
        return conList;
    }
}