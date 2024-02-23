import { LightningElement, api } from 'lwc';

export default class Map extends LightningElement {
    @api city;
    @api country;
    @api postalCode;
    @api state;
    @api street;
    @api title;
    @api description;


    mapMarkers;
    zoomLevel;
    listView;
    connectedCallback() {
        this.mapMarkers = [
            {
                location: {
                    City: this.city,
                    Country: this.country,
                    PostalCode: this.postalCode,
                    State: this.state,
                    Street: this.street,
                },
                title: this.title,
                description: this.description,
                icon: "standard:account",
            },

        ];
        //Google Maps API supports zoom levels from 1 to 22 in desktop browsers, and from 1 to 20 on mobile.
        this.zoomLevel = 10;
        this.listView = "visible";
    }
    get getMapValue() {
        if (this.city && this.country && this.postalCode && this.state && this.street) {
            return true;
        }
        else {
            return false;
        }
    }
}