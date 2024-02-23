public class InlineDataTableDemo {
    @AuraEnabled(cacheable=true)
    public static List<Cricketers__c> getCricketList(string nationality) {
        return [select Id,Name,Nationality__c,Runs__c from Cricketers__c];
    }
    @AuraEnabled
    public static string updateCricketersList(object playersData) {
        system.debug('playersData==>'+playersData);
        List<Cricketers__c> playersDataList =(List<Cricketers__c>) JSON.deserialize(JSON.serialize(playersData), List<Cricketers__c>.Class);
        system.debug('UpdatedplayersDataList==>'+playersDataList);
        if(!playersDataList.isEmpty()){
            update playersDataList;
            return 'Success';
        }
        return 'failed';
    }
}