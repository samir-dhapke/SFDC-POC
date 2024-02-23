public class CL_INT_Eg2_JSONPARSER {
 public String JsonString {get;set;}
    public Map<String,Object> Result {get;set;}
    
    Public void CL_INT_Eg2_JSONPARSER(){
        String nm;
   	 	String ph;
    	String rat;
        Result = new Map<String,Object>();
		//JsonString ='{"Status":"Success","Code":200,
		//"Account":[
		//			{"Name":"Praful1","Phone":"11111","Rating":"Hot"},
		//			{"Name":"Praful2","Phone":"22222","Rating":"Cold"}
		//			]",
		//			Contact":[
		//				{"FirstName":"Ravi","Phone":"9363752"},
		//				{"FirstName":"Sham","Phone":"936332"},
		//				{"FirstName":"Kiran","Phone":"86363752"}
		//				]
		//		}';
  		
        //Simple String Simple DeSerialization
        JsonString ='{"Name":"JPT1","Phone":"22222","Rating":"Cold"}';
        Account A = (Account)JSON.deserializeStrict(JsonString, Account.Class);
        Insert A;
        
        //Simple String Complex DeSerialization
		//DONOT GO BY THIS AS THE JSON STRING IS SIMPLE
         System.JSONParser jp = JSON.createParser(JsonString);// Step 1: create Parser
        While(jp.nextToken()!=null){				// Step 2 : check if the parser is success Toke is there(not null)
            if(jp.getText()=='Name'){
                jp.nextToken();// go to the next token 
                nm=jp.getText();
            }
            if(jp.getText()=='Phone'){
                jp.nextToken();
                ph=jp.getText();
            }
            if(jp.getText()=='Rating'){
                jp.nextToken();
                rat=jp.getText();
            }
        }
        Account A1 = new Account();
        A1.Name=nm;
        A1.Phone=ph;
        A1.Rating=rat;
        Insert A1;
        // conclusion here is having the simple string we can able to insert it in 2 line of code and With JSONParser 
        // we have to use multiple lines of code so best way to choose according to string
        // if string is simple the go with deserialization if string is complex then go with the JSONParser.
    }
}