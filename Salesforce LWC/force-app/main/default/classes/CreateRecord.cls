public class CreateRecord {
    Public static void createAccount(String AccountName){
        Account acc =new Account();
        acc.Name=AccountName;
        insert acc;
      CreateContactRelatedAccount(acc.Name,acc.Id);
    }
     Public static void CreateContactRelatedAccount(String lName,Id accid){
         Contact con =new Contact();
         con.LastName ='Contact '+lName;
         con.AccountId=accid;
         insert con;
    }
    
}