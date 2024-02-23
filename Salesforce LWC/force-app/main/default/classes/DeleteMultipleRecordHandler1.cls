public class DeleteMultipleRecordHandler1 {
@AuraEnabled(cacheable = true)
    public static List<Contact> fetchContacts() {
        return [ SELECT Id, Name, Email, Phone FROM Contact order by Name asc limit 15];    
    }
    
    @AuraEnabled
    public static void deleteSelectedContacts(List<Contact> contactLst) {
        delete contactLst;
    }
}