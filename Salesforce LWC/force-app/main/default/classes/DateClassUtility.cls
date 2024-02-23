public class DateClassUtility {
    //Scenario where we have create day which is mostly dynamic or we have to add the days so we can 
    //not create multiple formulas bec may impact the flow .
    //So we will se how can we pass the multiple parameter.
    @InvocableMethod(label='Date Operations' 
                     description='Operations related to Date Class' 
                     category='Date Utils'
                     iconName='slds:standard:date_time')
    //iconName : <slds:category:name>
    //iconName : <resource:namespace:resourceId> - manage Package
    Public static List<Date> dateUtils(List<IWrapper> inputs){
        //Date ,Operation(addDays), NumberOfDays
        Date outputDate;
        if(inputs!= null && inputs.size()>0){           
            IWrapper input = inputs.get(0);
            if(input.operationType=='addDays'){
                outputDate= input.inputDate.addDays(input.numberOfDays);
            }
            else if(input.operationType=='addMonths'){
                outputDate= input.inputDate.addMonths(input.numberOfMonths);
            }            
        }
        return new List<Date>{outputDate} ;       
            }
    public class IWrapper {
        @InvocableVariable(label='Provide the Date on which you want to perform Operation' 
                           description='Provide the Date on which you want to perform Operation' 
                           required=true)
        public Date inputDate;
        @InvocableVariable(label='Provide the Operation that you want to perform' 
                           description='The Valid operations are AddDays, addMonths addYears' 
                           required=true)
        public String operationType;
        @InvocableVariable(label='Number of Months' 
                           description='Number Of Months for the Operation' 
                           required=false)
        public Integer numberOfMonths;
        @InvocableVariable(label='Number of Days' 
                           description='Number Of Days for the Operation' 
                           required=false)
        public Integer numberOfDays;
    }
    Public static void dateUtils1(){
        StaticMethod.dateUtils();
       
    }    
}