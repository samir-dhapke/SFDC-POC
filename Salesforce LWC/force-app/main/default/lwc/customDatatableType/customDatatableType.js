/**
 * @description       : 
 * @author            : Samir Dhapke
 * @group             : 
 * @last modified on  : 12-20-2023
 * @last modified by  : Samir Dhapke 
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   12-20-2023   Samir Dhapke   Initial Version
**/
import LightningDatatable from 'lightning/datatable';
import picklistColumn from './picklistColumn.html';
import pickliststatic from './pickliststatic.html'

export default class CustomDatatableType extends LightningDatatable {
    static customTypes = {
        picklistColumn: {
            template: pickliststatic,
            editTemplate: picklistColumn,
            standardCellLayout: true,
            typeAttributes: ['label', 'placeholder', 'options', 'value', 'context', 'variant', 'name']
        }
    };
}