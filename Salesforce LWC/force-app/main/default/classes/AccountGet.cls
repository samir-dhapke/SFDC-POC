public class AccountGet {
    @future
    Public static void dateUtils(){
        try{
            for(integer i=0; i<=210;i++){
                List<Account> accList = [Select Id ,Name from Account LIMIT 1];
    
            }
        }
        catch(exception e){
            system.debug('Static==> '+e.getMessage());
        }
    }
}