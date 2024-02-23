public class FutureMethodToUpdateEmail {
    public static void run() {
        List<Contact> conList = [Select Id, Email from Contact LIMIT 10];
        for(Contact con:conList){
            con.Email='abc@gmail.com';
        }
        update conList;
        
    }
    
    public static void updateSalesforceUser() {
        List<User> usr =[Select Id,Name,Email from User Where Name='Nikhil Doe'];
        for(User u:usr){
            u.Email='samir.dhapke9922@gmail.com';
        }
        update usr;
        run();
    }
}