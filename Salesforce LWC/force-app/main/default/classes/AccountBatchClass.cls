public class AccountBatchClass implements Database.Batchable<sObject>{
public Database.QueryLocator start(Database.BatchableContext BC)
    {
        String query = 'SELECT Id,Name FROM Account LIMIT 3000';
       
        return Database.getQueryLocator(query);
    }
    public void execute(Database.BatchableContext BC, List<Account> scope)
    {
           System.debug('Scope => '+scope.size());
    }
    public void finish(Database.BatchableContext BC) {
    }
}