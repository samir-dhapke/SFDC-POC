public with sharing class CustomAddressCompoundField {
    public static void CustomAddressCompoundFields() {
        Account a = new Account();
        a.Name='ApexHours';
        a.Custom_Address__StateCode__s='CA';
        a.Custom_Address__CountryCode__s='US';
        a.Custom_Address__Street__s='1234 Dublin Blvd';
        a.Custom_Address__PostalCode__s='12345';
        a.Custom_Address__City__s='Dublin';
        insert a;
        
        List<Account> acc=[select Id,Name,Custom_Address__StateCode__s,Custom_Address__CountryCode__s,
                           Custom_Address__Street__s,Custom_Address__PostalCode__s,Custom_Address__City__s 
                           from Account where Name='Java Developer1'];
        system.debug('acc=> '+acc);
        
        //Source
        //https://www.infallibletechie.com/2023/03/how-to-create-and-query-salesforce-custom-address-field.html
    }
}