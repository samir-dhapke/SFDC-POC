/**
 * @description       : 
 * @author            : Samir Dhapke
 * @group             : 
 * @last modified on  : 12-20-2023
 * @last modified by  : Samir Dhapke
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   12-17-2023   Samir Dhapke   Initial Version
**/
import { LightningElement } from 'lwc';
import customNameTemplate from './customName.html';
import customRankTemplate from './customRank.html';
import customImageTemplate from './customImage.html';
import LightningDatatable from "lightning/datatable";
import picklistColumn from './picklistColumn.html';// another Component

export default class CustomDataType extends LightningDatatable {
    static customTypes = {
        customName: {
            template: customNameTemplate,
            standardCellLayout: true,
            typeAttributes: ["contactName"],
        },
        customRank: {
            template: customRankTemplate,
            standardCellLayout: false,
            typeAttributes: ["rankIcon"],
        },
        customPicture: {
            template: customImageTemplate,
            standardCellLayout: true,
            typeAttributes: ["pictureUrl"],
        },
        picklistColumn: {// another Component
            template: picklistColumn,
            standardCellLayout: true,
            typeAttributes: ['label', 'placeholder', 'options', 'value']
        }
    };
}