import { LightningElement, wire, track } from "lwc";
import getAllContacts from "@salesforce/apex/contactController.getAllContactsSorting";

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
export default class ServerSideSortingDatatable extends LightningElement {
    @track columns = COLS;
    @track contacts;
    @track sortedBy = "FirstName";
    @track sortedDirection = "asc";

    @wire(getAllContacts, { orderBy: "$sortedBy", direction: "$sortedDirection" })
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
    }
}