@isTest
public class ContactTriggerTest {
    Public static final integer RECORD_COUNT=100;
    @TestSetup
    private static void setupData(){
        //insert Axcount
        Account accountRecord = testUtility.prepareAccounts('Rollup Summery Account','Cold');
        insert accountRecord;        
        List<Contact> conListt=testUtility.prepareContacts(RECORD_COUNT, 'Dhapke', accountRecord.Id,'abc@gmail.com');
        insert conListt;
    }
    
    @isTest
    private static void insertTest(){
        List<Account> accountListt=[Select Id,Name,Number_of_Contacts__c, (Select Id from Contacts LIMIT 500) from Account 
                                   Where Name='Rollup Summery Account' LIMIT 10];
        Assert.isNotNull(accountListt,'There are no Account Record');
        for(Account acc:accountListt){
            List<Contact> conList= acc.Contacts;
            if(conList!=null && conList.size()>0){
                Assert.areEqual(conList.size(),acc.Number_of_Contacts__c,'Total Cntact Count Does not match');
            }
        }
        /*if(accountList != null && accountList.size()>0){
Account accRecord = accountList.get(0);
Assert.areEqual(1,accRecord.Number_of_Contacts__c,'Total Cntact Count Does not match');
}*/
    }
    
    @isTest
    private static void updateTest(){
        Account accountRecord = new Account(Name='Rollup Summery',Industry='education');
        insert accountRecord;
        List<Contact> con =[Select Id,Name from Contact where Email='abc@gmail.com'];
        for(Contact c:con){
            c.AccountId=accountRecord.Id;
        }
        Test.startTest();
        update con;
        Test.stopTest();
        
        List<Account> accountList1=[Select Id,Name,Number_of_Contacts__c, (Select Id from Contacts LIMIT 500) from Account 
                                    Where Name='Rollup Summery Account' OR Name='Rollup Summery'  LIMIT 10];
        Assert.isNotNull(accountList1,'There are no Account Record');
        for(Account acc:accountList1){
            List<Contact> conList= acc.Contacts;
            if(conList!=null && conList.size()>0){
                Assert.areEqual(conList.size(),acc.Number_of_Contacts__c,'Total Cntact Count Does not match');
            }
            if(acc.Name=='Rollup Summery Account'){
                Assert.areEqual(0,acc.Number_of_Contacts__c,'Total Cntact Count Does not match');
            }
            if(acc.Name=='Rollup Summery'){
                Assert.areEqual(RECORD_COUNT,acc.Number_of_Contacts__c,'Total Cntact Count Does not match');
            }
        }
        
    }
    
    @isTest
    private static void deleteTest(){
        List<Contact> contactRecords = [Select Id,Name From Contact Where Email='abc@gmail.com'];
        Test.startTest();
        Delete contactRecords;
        Test.stopTest();
        List<Account> accountList1=[Select Id,Name,Number_of_Contacts__c, (Select Id from Contacts LIMIT 500) from Account 
                                    Where Name='Rollup Summery Account' LIMIT 10];
        Assert.isNotNull(accountList1,'There are no Account Record');
        for(Account acc:accountList1){          
            if(acc.Name=='Rollup Summery Account'){
                Assert.areEqual(0,acc.Number_of_Contacts__c,'Total Cntact Count Does not match');
            }
        }
    }
    
    @isTest
    private static void unDeleteTest(){
        List<Contact> contactRecords = [Select Id,Name From Contact Where Email='abc@gmail.com'];
        Delete contactRecords;
        
        List<Account> accountList3=[Select Id,Name,Number_of_Contacts__c, (Select Id from Contacts LIMIT 500) from Account 
                                    Where Name='Rollup Summery Account' LIMIT 10];
        Assert.isNotNull(accountList3,'There are no Account Record');
        for(Account acc:accountList3){          
            if(acc.Name=='Rollup Summery Account'){
                Assert.areEqual(0,acc.Number_of_Contacts__c,'Total Cntact Count Does not match');
            }
        }
        
        Test.startTest();
        undelete contactRecords;
        Test.stopTest();
        
        List<Account> accountList2=[Select Id,Name,Number_of_Contacts__c, (Select Id from Contacts LIMIT 500) from Account 
                                    Where Name='Rollup Summery Account' LIMIT 10];
        Assert.isNotNull(accountList2,'There are no Account Record');
        for(Account acc:accountList2){          
            if(acc.Name=='Rollup Summery Account'){
                Assert.areEqual(RECORD_COUNT,acc.Number_of_Contacts__c,'Total Cntact Count Does not match');
            }
        }
    }
}