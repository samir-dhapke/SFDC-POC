public class AccHelper {
    Public static void linkfileToAccount(List<ContentVersion> newFiles){
        Set<Id> accountIds = new Set<Id>();

        // Collect Account Ids related to inserted files
        for (ContentVersion file : newFiles) {
            if (file.FirstPublishLocationId.getSObjectType() == Task.SObjectType ||
                file.FirstPublishLocationId.getSObjectType() == Event.SObjectType ||
                file.FirstPublishLocationId.getSObjectType() == Case.SObjectType) {
                accountIds.add(file.FirstPublishLocationId);
            }
        }

        // Query related Account records
        Map<Id, Account> accountsMap = new Map<Id, Account>([
            SELECT Id
            FROM Account
            WHERE Id IN :accountIds
        ]);

        // Create ContentDocumentLink records to link files to Account
        List<ContentDocumentLink> newAccountLinks = new List<ContentDocumentLink>();
        for (ContentVersion file : newFiles) {
            if (accountsMap.containsKey(file.FirstPublishLocationId)) {
                ContentDocumentLink newLink = new ContentDocumentLink();
                newLink.ContentDocumentId = file.ContentDocumentId;
                newLink.LinkedEntityId = accountsMap.get(file.FirstPublishLocationId).Id;
                newLink.ShareType = 'I'; // 'I' for Inferred Permission
                newLink.Visibility = 'AllUsers'; // Adjust visibility as needed
                newAccountLinks.add(newLink);
            }
        }

        // Insert new ContentDocumentLink records
        if (!newAccountLinks.isEmpty()) {
            insert newAccountLinks;
        }
    }
}