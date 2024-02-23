public class StringUtils {
    @InvocableMethod(label='Convert a String into Arrey or vice-versa' 
                     description='Convert a String into Arrey or vice-versa' 
                     category='ConversionOfStringInvocableMethod'
                     iconName='slds:custom:custom57')
    Public static void stringUtils(List<IWrapper> inputs){
        if(inputs!= null && inputs.size()>0){           
            IWrapper input = inputs.get(0);
            String color ='Red,Yellow,Blue';
            List<String> colorList = color.split(',');
            //String.join 
            String joinList =String.join(colorList,':'); 
            // u can perform the operation this ways
        }
    }
    public class IWrapper {
        @InvocableVariable(label='Provide the String to convert it into Array' 
                           description='Provide the String to convert it into Array' 
                           required=false)//required=false to make it opetional make this false.
        public String inputString;
        @InvocableVariable(label='Provide the Operation that you want to perform' 
                           description='The Valid operations are convertString,convertArray' 
                           required=true)
        public String operationType;
        
        @InvocableVariable(label='Provide the List to convert it into String' 
                           description='Provide the List to convert it into String' 
                           required=false)//required=false to make it opetional make this false.
        public List<String> inputList;
        
        @InvocableVariable(label='Seperator Convert a String into Arrey or vice-versa' 
                           description='Seperator Convert a String into Arrey or vice-versa' 
                           required=false)//required=false to make it opetional make this false.
        public String seperator;
    }
}