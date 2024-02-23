public class CL_SER_DESER_ATTACTCHMENT {
    public void JSONAttachment_Dser(){
        //Step 1 - Pull/Retrive the Attachment
        Document D = [Select Id,name,body,folderId from Document where name='test1'];
        
        // ******Serialize the Attachment***** //
        // string jd1 = JSON.serialize(D); // Standard/Simple Serialization
        // In simple we can not choose which field we want to pass, the whole body is serializing
        // System.debug(jd1);
        
        System.JSONGenerator js = JSON.createGenerator(true);//Complex/Dynamic Serialization
        js.writeStartObject();
        js.writeBlobField('Attachment', D.body);// here we can change name of the file.
        js.writeEndObject();
        // can not transfer as blob so convert it into String
        String jd2 = js.getAsString();// only file name and file will go , not going Id,and original name of file.
        System.debug(jd2);
        
        // ******DeSerialize the Attachment******* //
        //Blob jdd1 = (Blob) JSON.deserialize(jd1, Blob.Class); // Standard/Simple DeSerialization
        //System.debug(jdd1);// throw error :-> System.StringException: Unrecognized base64 character: {
        // error throwing bec Attachment is a complex thing , that can not be done by simple Deserialization/Serialization
        
        
        System.JSONParser jp = JSON.createParser(jd2);//Complex/Dynamic DeSerialization
        While(jp.nextToken()!=null){
            if(jp.getText()=='Attachment'){
                jp.nextToken();
                Blob jdd2 = (blob) jp.getBlobValue();
                System.debug(jdd2);
                //Again insert Same image 
                Document doc = new Document();
                doc.Name='Life Cycle Hooks 2';
                doc.Body=jdd2;
                doc.FolderId=D.folderId;
                doc.IsPublic=Boolean.valueOf('true');
                doc.Type = 'png';
                insert doc;
                System.debug(doc.Id);
            }
        }
        
    }
}