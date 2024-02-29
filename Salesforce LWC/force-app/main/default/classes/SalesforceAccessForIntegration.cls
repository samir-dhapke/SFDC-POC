@RestResource(urlMapping='/Account/*')
global class SalesforceAccessForIntegration {
    @HttpGet
    global static List<Account> getAccounts() {
        List<Account> result = [SELECT Id, Name,Rating FROM Account LIMIT 10];
        return result;
    }
    
    @HttpPost
    global static Account createAccount(String name,String phone,string Email,string emailOtp,string phoneOtp) {//
        Account acc = new Account();
        system.debug(phone);
        system.debug(Email);
        system.debug(emailOtp);
        system.debug(phoneOtp);
        acc.Name= name;
        acc.Phone=phone;       
        insert acc;
        
        return acc;
    }
    
}