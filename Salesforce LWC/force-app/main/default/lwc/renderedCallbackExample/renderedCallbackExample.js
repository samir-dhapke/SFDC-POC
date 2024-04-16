/**
 * @description       : 
 * @author            : Samir Dhapke
 * @group             : 
 * @last modified on  : 04-06-2024
 * @last modified by  : Samir Dhapke
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   04-06-2024   Samir Dhapke   Initial Version
**/
import { LightningElement, track } from 'lwc';

export default class RenderedCallbackExample extends LightningElement {
    cartCount = 0;
    showCart = false;

    handleAddToCart() {
        this.cartCount++;
        this.showCart = true;
    }
    // handleRemoveToCart() {
    //     this.cartCount--;
    //     //this.showCart = true;
    // }
    renderedCallback() {
        const cartCountElement = this.template.querySelector('.cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = this.cartCount;
        }
    }
}