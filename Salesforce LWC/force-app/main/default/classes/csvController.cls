/**
 * @description       : 
 * @author            : Samir Dhapke
 * @group             : 
 * @last modified on  : 02-09-2024
 * @last modified by  : Samir Dhapke
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   02-09-2024   Samir Dhapke   Initial Version
**/
public with sharing class csvController {
    @AuraEnabled(cacheable=true)
    public static List<Account> fetchRecords() {
        return [Select Id,Name,Industry,website,phone From Account Where Phone!=null AND Website!=null LIMIT 20];
             
    }
}