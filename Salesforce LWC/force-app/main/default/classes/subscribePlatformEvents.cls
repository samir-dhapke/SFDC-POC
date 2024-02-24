public class subscribePlatformEvents {
    Public static void afterUnsert(List<Order_Details__e> orderDetailsList){
        List<Task> taskList = new List<Task>();
        User myUser = [SELECT Id from User WHERE username='samir.dhapke123@gmail.com'];
        for(Order_Details__e orderDetails:orderDetailsList){
            Task tsk= new Task();
            tsk.Subject='Platform Event is Subscribed using Apex Trigger';
            tsk.Description =orderDetails.Order_Number__c;
            tsk.ActivityDate = Date.today();
            tsk.OwnerId = myUser.Id;
            taskList.add(tsk);
        }
        if(!taskList.isEmpty()){
            try{
            Insert taskList; 
        }
        catch(Exception e){
            System.debug('Error returned: '+ e.getMessage());                        
            
        } 
        }
       
    }
}