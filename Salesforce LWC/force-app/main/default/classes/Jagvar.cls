public class Jagvar implements IVehicle {
    //method Implementation
    //Database.Stateful --> does not have any method inside it so we can it as Marker method.
    Public void start(){
        System.debug('Start Mehtod');
    }
    Public void stop(){
         System.debug('Start Mehtod');
    }
    Public String changeGear(){
         System.debug('Change Gear');
         return '';
    }
    Public Boolean openDoor(String doorType){
        System.debug('Open Door');
        return true;
    }
}