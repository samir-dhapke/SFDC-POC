public class newApexRun {
    public static void newMethod(){
        Map<Id,Cricketers__c> CricketersMap = new Map<Id,Cricketers__c>();
      List<Cricketers__c> CricketersList=[SELECT Id, Account__r.Phone FROM Cricketers__c where Id ='a005g00003FxICPAA3'];  
        for(Cricketers__c crick:CricketersList){
           // system.debug(crick.Account__r.Phone); Here we get Phone
            CricketersMap.put(crick.Id,crick);
        }
         //system.debug('get The Phone '+CricketersMap.get('a005g00003FxICPAA3')); here we will not get Phone
         //Solution 1: Line: 10, Column: 1 System.SObjectException: Invalid field Account__r.Phone for Cricketers__c 
         //error occure
       //  system.debug('get The Phone '+CricketersMap.get('a005g00003FxICPAA3').get('Account__r.Phone'));
         //Solution 2:      
         system.debug('get The Phone '+CricketersMap.get('a005g00003FxICPAA3').getSobject('Account__r').get('Phone'));
    }
}