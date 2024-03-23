public class FlowClassCI10B {
    Public class outputWrapper{
      @InvocableVariable Public List<Account> accList;
    }
    
    
    @InvocableMethod(label='flow method CI 10 B')
    Public static List<outputWrapper> getAccountDetails(List<String> name){
       // integer num = 100/0;
        outputWrapper wrapper = new outputWrapper();
        List<outputWrapper> erList = new List<outputWrapper>();
        string accName=name[0];
         List<Account> accListt= [Select Id,Name,Active__c from Account Where Name=:accName];
        wrapper.accList=accListt;
        erList.add(wrapper);
        return erList;
    }
    Public static List<Account> getAccountDetails2(List<String> name){
        string accName=name[0];
         return [Select Id,Name from Account Where Name=:accName];
        
    }
     Public static void getAccountDetails22(){
       
        Account acc = new Account();
        system.debug('acc'+acc.Name);
    }
}