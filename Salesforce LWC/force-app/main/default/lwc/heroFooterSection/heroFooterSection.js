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
export default class HeroFooterSection extends LightningElement {

    ytLogo = My_Resource + '/ExpericeCLoudImages/yt.png';
    linkedInLogo = My_Resource + '/ExpericeCLoudImages/linkedin.png';
    ciLogo = My_Resource + '/ExpericeCLoudImages/ci.jpg';
}