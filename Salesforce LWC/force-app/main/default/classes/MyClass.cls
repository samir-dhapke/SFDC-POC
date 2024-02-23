public with sharing class MyClass {
    @AuraEnabled(cacheable=true)
    public static Contact myMethod() {
        return [Select id,name from Contact LIMIT 1];
    }
     public static void myMethod1() {
        List<Account> acc = [Select id,name from Account];
         System.debug('Scope => '+acc.size());
    }
}