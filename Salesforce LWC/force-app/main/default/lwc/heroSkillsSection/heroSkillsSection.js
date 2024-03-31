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
import { LightningElement, api } from 'lwc';
import My_Resource from '@salesforce/resourceUrl/HeroImages';
export default class HeroSkillsSection extends LightningElement {
    @api skillName;
    @api skillBarValue;
    @api skillName1;
    @api skillBarValue1;
    @api skillName2;
    @api skillBarValue2;
    @api skillName3;
    @api skillBarValue3;
    skillsImage = My_Resource + '/ExpericeCLoudImages/project2.webp';

}