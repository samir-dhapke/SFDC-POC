public class DateUtility {
 //Scenario where we have create day which is mostly dynamic or we have to add the days so we can 
    //not create multiple formulas bec may impact the flow .
    //So we will se how can we pass the multiple parameter.
    @InvocableMethod(label='Date Operations' 
                     description='Operations related to Date Class' 
                     category='Date')
    Public static void dateUtils1(){
        //Date ,Operation(addDays), NumberOfDays
        
    }
    public class CreateMapInputs{
        @InvocableVariable(label='List of records')
        public sObject[] records;
    }
}