import { LightningElement, wire, track } from "lwc";
import getAllContacts from "@salesforce/apex/contactController.getAllContacts";
const COLS = [
    {
        label: "First Name",
        fieldName: "FirstName",
        editable: true,
        sortable: "true"
    },
    {
        label: "Last Name",
        fieldName: "LastName",
        editable: true,
        sortable: "true"
    },
    { label: "Phone", fieldName: "Phone", type: "phone", sortable: "true" },
    { label: "Email", fieldName: "Email", type: "email", sortable: "true" }
];
export default class ClientSideSortingDatatable extends LightningElement {


    @track columns = COLS;
    @track contacts;
    @track sortedBy;
    @track sortedDirection;

    @wire(getAllContacts)
    wiredContacts(result) {
        if (result.data) {
            this.contacts = result.data;
            this.error = undefined;
        } else if (result.error) {
            this.error = result.error;
            this.data = undefined;
            console.log("###Error : " + JSON.stringify(this.error));
        }
    }
    onSort(event) {
        this.sortedBy = event.detail.fieldName;
        this.sortedDirection = event.detail.sortDirection;
        this.sortData(this.sortedBy, this.sortedDirection);
    }

    sortData(fieldname, direction) {
        let parseData = JSON.parse(JSON.stringify(this.contacts));
        let keyValue = (a) => {
            return a[fieldname];
        };
        let isReverse = direction === "asc" ? 1 : -1;
        parseData.sort((x, y) => {
            x = keyValue(x) ? keyValue(x) : "";
            y = keyValue(y) ? keyValue(y) : "";
            return isReverse * ((x > y) - (y > x));
        });
        this.contacts = parseData;
    }
}