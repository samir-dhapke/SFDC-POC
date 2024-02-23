@RestResource(urlMapping='/Account/*')
global class SalesforceAccessForIntegration {
    @HttpGet
    global static List<Account> getAccounts() {
        List<Account> result = [SELECT Id, Name, Phone, Website FROM Account];
        return result;
    }
    
    @HttpPost
    global static Account createAccount(String name,String phone) {
        Account acc = new Account();
        acc.Name= name;
       acc.Phone=phone;       
        insert acc;
        
        return acc;
    }
   
}