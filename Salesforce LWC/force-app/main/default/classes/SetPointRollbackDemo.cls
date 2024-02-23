public class SetPointRollbackDemo {
    Public static void createLead(){
        Savepoint sp = Database.setSavepoint();
        try {
            List<Lead> leadList = new List<Lead>();
            Lead objLead = new Lead();
            objLead.LastName='Saurabh Verma';
            objLead.Company='Intel';
            objLead.Email='samir.dhapke9922@gmail.com';
            leadList.add(objLead);
            
            
            objLead= new Lead();
            objLead.LastName='Rawan Sahu';
            objLead.Email='samir.dhapke9922@gmail.com';
            leadList.add(objLead);
            
            Database.SaveResult[] result =  Database.Insert(leadList,false);
            Database.rollback(sp);
            for(Database.SaveResult sr:result){
                if(sr.isSuccess()){
                    system.debug('Record id is '+ sr.getId());
                }
                else{
                    system.debug('Error is '+ sr.getErrors());
                }
            }
        } catch(Exception e) {
             //If there is any erro rollback the complete Transection
            //Database.rollback(sp);
        }
    }
}