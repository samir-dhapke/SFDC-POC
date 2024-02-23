public class ContactTriggerHandler1 {
    Public static void checkDuplicateEmail(List<Contact> conList){
        Set<string> emailSet = new Set<string>();
        for(Contact con:conList){
            if(con.Email!=null && con.Email!=''){
                emailSet.add(con.Email);//10 rec 5 already in database
            }
        }
        List<Contact> existringContact = [Select Id, Email from Contact where Email=:emailSet];//f rec
        Map<String,Contact> existingCont = new Map<String,Contact>();
        if(existringContact.size()>0){// meaning kist has a record with same email as one of new contact
            for(Contact cont:existringContact){           
                existingCont.put(cont.Email,cont);        
            } 
        }
        
        for(Contact validateContacts:conList){
            if(existingCont.containskey(validateContacts.Email)){
                validateContacts.addError('Duplicate Emails Exists!!!!');
            }
        }
    }
}