public class toDoAppController {
	@AuraEnabled(cacheable=true)
    public static List<Task_Manager__c> loadAllIncompleteRecords(){
        return [Select id,Name,Task_Date__c from Task_Manager__c where ownerId=:userInfo.getUserId() AND Is_Completed__c=false WITH USER_MODE order by Task_Date__c];        
    }
    
    @AuraEnabled(cacheable=true)
    public static List<Task_Manager__c> loadAllCompleteRecords(){
        return [Select id,Name,Task_Date__c,Completed_Date__c from Task_Manager__c where ownerId=:userInfo.getUserId() AND Is_Completed__c=true WITH USER_MODE order by Task_Date__c DESC];        
    }
}