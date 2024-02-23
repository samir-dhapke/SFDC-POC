public class YellowMarker extends Marker {
    //In case of non parameterized constructor we dont need to write super()
     Public YellowMarker(String name){
        super(name);
         // when u are using parameterized constructor in Parent CLass then we have to use Super() 
         // in child class otherwise it will throw error 
    }
    Public void main(){
       super.markerName='Yellow';
        super.Write(); // go and check into the parent when we are using super.Write()
        Write(); // now it will check inside the child
        super.paint();
        // alwasy recomand to write with superkeyword bec we can identify the method is called from parent class.
    }
   // Method Overiding
    Public override void Write(){ 
        // if we want oaveride the same method in from parent and perform some other custom operation then we have to make that method virtual in parent and use override keyword in child.
        System.debug(markerName+ ' is Writing in Child');
    }
}