/**
 * @description       : 
 * @author            : Samir Dhapke
 * @group             : 
 * @last modified on  : 04-08-2024
 * @last modified by  : Samir Dhapke 
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   04-08-2024   Samir Dhapke   Initial Version
**/
public with sharing class infiniteLoadController {
    
    @AuraEnabled(cacheable=true)
    public static List<Account> loadDataById() {
        return [Select Id,Name,Industry,Rating 
                from Account order by name,Id 
                limit 50];
    }
    
    @AuraEnabled(cacheable=true)
    public static List<Account> loadMoreData(string lastName,string lastId) {
        return [Select Id,Name,Industry,Rating 
                from Account 
                where (name>:lastName) OR (name=:lastName AND Id>:lastId)
                order by name,Id 
                limit 50];
    }
     @AuraEnabled(cacheable=true)
    public static integer countOfAccount() {
        AggregateResult aggr=[Select count(Id) recordCount from Account];
        return (integer)aggr.get('recordCount');
    }
}