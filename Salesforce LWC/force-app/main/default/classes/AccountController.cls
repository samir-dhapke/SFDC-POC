/**
 * @description       : 
 * @author            : Samir Dhapke
 * @group             : 
 * @last modified on  : 12-20-2023
 * @last modified by  : Samir Dhapke
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   12-20-2023   Samir Dhapke   Initial Version
**/
public with sharing class AccountController {
    @AuraEnabled (cacheable=true)
    public static List<Account> fetchAccounts(){
        return [SELECT Id, Name, Type, Phone 
                FROM Account WHERE Type !='' AND Phone!='' LIMIT 10];       
    }
    @AuraEnabled(cacheable = true)
    public static list<Account>  searchAccounts(string searchKey){
        string key = '%'+searchKey+'%';
        return [SELECT Id,Name,Type,Rating From Account Where Name like:key];
    }
}