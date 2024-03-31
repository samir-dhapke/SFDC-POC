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
import { NavigationMixin } from 'lightning/navigation';
export default class HeroQuickLinks extends NavigationMixin(LightningElement) {

    data = [
        {
            Id: 1,
            image: My_Resource + '/ExpericeCLoudImages/project1.jfif',
            text: 'Projects'
        },
        {
            Id: 2,
            image: My_Resource + '/ExpericeCLoudImages/Skills.png',
            text: 'Skills'
        },
        {
            Id: 3,
            image: My_Resource + '/ExpericeCLoudImages/Certificate.jfif',
            text: 'Certifications'
        }
    ];
    handleClick(event) {
        let selecetdCard = event.currentTarget.dataset.id;
        // console.log('selecetdCard==> ' + JSON.stringify(selecetdCard));
        if (selecetdCard == '1') {
            this.nevigateToPage('project__c');
        }
        else if (selecetdCard == '2') {
            this.nevigateToPage('skill__c');
        }
        else {
            this.nevigateToPage('certification__c');
        }
        nevigateToPage(pageApiName) {
            console.log('pageApiName==> ' + JSON.stringify(pageApiName));
            this[NavigationMixin.Navigate]({
                type: 'comm__namedPage',
                attributes: {
                    name: pageApiName
                },
            });
        }
    }