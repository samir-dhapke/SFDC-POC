public class BatchApex Implements Database.Batchable<sObject>,Database.Stateful{
    Public Database.QueryLocator start (Database.BatchableContext bc){
       QueueableApex n= new QueueableApex();
        System.enqueueJob(n);
        return  Database.getQueryLocator([Select Id,Name from Account]);
    }
    Public void execute(Database.BatchableContext bc, List<sObject> scope){
       
    }
    Public void finish(Database.BatchableContext bc){
        
    }
}