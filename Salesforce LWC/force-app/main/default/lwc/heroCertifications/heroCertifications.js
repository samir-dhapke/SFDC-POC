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
export default class HeroCertifications extends LightningElement {
    certificationData = [
        {
            id: 1,
            name: 'Salesforce Admin',
            date: '12/02/2023',
            certId: 1234,
            image: My_Resource + '/ExpericeCLoudImages/admin.png'
        },
        {
            id: 2,
            name: 'Platform Developer I',
            date: '14/04/2023',
            certId: 1745,
            image: My_Resource + '/ExpericeCLoudImages/pd1.jfif'
        },
        {
            id: 3,
            name: 'Platform Developer II',
            date: '22/05/2022',
            certId: 2234,
            image: My_Resource + '/ExpericeCLoudImages/pd2.png'
        },
        {
            id: 4,
            name: 'Service Cloud Consultant',
            date: '21/05/2023',
            certId: 2347,
            image: My_Resource + '/ExpericeCLoudImages/sc.jfif'
        },
    ]
}