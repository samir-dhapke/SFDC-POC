public class CL_INT_Eg2_JSON_SER {
    Public void BringAccount(){
        System.JSONGenerator  js=JSON.createGenerator(true);// Step 1--> create JSON Generator 
        js.writeStartObject();
        try{
            List<Account> AC = [Select Name,Phone from Account where Phone<> null];//where Phone<> null
            for(Account EA:AC)
            {
                js.writeStringField('AccountName',EA.Name);
                js.writeStringField('Phone',EA.Phone);
              /*  if(EA.Phone != null){
                    js.writeStringField('Phone',EA.Phone);
                }
                else{
                    js.writeNull();
                }
                */
                js.writeStringField('Status','Success');
                js.writeNumberField('Code', 600);
            }
            
        }
        catch(exception e){
            js.writeStringField('Status','Failed');
            js.writeNumberField('Code', 800);
        }
        js.writeEndObject();			
        String Result=js.getAsString();	
        System.debug(Result);
    }
}