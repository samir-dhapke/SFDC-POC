/**
 * @description       : 
 * @author            : Samir Dhapke
 * @group             : 
 * @last modified on  : 12-15-2023
 * @last modified by  : Samir Dhapke 
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   12-15-2023   Samir Dhapke   Initial Version
**/
public class GetChild {
    //GetChild
 @AuraEnabled
    public static List<Account> getContactDetail(){
        List<Account> accList = [Select Id,name,(select Name,FirstName,LastName from Contacts) from Account where 
        Id IN (select AccountId from Contact)]; 
        system.debug(accList);
        if(!accList.isEmpty()){
            return accList;
        }
        return null;
    }
}