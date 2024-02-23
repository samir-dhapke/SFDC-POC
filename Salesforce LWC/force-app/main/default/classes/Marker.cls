public Virtual class Marker {
	Public String markerName;
    Public Marker(String name){
       this.markerName=name; 
    }
    Public virtual void Write(){// in order to override the write method then we have to make this mathod virtual
        System.debug(markerName+ ' is Writing from Parent');
    }
     Protected void paint(){
        System.debug(markerName+ ' is painting');
    }
}