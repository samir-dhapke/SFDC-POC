public class SetpointRollBackClassDemo {
    
    Public static void createLead(){
        /*List<Lead> leadList = new List<Lead>();
			Lead objLead = new Lead();
			objLead.LastName='Pawan Sahu';
			objLead.Company='Intel';
			objLead.Email='samir.dhapke9922@gmail.com';
			leadList.add(objLead);


			objLead= new Lead();
			objLead.LastName='Rawan Sahu';
			objLead.Email='samir.dhapke9922@gmail.com';
			leadList.add(objLead);
			insert leadList;*/
        //System.DmlException: Insert failed. First exception on row 1; first error: REQUIRED_FIELD_MISSING, 
        //Required fields are missing: [Company]: [Company]
        Savepoint sp = Database.setSavepoint();
        try{
            List<Lead> leadList = new List<Lead>();
            Lead objLead = new Lead();
            objLead.LastName='Nirmala Sahu';
            objLead.Company='Intel';
            objLead.Email='samir.dhapke9922@gmail.com';
            leadList.add(objLead);
            
            
            objLead= new Lead();
            objLead.LastName='Rawan Sahu';
            objLead.Email='samir.dhapke9922@gmail.com';
            leadList.add(objLead);
            
            Database.SaveResult[] result =  Database.Insert(leadList,false);
            for(Database.SaveResult sr:result){
                if(sr.isSuccess()){
                    system.debug('Record id is '+ sr.getId());
                }
                else{
                    system.debug('Error is '+ sr.getErrors());
                }
            }
        }catch(Exception e){
            //If there is any erro rollback the complete Transection
            Database.rollback(sp);
        }    
    }
}