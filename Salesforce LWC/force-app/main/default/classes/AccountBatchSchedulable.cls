public class AccountBatchSchedulable implements System.Schedulable, Database.AllowsCallouts{
    public void execute (system.SchedulableContext sc){
        AccountBatchClass b = new AccountBatchClass();
        database.executeBatch(b,4000);
    }
}