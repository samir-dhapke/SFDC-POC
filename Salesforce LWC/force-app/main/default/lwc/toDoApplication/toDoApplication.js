import { createRecord, deleteRecord, updateRecord } from 'lightning/uiRecordApi';
import { LightningElement, track, wire } from 'lwc';
import TASK_MANAGER_OBJECT from '@salesforce/schema/Task_Manager__c';
import TASK_NAME_FIELD from '@salesforce/schema/Task_Manager__c.Name';
import TASK_DATE_FIELD from '@salesforce/schema/Task_Manager__c.Task_Date__c';
import ID_FIELD from '@salesforce/schema/Task_Manager__c.Id';
import IS_COMPLETED_FIELD from '@salesforce/schema/Task_Manager__c.Is_Completed__c';
import COMPLETED_DATE_FIELD from '@salesforce/schema/Task_Manager__c.Completed_Date__c';
import loadAllIncompleteRecords from '@salesforce/apex/toDoAppController.loadAllIncompleteRecords';
import loadAllCompleteRecords from '@salesforce/apex/toDoAppController.loadAllCompleteRecords';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ToDoApplication extends LightningElement {
    taskName = '';
    taskDate = null;
    @track incompletedTask = [];
    @track completedTask = [];
    incompletedTaskResult;
    completedTaskResult;

    @wire(loadAllIncompleteRecords)
    incompletedData(result) {
        this.incompletedTaskResult = result;
        let { data, error } = result;
        if (data) {
            // console.log('incompletedTaskArrey => ' + JSON.stringify(data));

            this.incompletedTask = data.map((currItem) => ({
                taskId: currItem.Id,
                taskName: currItem.Name,
                taskDate: currItem.Task_Date__c
            }));

        }
        else if (error) {
            this.toastEventFire('Error creating record', error.body.message, 'error');
        }
    }
    @wire(loadAllCompleteRecords)
    completedData(result) {
        this.completedTaskResult = result;
        let { data, error } = result;
        if (data) {
            //console.log('completedTaskArrey => ' + JSON.stringify(data));
            this.completedTask = data;
            this.completedTask = data.map((currItem) => ({
                taskId: currItem.Id,
                taskName: currItem.Name,
                taskDate: currItem.Task_Date__c,
                taskCompleteDate: currItem.Completed_Date__c
            }));

        }
        else if (error) {
            this.toastEventFire('Error creating record', error.body.message, 'error');
        }
    }
    changehandler(event) {
        let { name, value } = event.target;
        if (name === 'taskName') {
            this.taskName = value;

        }
        else if (name === 'taskDate') {
            this.taskDate = value;

        }
    }
    resetHandler() {
        this.taskName = '';
        this.taskDate = null;
    }
    addTaskHandler() {
        //if End date is misssing then populate today's date as End Date
        if (!this.taskDate) {
            this.taskDate = new Date().toISOString().slice(0, 10);//as salesforce org understand ISOString

        }

        if (this.validateTask()) {


            // this.incompletedTask = [...this.incompletedTask,
            // {
            //     taskName: this.taskName,
            //     taskDate: this.taskDate
            // }
            // ];
            // console.log('incompletedTaskArrey => ' + JSON.stringify(this.incompletedTask));
            // this.resetHandler();
            // let sortedArrey = this.sortTask(this.incompletedTask);
            // this.incompletedTask = [...sortedArrey];
            // console.log('this.incompletedTask => ', this.incompletedTask);
            let fields = {};
            // fields[COMPLETED_DATE_FIELD.fieldApiName] = ;
            fields[TASK_NAME_FIELD.fieldApiName] = this.taskName;
            fields[TASK_DATE_FIELD.fieldApiName] = this.taskDate;
            fields[IS_COMPLETED_FIELD.fieldApiName] = false;


            let recordInput = {
                apiName: TASK_MANAGER_OBJECT.objectApiName,
                fields: fields
            };
            //console.log('recordInput' + JSON.stringify(recordInput));
            // createRecord(recordInput).then((result) => {
            //     console.log('Result' + JSON.stringify(result));
            //     this.toastEventFire('Success', 'Task Is Created Successfully', 'success')
            // });

            createRecord(recordInput)
                .then((result) => {
                    // console.log('Result' + JSON.stringify(result));
                    refreshApex(this.incompletedTaskResult);
                    this.toastEventFire('Success', 'Task Is Created Successfully', 'success');
                })
                .catch((error) => {
                    // console.log('Result' + JSON.stringify(error));
                    this.toastEventFire('Error creating record', error.body.message, 'error');
                });

            this.resetHandler();
        }
    }

    validateTask() {
        let isValid = true;
        let element = this.template.querySelector('.taskName');
        // condition - 1: Check if Task is Empty
        // condition - 2: if task name is not empty then check duplicate
        if (!this.taskDate) {
            // condition - 1: Check if Task is Empty.
            isValid = false;
        }
        else {
            // condition - 02: if task name is not empty then check duplicate.
            //if find method , will find an item in arrey then it will return a task item if not found , it will return Undefined
            let taskItem = this.incompletedTask.find(
                (currItem) =>
                    currItem.taskName === this.taskName &&
                    currItem.taskDate === this.taskDate
            );
            if (taskItem) {
                isValid = false;
                //Sets a custom error message to be displayed when a form is submitted.
                element.setCustomValidity("Task is Already Available");
            }
        }

        if (isValid) {
            element.setCustomValidity("");
        }
        element.reportValidity();
        return isValid;
    }

    // sortTask(inputArr) {
    //     let sortedArrey = inputArr.sort((a, b) => {
    //         const dateA = new Date(a.taskDate);
    //         const dateB = new Date(b.taskDate);
    //         return dateA - dateB;
    //     });
    //     return sortedArrey;
    // }

    removalHandler(event) {
        // from incompete task arrey , remove the item
        let recordid = event.target.name;
        deleteRecord(recordid)
            .then(() => {

                refreshApex(this.incompletedTaskResult);
                this.toastEventFire('Success', 'Task Is Deleted Successfully', 'success');
            })
            .catch((error) => {
                this.toastEventFire('Error While Deleting record', error.body.message, 'error');
            });
        // this.incompletedTask.splice(index, 1);// remove one index value 
        // let sortedArrey = this.sortTask(this.incompletedTask);
        // this.incompletedTask = [...sortedArrey];
        // console.log('this.incompletedTask => ', this.incompletedTask);
    }
    completedTaskHandler(event) {
        //remove the entry from incomplete task item
        let recordId = event.target.name;
        console.log('recordId => ' + recordId);
        console.log('this.incompletedTaskResult => ' + JSON.stringify(this.incompletedTaskResult));
        this.refreshData(recordId, this.incompletedTaskResult.data.Task_Date__c);
    }

    dragStartHandler(event) {
        event.dataTransfer.setData("index", event.target.dataset.item);
    }

    allowDrag(event) {
        event.preventDefault();
    }

    dropElementHandler(event) {
        let index = event.dataTransfer.getData("index");
        this.refreshData(index);
    }

    async refreshData(recordId, taskDate) {

        let inputFields = {};
        inputFields[ID_FIELD.fieldApiName] = recordId;
        inputFields[TASK_DATE_FIELD.fieldApiName] = taskDate;
        inputFields[IS_COMPLETED_FIELD.fieldApiName] = true;
        inputFields[COMPLETED_DATE_FIELD.fieldApiName] = new Date().toISOString().slice(0, 10);
        let recordInput = {
            fields: inputFields
        };
        //console.log('recordInput=>' + JSON.stringify(recordInput));
        try {
            await updateRecord(recordInput);
            await refreshApex(this.incompletedTaskResult);
            await refreshApex(this.completedTaskResult);
            this.toastEventFire('Updated ', 'Task Is Completed Successfully', 'success');
        } catch (error) {
            //console.log('Update Operation Failed' + error);
            this.toastEventFire('Updated Failed ', 'Task Is not Completed Successfully', 'error');
        }

        // let removeItem = this.incompletedTask.splice(index, 1);
        // let sortedArrey = this.sortTask(this.incompletedTask);
        // this.incompletedTask = [...sortedArrey];
        // // add into the complete task item
        // this.completedTask = [...this.completedTask, removeItem[0]];
    }

    toastEventFire(title, msg, variant) {

        const toastEvent = new ShowToastEvent({
            title: title,
            message: msg,
            variant: variant,
            //mode:mode,
        });
        this.dispatchEvent(toastEvent);
    }
}