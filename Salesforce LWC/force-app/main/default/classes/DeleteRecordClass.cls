public class DeleteRecordClass {
    public static void deletee(){
        List<Id> accIds = new List<Id>();
        List<Case> oppListt =[Select AccountId From Case Where AccountId!=null LIMIT 1000];
        for(Case cs:oppListt){
            accIds.add(cs.AccountId);
        }
string[] arr = new string[]{'Sample Account','Mr. Thomas Cruise','Archi Gandhi','Reginauld Eglinnnn','Star Jelfs',
    'GenePoint',' United Oil &amp; Gas, UK'};
        List<Account> oppList =[Select Id From Account Where Id Not IN:accIds AND Name NOT IN:arr];
        Delete oppList;
    }
}