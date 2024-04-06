@isTest
public class testUtility {
     Public static Account prepareAccounts(string namee,string rating){
         Account acc = new Account();
         acc.Name=namee;
         acc.Rating=rating;
         acc.Phone='865432';
         acc.Industry='education';  
     		return acc;
    }
    Public static List<Account> prepareAccounts(integer noOfAccounts,string namee){
        List<Account> accountList = new List<Account>();
        
        for(integer i=0;i<noOfAccounts;i++){
            Account acc = new Account();
            acc.Name=namee+' '+i;
            acc.Rating='Hot';
            acc.Phone='865432';
            acc.Industry='education';  
            accountList.add(acc);
        }
        return accountList;
    }
    
    Public static List<Contact> prepareContacts(integer noOfContacts,string namee,string accId,string email){
        List<Contact> conList = new List<Contact>();        
        for(integer i=0;i<noOfContacts;i++){
            Contact con = new Contact();
            con.LastName=namee+''+i;
            con.Phone='865432';
            con.AccountId=accId;
            con.Email=email;
            conList.add(con);
        }
        return conList;
    }
}