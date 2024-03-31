/**
 * @description       : 
 * @author            : Samir Dhapke
 * @group             : 
 * @last modified on  : 03-31-2024
 * @last modified by  : Samir Dhapke
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   03-31-2024   Samir Dhapke   Initial Version
**/
import { LightningElement } from 'lwc';
import My_Resource from '@salesforce/resourceUrl/HeroImages';
export default class HeroProjectSection extends LightningElement {

    hero3 = My_Resource + '/ExpericeCLoudImages/Project3.jpg';

    projectData = [
        {
            id: '1',
            name: 'Customer Portal',
            description: 'Self Service portal built in Salesforce Experience cloud using custom LWC, Apex logic for Case Management, Product training, live agent Support.',
            technology: 'Salesforce, LWC, Apex, Apex Trigger, Integration, Experience Cloud',
            website: 'www.cloudintellect.in'
        },
        {
            id: '2',
            name: 'Portfollio',
            description: 'Portfollio website built in Salesforce LWR Experience site using custom LWR with Mobile responsiveness',
            technology: 'Salesforce, LWC, Apex, Experience Cloud',
            website: 'www.cloudintellect.in'
        }
    ]
}