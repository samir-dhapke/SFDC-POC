Public class LeadUtility{
    Public static void convertMultipleLeads(Set<Id> leadIds){
        List<LeadStatus> lStatus = [Select id, MasterLabel, isConverted
                                    from LeadStatus
                                    Where isConverted = true];
        if(lStatus!=null && lStatus.size()>0){
            List<Database.LeadConvert> lstLeadConvert = new List<Database.LeadConvert>();  
            for(Id leadId:leadIds){
                Database.LeadConvert lConvert = new Database.LeadConvert();            
                lConvert.setLeadId(leadId);
                lConvert.setConvertedStatus(lStatus.get(0).MasterLabel);
                lConvert.setOwnerId('0055g00000Iy0pBAAR');
                lstLeadConvert.add(lConvert);
            }
            
            List<Database.LeadConvertResult> resultList = Database.convertLead(lstLeadConvert, false,Accesslevel.USER_MODE);
            
            for(Database.LeadConvertResult sr:resultList){
                if(sr.isSuccess()){
                    System.debug(sr.getAccountId());
                    System.debug(sr.getContactId());
                    System.debug(sr.getOpportunityId());
                }else{
                    List<Database.Error> err = sr.getErrors();
                    system.debug(err);
                }
            }
        }
        else{
            //handle error
        }
    }
    //assign existing Account While converting the leads
    Public static void convertLeads(Id leadId){
        List<LeadStatus> lStatus = [Select id, MasterLabel, isConverted
                                    from LeadStatus
                                    Where isConverted = true];
        if(lStatus!=null && lStatus.size()>0){            
            //Step 1:SOQL on lead object based on Lead Id
            Lead leadrecord = [Select Id, Company,ownerId from Lead Where Id=:leadId];
            
            //Step2: SOQL on account Object Based On Lead Compnay Name
            List<Account> existingAccount = [Select Id, Name from Account Where Id=:leadrecord.Company];            
            Database.LeadConvert lConvert = new Database.LeadConvert();            
            lConvert.setLeadId(leadrecord.Id);
            lConvert.setConvertedStatus(lStatus.get(0).MasterLabel);
            lConvert.setOwnerId(leadrecord.ownerId);
            //Step 3: Check if Account Found
            //if- yes [use Existing Account]
            //if- No [Create New Account]	
            if(existingAccount!=null && existingAccount.size()>0){
                Account accountRecord = existingAccount.get(0);
                lConvert.setAccountId(accountRecord.Id);
            }			       
            Database.LeadConvertResult result = Database.convertLead(lConvert, false,Accesslevel.USER_MODE);      
        }
    }
}