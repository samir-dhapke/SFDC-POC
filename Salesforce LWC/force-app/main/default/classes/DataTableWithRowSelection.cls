public class DataTableWithRowSelection {
    @AuraEnabled
    public static List<Contact> getContactList(string lwcRecordId,string searchKeys){
        if(searchKeys !='' && searchKeys != null){
            string key = '%'+ searchKeys +'%';
            List<Contact> conList = [Select Id,Name,Phone,AccountId from Contact where AccountId=:lwcRecordId and Name LIKE:key];
            if(!conList.isEmpty()){
                return conList;
            }
            return null;
        }
            else{
                List<Contact> conList1 = [Select Id,Name,Phone,AccountId from Contact where AccountId=:lwcRecordId];
                return conList1;
                
            }
            
        
        
    }
}