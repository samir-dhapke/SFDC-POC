/**
 * @description       : 
 * @author            : Samir Dhapke
 * @group             : 
 * @last modified on  : 03-15-2024
 * @last modified by  : Samir Dhapke
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   03-15-2024   Samir Dhapke   Initial Version
**/
import { LightningElement, api } from 'lwc';

export default class GenerateOTP extends LightningElement {
    @api otpLength;
    generatedOtpValue = "";
    @api timeDuration = 30;//seconds
    disabledButton = false;
    showTimer = false;
    textTimer = "";
    handleClick() {
        //Math.random() - greater than 0, less than 1
        //Math.floore - final integer Value
        //1. What should be the length Of OTP
        let otpArrey = [];
        for (let i = 0; i < this.otpLength; i++) {
            otpArrey.push(Math.floor(Math.random() * 10));
        }
        this.generatedOtpValue = otpArrey.join('');
        //this.generatedOtpValue = Math.floor(Math.random() * 10000000)

        //disabling the buttons and showing the Timer
        this.disabledButton = true;
        this.showTimer = true;

        //starting the countDown
        let secoundsRemaining = this.timeDuration;
        let countDownInterval = setInterval(() => {
            secoundsRemaining--;
            this.textTimer = `To Generate Next OTP Wait for ${secoundsRemaining} seconds.`;
            //if timer riches to 0 then enable the button and stopping the countDown
            if (secoundsRemaining <= 0) {
                clearInterval(countDownInterval);
                this.disabledButton = false;
                this.showTimer = false;
            }
        }, 1000);//1000ms = 1sec
    }
}