import { LightningElement } from 'lwc';
import myResource2 from '@salesforce/resourceUrl/Image2';
import CONTENT_ASSET from "@salesforce/contentAssetUrl/My_Asset_Logo";

export default class StaticResources extends LightningElement {
    image2 = myResource2;
    image3 = CONTENT_ASSET;

}