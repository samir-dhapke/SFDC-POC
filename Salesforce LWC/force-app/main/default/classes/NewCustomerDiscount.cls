public class NewCustomerDiscount implements IPerchaseOrder {
    public Decimal discount(){
         List<Account> acc = [Select id,name from Account];
         System.debug('Scope => '+acc.size());
        return 1.6;
    }
     
}