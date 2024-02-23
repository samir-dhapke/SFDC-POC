// Use .apex files to store anonymous Apex.
// You can execute anonymous Apex in VS Code by selecting the
//     apex text and running the command:
//     SFDX: Execute Anonymous Apex with Currently Selected Text
// You can also execute the entire file by running the command:
//     SFDX: Execute Anonymous Apex with Editor Contents
for(List<Contact> conList :[Select Id,picture__c,Rank__c,Title from Contact where Title='']){
    for(Contact con:conList){
       con.picture__c='https://cdn.mygodimages.com/mygodimg/preview/mahendra-singh-dhoni-wallpapers-hd-11625659259y6phzjbwci.jpg';
        if(String.isBlank(con.Title)){
            con.Rank__c=3;
        }else{
            con.Rank__c=8;
        }
    }
    update conList;
}