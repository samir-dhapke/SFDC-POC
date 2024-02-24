public class FutureMethod {
    
    public static void run() {
        Integer randomInt = Integer.valueOf(math.rint(math.random()*1000000));
               Account acc = new Account(
                                    name='Salesforce.org '+randomInt,
                                    Rating='Hot'
                                     );  
                insert acc;
				createSalesforceUser();
				//Integer i = 100/0;
      try{
             Integer i = 100/0;
        }
        catch(system.exception e){
           System.debug('The following exception has occurred: ' + e.getMessage());
        }
       //createSalesforceUsera();
        // createSalesforceUseraq(); 

      }
    /*
     @future()
    public static void createSalesforceUsera() {
        System.debug('The following exception has occurred 1');
    }
     @future()
    public static void createSalesforceUseraq() {
        System.debug('The following exception has occurred 2 ');
    }
*/
    @future()
  	public static void createSalesforceUser() {
        Id roleId = [SELECT Id FROM UserRole WHERE Name = 'COO' LIMIT 1].Id;
       // Create a new User object
        User newUser = new User();

        // Set user details
        newUser.FirstName = 'Ram';
        newUser.LastName = 'Ram';
        newUser.Email = 'samirdhapke880@gmail.com';
        newUser.Username = 'ram.ram@gmail.com';
        newUser.Alias = 'ram';
        newUser.CommunityNickname = 'ram';
        newUser.ProfileId = [SELECT Id, Name FROM Profile WHERE Name = 'System Adminn' LIMIT 1].Id;
        newUser.UserRoleId = roleId; // Replace with the actual Role Id

        // Set additional fields as needed
        newUser.TimeZoneSidKey = 'America/New_York';
        newUser.LocaleSidKey = 'en_US';
        newUser.EmailEncodingKey = 'ISO-8859-1';
        newUser.LanguageLocaleKey = 'en_US';
                                                
     // Insert the user
      insert newUser;                                          
    }
 }