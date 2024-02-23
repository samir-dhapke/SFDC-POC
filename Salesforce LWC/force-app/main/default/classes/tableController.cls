/**
 * @description       : 
 * @author            : Samir Dhapke
 * @group             : 
 * @last modified on  : 02-17-2024
 * @last modified by  : Samir Dhapke
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   02-17-2024   Samir Dhapke   Initial Version
**/
public with sharing class tableController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts() {
        return [SELECT Id, Name, AnnualRevenue, Industry, Phone from Account Where AnnualRevenue != null and Phone != null LIMIT 10];
    }
}