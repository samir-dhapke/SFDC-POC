public class WelcomeClass {
   /* @InvocableMethod(label='Display Welcome Message' description='This Method Will return a Welcome message' category='InvocableClass')
    Public static List<String> weclomeMessage(){
        // welcome message return typeof is String ->  then it should return List<String>
        // if List<String> -> List<List<String>>
        // if List<SObject> -> List<List<SObject>>
        // if List<Id> -> List<List<Id>>
        // It does not return Set or Map only return List
        // Smae things will be applicable for accepting the input from Flows.
        List<String> stringList = new List<String>();
        stringList.add('Welcome To The Salesforce Invocable Method');
        return stringList;
    }*/
     @InvocableMethod(label='Display Welcome Message' 
                      description='This Method Will return a Welcome message' 
                      category='InvocableClass'
                     iconName='slds:custom:custom80')
    Public static List<String> weclomeMessage(List<String> inputName){      
        // Same things will be applicable for accepting the input from Flows.
        // We can not pass multiple parameters to the invocable methods.
        String userName = inputName.get(0);
        List<String> stringList = new List<String>();
        stringList.add('Hi '+userName+', Welcome To The Salesforce Invocable Method');
        return stringList;
    }
}