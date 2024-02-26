public class HandleBatchApexErrorHelper {
    Public static void AfterInsert(List<BatchApexErrorEvent> errorList){
         system.debug('Exception while crating task '+errorList);
        Set<Id> asyncApexJobIds = new Set<Id>();
        for(BatchApexErrorEvent batchApexError:errorList){
            asyncApexJobIds.add(batchApexError.AsyncApexJobId);
        }
        
        Map<Id,AsyncApexJob> jobs = new Map<Id,AsyncApexJob>(
            [SELECT id, ApexClass.Name FROM AsyncApexJob WHERE Id IN :asyncApexJobIds]
        );
        
        List<Task> taskList = new  List<Task>();
        for(BatchApexErrorEvent evt:errorList){
            AsyncApexJob jobDetails = jobs.get(evt.AsyncApexJobId);
            String apexClassName = jobDetails.ApexClass.Name;
            if(apexClassName=='BatchApexDemoWithPlatformEventFlow'){
                for (String item : evt.JobScope.split(',')) {
                    Task taskItem = new Task();
                    taskItem.WhatId=(Id)item;
                    taskItem.Subject=evt.ExceptionType;
                    taskItem.Description='Error Logged by BTACH APEX';
                    taskList.add(taskItem);                 
                }
            }           
        }
        try{
            insert taskList;
        }catch(Exception e){
            system.debug('Exception while crating task '+e.getMessage());
        }
    }
}