public with sharing class AccountHelper2 {
    @AuraEnabled
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