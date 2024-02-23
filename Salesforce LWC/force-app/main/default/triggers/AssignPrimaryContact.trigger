trigger AssignPrimaryContact on Contact (after insert, after update) {
    Map<Id, Contact> accountIdToPrimaryContact = new Map<Id, Contact>();
    
    // Collecting all the account Ids and their related contacts
    for (Contact con : Trigger.new) {
        if (con.AccountId != null) {
            if (!accountIdToPrimaryContact.containsKey(con.AccountId)) {
                accountIdToPrimaryContact.put(con.AccountId, null);
            }
        }
    }
    
    // Querying contacts related to the accounts
    List<Account> accountsWithContacts = [SELECT Id, (SELECT Id, Name FROM Contacts ORDER BY CreatedDate ASC) FROM Account WHERE Id IN :accountIdToPrimaryContact.keySet()];
    
    // Setting the fourth or later contact as primary for each account
    for (Account acc : accountsWithContacts) {
        List<Contact> contacts = acc.Contacts;
        if (contacts.size() >= 4) {
            accountIdToPrimaryContact.put(acc.Id, contacts[3]); // Fourth contact or later
        }
    }
    
    // Updating the primary contact field on the related account
    List<Account> accountsToUpdate = new List<Account>();
    for (Id accId : accountIdToPrimaryContact.keySet()) {
        Account acc = new Account(Id = accId);
        acc.Primary_Contact__c = accountIdToPrimaryContact.get(accId).Id;
        accountsToUpdate.add(acc);
    }
    
    if (!accountsToUpdate.isEmpty()) {
        update accountsToUpdate;
    }
}