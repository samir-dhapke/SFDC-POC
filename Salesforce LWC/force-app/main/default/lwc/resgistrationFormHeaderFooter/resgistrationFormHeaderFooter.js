/**
 * @description       : 
 * @author            : Samir Dhapke
 * @group             : 
 * @last modified on  : 03-11-2024
 * @last modified by  : Samir Dhapke
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   02-27-2024   Samir Dhapke   Initial Version
**/
import { LightningElement } from 'lwc';
import CILOGO from '@salesforce/resourceUrl/CILOGO';
import CILOGOSYMBOL from '@salesforce/resourceUrl/CILOGOSYMBOL';
export default class ResgistrationFormHeaderFooter extends LightningElement {
    ciLogo = CILOGO;
    cilogoSymbol = CILOGOSYMBOL;
}