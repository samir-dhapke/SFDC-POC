public class CL_INT_Eg1_JSONPARSER {
 public String JsonString {get;set;}
    public Map<String,Object> Result {get;set;}
    public CL_INT_Eg1_JSONPARSER(){
        //Inintialize the class Variable
        Result = new Map<String,Object>();
        //Parsing the class Variable 
       JsonString = '{"Name":"Ram","Mark":[10,20,30,40],"City":"Hyd"}';
        System.JSONParser jp = JSON.createParser(JsonString);
        //JSONParser will create token of each label and value.
        
        While(jp.nextToken()!=null)
        {
            Result.put(jp.getText(),jp.getCurrentToken());
        }
    }
}