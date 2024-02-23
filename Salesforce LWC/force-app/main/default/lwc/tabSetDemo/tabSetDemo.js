import { LightningElement } from 'lwc';
import footballPlayers from '@salesforce/resourceUrl/footballPlayers';
export default class TabSetDemo extends LightningElement {

    players = [
        {
            id: '1',
            header: 'ronaldo',
            src: footballPlayers + '/Static_Image/ronaldo.jpg',
            href: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwallpapers.com%2Fcristiano-ronaldo&psig=AOvVaw2v2ePqtZ4nckV0Xc6mCcs_&ust=1695005668349000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCIiyyqjSsIEDFQAAAAAdAAAAABAD',
            description: 'Ronaldo'

        },
        {
            id: '2',
            header: 'sunil',
            src: footballPlayers + '/Static_Image/sunil.jpg',
            href: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuO7m5yk7VsbD3dqURfk4fs7HjUSe_1wo3QY4jnfNw&s',
            description: 'Sunil'

        },
        {
            id: '3',
            header: 'messi',
            src: footballPlayers + '/Static_Image/download.jpg',
            href: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwallpapercave.com%2Fmessi-hd&psig=AOvVaw2p4GziO31_3uAIFSJipUJ8&ust=1695005540151000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCNDUx-vRsIEDFQAAAAAdAAAAABAD',
            description: 'Messi'

        }
    ]
}