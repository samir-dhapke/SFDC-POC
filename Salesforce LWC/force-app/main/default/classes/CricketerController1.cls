public class CricketerController1 {
    @AuraEnabled(cacheable=true)
    public static List<Cricketers__c> getCricketList(string nationality) {
        if(nationality==''){
            return [select Id,Name,Nationality__c,Age__c,Runs__c,Image_Url__c from Cricketers__c];
        }
        else{
            return [select Id,Name,Nationality__c,Age__c,Runs__c,Image_Url__c from Cricketers__c where Nationality__c=:nationality];
        }
        
        
    }
    
     @AuraEnabled()
    public static Cricketers__c getSelectedPlayerDetailt(string playerId){
        return [select Id,Name,Nationality__c,Age__c,Runs__c,Image_Url__c from Cricketers__c where Id=:playerId];
    }
}