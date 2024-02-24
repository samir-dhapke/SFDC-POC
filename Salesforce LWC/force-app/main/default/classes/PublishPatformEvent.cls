public class PublishPatformEvent {
    Public static void publishPlatformEventDemo(){
        List<Order_Details__e> orderDetailListEVent = new  List<Order_Details__e>();
        orderDetailListEVent.add(new Order_Details__e(Order_Number__c='ORD1000',Generate_Invoice__c=true));
        orderDetailListEVent.add(new Order_Details__e(Order_Number__c='ORD6000',Generate_Invoice__c=False));
        orderDetailListEVent.add(new Order_Details__e(Order_Number__c='ORD7000',Generate_Invoice__c=true));
        //Publish The Event
        PublishPatformEventCallBacks callBackInstance = new PublishPatformEventCallBacks();
        //callBackInstance pass it to know platform event on success and failure
        List<Database.SaveResult> sr = EventBus.publish(orderDetailListEVent,callBackInstance);
         
        for(Database.SaveResult srItrm:sr){
            if(srItrm.isSuccess()){
                System.debug('Platform Publish SuccessFully');
            }
            else{
                List<Database.error> errList = srItrm.getErrors();
                for(Database.error errorDetails:errList){
                    System.debug('Error Details '+errorDetails.getMessage());
                }
                
            }
        }
    }
}