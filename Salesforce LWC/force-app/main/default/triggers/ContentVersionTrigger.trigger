trigger ContentVersionTrigger on ContentVersion (After insert) {
    /* 
Develop a solution so that whenever a file is getting inserted under Task,Event or case
object then same file should be linked to the related Account Record.
if (Trigger.isAfter && Trigger.isInsert) {

AccHelper.linkfileToAccount(Trigger.new);
}
List<ContentVersion> contentVersions = [SELECT 
                                            Id, Title, VersionData, ContentDocumentId, PathOnClient,Origin
                                            FROM 
                                            ContentVersion 
                                            where 
                                            Id IN:Trigger.new
                                           ]; use it when VersionData needed bec VersionData will not available in Trigger.new
*/
    
    
    Set<Id> contentDocumentIdsSet = new Set<Id>();
    //step 1 : Get the content Document Id
    for(ContentVersion version: Trigger.new){
        contentDocumentIdsSet.add(version.ContentDocumentId);
    }
    
    List<ContentDocumentLink> contentDocumentLinkList =[SELECT 
                                                        Id, ContentDocumentId, LinkedEntityId
                                                        FROM 
                                                        ContentDocumentLink
                                                        Where 
                                                        ContentDocumentId IN:contentDocumentIdsSet
                                                       ];
    Set<Id> taskss = new Set<Id>();
    Set<Id> eventss = new Set<Id>();
    Set<Id> casess = new Set<Id>();
    List<ContentDocumentLink> contentDocumentLinkToInsertList =New List<ContentDocumentLink>();
    for(ContentDocumentLink link: contentDocumentLinkList){
        string sObjectName = link.LinkedEntityId.getSobjectType().getDescribe().getName();
        if(sObjectName =='Task'){
            taskss.add(link.LinkedEntityId);
        }
        else if(sObjectName =='Event'){
            eventss.add(link.LinkedEntityId);
        }
        else if(sObjectName =='Case'){
            casess.add(link.LinkedEntityId);
        }
    }
    if(taskss.isEmpty()==false){
        List<Task> tasklist = [SELECT Id, WhatId FROM Task WHERE Id IN :taskss AND What.Type ='Account'];
        for(ContentDocumentLink links: contentDocumentLinkList){
           	 string sObjectName1 = links.LinkedEntityId.getSObjectType().getDescribe().getName();
                 if(sObjectName1 =='Task'){
                     for(Task tsk:tasklist){
                         if(links.LinkedEntityId == tsk.Id){
                            ContentDocumentLink cloneLinkedRecord =links.clone(false,false,false,false);
                             cloneLinkedRecord.LinkedEntityId=tsk.WhatId;
                             contentDocumentLinkToInsertList.add(cloneLinkedRecord);
                         }
                     }
                 }
             
        }
    }
    if(eventss.isEmpty()==false){
        List<Event> eventlist = [SELECT Id, WhatId FROM Event WHERE Id IN :eventss AND What.Type ='Account'];
         for(ContentDocumentLink links: contentDocumentLinkList){
           	 string sObjectName1 = links.LinkedEntityId.getSObjectType().getDescribe().getName();
                 if(sObjectName1 =='Event'){
                     for(Event evt:eventlist){
                         if(links.LinkedEntityId == evt.Id){
                            ContentDocumentLink cloneLinkedRecord =links.clone(false,false,false,false);
                             cloneLinkedRecord.LinkedEntityId=evt.WhatId;
                             contentDocumentLinkToInsertList.add(cloneLinkedRecord);
                         }
                     }
                 }
             
        }
    }
    if(casess.isEmpty()==false){
        List<Case> caseslist = [SELECT Id, AccountId FROM Case WHERE Id IN :casess];
        //system.debug('caseslist => '+caseslist);
             for(ContentDocumentLink links: contentDocumentLinkList){
           	 string sObjectName1 = links.LinkedEntityId.getSObjectType().getDescribe().getName();
                 if(sObjectName1 =='Case'){
                     for(Case cs:caseslist){
                         if(links.LinkedEntityId == cs.Id){
                            ContentDocumentLink cloneLinkedRecord =links.clone(false,false,false,false);
                             cloneLinkedRecord.LinkedEntityId=cs.AccountId;
                             contentDocumentLinkToInsertList.add(cloneLinkedRecord);
                         }
                     }
                 }
             
        }
    }
    Insert contentDocumentLinkToInsertList;
}