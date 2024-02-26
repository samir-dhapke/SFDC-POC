Public class BatchApexDemoWithPlatformEventFlow implements Database.Batchable<SObject>, 
   Database.RaisesPlatformEvents{ 
    Public Database.QueryLocator start (Database.BatchableContext bc){
        return Database.getQueryLocator([Select Id,Name from Account]);
    }
    Public void execute(Database.BatchableContext bc, List<Account> acc){
        for(Account ac: acc){
               ac.Name='';
            }
            update acc;    
    }   
    Public void finish(Database.BatchableContext bc){
        
    }
}