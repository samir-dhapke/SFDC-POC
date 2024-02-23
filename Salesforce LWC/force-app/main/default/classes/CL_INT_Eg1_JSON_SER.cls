public class CL_INT_Eg1_JSON_SER {
 Public void CreateJson(String Nn,String Ph, String Ind){
     System.JSONGenerator  js=JSON.createGenerator(true);// Step 1--> create JSON Generator 
        js.writeStartObject();							 // Step 2- Start Writing to JSON
        try{
            Account A =new Account();
            A.Name=Nn;
            A.Phone=Ph;
            A.Industry=Ind;
            Insert A;
            js.writeStringField('Status','Success');// step 3- write to JSON As per requirment 
            //In Account there is no field called 'Status' We have create Vertual Field.
           	js.writeIdField('AccId', A.id);
            js.writeStringField('Message', 'Account created Successfully');
            js.writeNumberField('Code', 100);
        }
        catch(exception e){
            js.writeStringField('Status','Failed');
           	//js.writeIdField('AccId', A.id);
            js.writeStringField('Message', e.getMessage());
            js.writeNumberField('Code', 200);
        }
        js.writeEndObject();			// Step - End Writing to JSON
        String Result=js.getAsString();	// Step - get the Final output JSON
        System.debug(Result);			// Step - See and check The Output
    }
}