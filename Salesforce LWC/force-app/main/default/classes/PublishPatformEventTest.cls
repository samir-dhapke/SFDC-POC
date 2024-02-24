@isTest
public class PublishPatformEventTest {
    @isTest static void testFailedEvents() {
        Order_Details__e orderDetailListEVent = new Order_Details__e(
            Order_Number__c='ORD1000',
            Generate_Invoice__c=false);
        PublishPatformEventCallBacks cb = new PublishPatformEventCallBacks();
        EventBus.publish(orderDetailListEVent,cb);
        Test.getEventBus().fail();
        List<Task> taskList=[Select Id, Subject,Description from Task 
                             Where Subject='Follow up on event publishing failures.'];
        Assert.areEqual(1,taskList.size(),'Task Creation Failed');
    }
    
    @isTest static void testSuccessEvents() {
        Order_Details__e orderDetailListEVent = new Order_Details__e(
            Order_Number__c='ORD2000',
            Generate_Invoice__c=true);
        PublishPatformEventCallBacks callBackInstance = new PublishPatformEventCallBacks();
               // Deliver events published so far
        // (invokes onSuccess and delivers events to subscribers)
        //  Test.getEventBus().deliver();or use Test.startTest() and Test.stopTest()
        Test.startTest();
         EventBus.publish(orderDetailListEVent,callBackInstance);
        Test.stopTest();
        List<Task> taskList=[Select Id, Subject,Description from Task 
                             Where Subject='Follow up on successful event publishing.'];
        Assert.areEqual(1,taskList.size(),'Task Creation Successfully');
    }
}