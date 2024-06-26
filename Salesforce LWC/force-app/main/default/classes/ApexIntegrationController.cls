public class ApexIntegrationController {   
    @AuraEnabled
    Public static void sendOTP(string email,string emailOtp,string phone,string phoneOtp){
        string ACCESS_TOKEN;
        // Define the endpoint URL
        String endpoint = 'https://mck07w3zks39mllk47skrkhz4h94.auth.marketingcloudapis.com/v2/token';
        // Set up the request body
        String requestBody = 'grant_type=client_credentials' +
            '&client_id=atfs0menclh7gt5v62kpg8ol' +
            '&client_secret=S4EQqsVizYyJZKyAiCTdVNeK' +
            '&account_id=546004338';
        
        
        // Make the callout
        HttpRequest request = new HttpRequest();
        request.setEndpoint(endpoint);
        request.setMethod('POST');
        request.setHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.setBody(requestBody);
        
        // Send the request
        Http http = new Http();
        HttpResponse response = http.send(request);
        //System.debug('The status code returned  : '+response.getBody());
        
        // Parse JSON response to get Access token
        JSONParser jp = JSON.createParser(response.getBody());
        while (jp.nextToken() != null) {           
            if(jp.getText()=='access_token'){
                jp.nextToken();// go to the next token 
                ACCESS_TOKEN=jp.getText();
            }            
        }
        // system.debug('Access Token Is ==> '+ACCESS_TOKEN);
        // Set up the request body for Posting the Required Param
        String jsonData = '{"ContactKey":"' + email + '" ,"EventDefinitionKey": "APIEvent-a931512b-0f57-85bb-6004-fe0f46ad0b92", "Data": {"Phone Number": "' + phone + '", "Email":"' + email + '","Phone OTP":"' + phoneOtp + '","Email OTP":"' + emailOtp + '"}}';
        System.debug('The status code returned  : '+jsonData);
        //make callout to the marketing cloud
        makeCallout(ACCESS_TOKEN,jsonData);        
    }
    
    //make callout to the marketing cloud
    public static void makeCallout(String accessToken,String jsonData) {
        // Define the endpoint URL for the API you want to call
        String endpoint = 'https://mck07w3zks39mllk47skrkhz4h94.rest.marketingcloudapis.com/interaction/v1/events';
        
        // Make the callout
        HttpRequest request = new HttpRequest();
        request.setEndpoint(endpoint);
        request.setMethod('POST');
        request.setHeader('Content-Type', 'application/json'); // Set the content type to JSON
        request.setHeader('Authorization', 'Bearer ' + accessToken); // Include the access token in the Authorization header
        request.setBody(jsonData); // Set the JSON data in the request body
        
        // Send the request
        Http http = new Http();
        HttpResponse response = http.send(request);
        
        // Handle the response
        if (response.getStatusCode() == 200) {
            // Process the response here
            String responseBody = response.getBody();
            System.debug('Response Body: ' + responseBody);
        } 
        else if (response.getStatusCode() == 201) {
            // Resource created successfully
            System.debug('Resource created successfully. Response body: ' + response.getBody());
        }else {
            // Handle the error
            System.debug('Error: ' + response.getStatusCode() + ' ' + response.getStatus());
        }
    }
    
    @AuraEnabled
    Public static void createLead(leadWrapper lWrapper){
        system.debug('wrapper:'+lWrapper);
        if(lWrapper!=null){
            Lead ld= new lead();
            ld.firstName=lWrapper.FirstName;
            ld.LastName=lWrapper.LastName;
            ld.Email=lWrapper.Email;
            ld.Phone=lWrapper.Phone;
            ld.City=lWrapper.City;
            ld.Occupation__c=lWrapper.Occupation;
            ld.UG_Degree__c=lWrapper.ugDegree;
            ld.UG_Passout_Year__c=lWrapper.ugPassoutYear;
            ld.PG_Degree__c=lWrapper.pgDegree;
            ld.PG_Passout_Year__c=lWrapper.pgPassoutYear;
            ld.Company=lWrapper.companyName;
            ld.Designation__c=lWrapper.designation;
            ld.Years_Of_Experience__c=lWrapper.yearOfExp;
            ld.Description=lWrapper.addInfo;
             insert ld;
        }
       
    }
    
    public class leadWrapper{
        @AuraEnabled
        public string FirstName{get;set;}
        @AuraEnabled
        public string LastName{get;set;}
        @AuraEnabled
        public string Email{get;set;}
        @AuraEnabled
        public string Phone{get;set;}
        @AuraEnabled
        public string City{get;set;}
        @AuraEnabled
        public string Occupation{get;set;}
        @AuraEnabled
        public string ugDegree{get;set;}
        @AuraEnabled
        public integer ugPassoutYear{get;set;}
        @AuraEnabled
        public string pgDegree{get;set;}
        @AuraEnabled
        public integer pgPassoutYear{get;set;}
        @AuraEnabled
        public string companyName{get;set;}
        @AuraEnabled
        public string designation{get;set;}
        @AuraEnabled
        public integer yearOfExp{get;set;}
        @AuraEnabled
        public string addInfo{get;set;}
        
    }
}