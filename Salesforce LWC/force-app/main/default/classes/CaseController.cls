/**
 * @description       : 
 * @author            : Samir Dhapke
 * @group             : 
 * @last modified on  : 12-19-2023
 * @last modified by  : Samir Dhapke
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   12-19-2023   Samir Dhapke   Initial Version
**/
public with sharing class CaseController {
    @AuraEnabled(cacheable=true)
    public static List<Case> getCases() {
        try {
            List<Case> caseList = [SELECT Id, Status, CaseNumber, 
                                Priority, Subject FROM Case];

            return caseList;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        
    }
   
}