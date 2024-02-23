public class SOSLDemoCLass {
    Public static void soslResult(){
       List<List<Sobject>> result =[FIND 'Salesforce' IN NAME FIELDS Returning Account (Id,Name)]; 
        system.debug('Sobject =>'+result);
    }
    //where Clause
    Public static void soslResult1(){
       List<List<Sobject>> result =[FIND 'Salesforce' IN ALL FIELDS Returning Account (Id,Name where name='Samir')]; 
        system.debug('Sobject =>'+result);
    }
    //search multiple text on multiple obj
    Public static void soslResult2(){
       List<List<Sobject>> result =[FIND '"Salesforce" OR "SF"' IN ALL FIELDS Returning 
                                    Account (Id,Name,Phone),Contact(Id,Name)]; 
        system.debug('Sobject =>'+result);
    }
    //WildCard 1) * --> search name start with Sal
     Public static void soslResult3(){
       List<List<Sobject>> result =[FIND 'Sal*' IN ALL FIELDS Returning 
                                    Account (Id,Name,Phone),Contact(Id,Name)]; 
        system.debug('Sobject =>'+result);
    }
    //WildCard 1) ? --> search based on charecter it could be anything a-z that record will search
     Public static void soslResult4(){
       List<List<Sobject>> result =[FIND 'Sale?force' IN ALL FIELDS Returning 
                                    Account (Id,Name,Phone),Contact(Id,Name)]; 
        system.debug('Sobject =>'+result);
    }
}