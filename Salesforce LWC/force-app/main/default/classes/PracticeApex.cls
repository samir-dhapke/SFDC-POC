public class PracticeApex {
    @AuraEnabled(cacheable=true)
    Public static List<OpportunityLineItem> oliMethod(){
     List<OpportunityLineItem> oli=[Select Id,name from OpportunityLineItem];
        return oli;
    }
}