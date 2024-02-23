public Interface IVehicle {
    //Method Declaration
    //Public IVehicle(); --> we can not create constructor of any Interface and Can not create Object of Interface.
    void start();
    void stop();
    String changeGear();
    Boolean openDoor(String doorType);
}