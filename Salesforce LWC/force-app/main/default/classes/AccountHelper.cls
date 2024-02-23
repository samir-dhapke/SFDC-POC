public with sharing class AccountHelper {
    @AuraEnabled(cacheable=true)
    public static List<Account> getParentAccount(String inputIndustry) {
        return [Select Id,name,Industry from Account Where Industry =:inputIndustry];
    }

    public static String updateTickerRecord(Id recordId,String newTicker) {
        
        Account acc= new Account(Id=recordid,TickerSymbol=newTicker);
        try {
            update acc;
            return 'Success';
        } catch (Exception ex) {
            return ex.getMessage();
        }
    }
}