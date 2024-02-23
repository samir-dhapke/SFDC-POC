import { LightningElement } from 'lwc';
import ToastContainer from 'lightning/toastContainer';
import Toast from 'lightning/toast';

export default class CloseActionToastLibrary extends LightningElement {
    connectedCallback() {
        const toastContainer = ToastContainer.instance();
        toastContainer.maxShown = 6;
        toastContainer.toastPosition = 'top-middle';
    }
    showError() {
        Toast.show(
            {
                label: 'Sample Toast Title at {0}',
                labelLinks: [
                    {
                        url: 'https://www.salesforcebolt.com',
                        label: 'Salesforce Bolt'
                    }
                ],
                message:
                    'Do like, share and subscribe on {0}. Follow the {1} for new updates.',
                messageLinks: [
                    {
                        url: 'https://www.youtube.com/SalesforceBolt',
                        label: 'YouTube'
                    },
                    {
                        url: 'https://www.salesforcebolt.com',
                        label: 'Blog'
                    }
                ],
                mode: 'sticky',
                variant: 'error',
                onclose: () => {
                    console.log('###Toast Close');
                }
            },
            this
        );
    }
    showWarning() {
        //Show Warning Toast
    }
    showSuccess() {
        //Show Success Toast

    }
    showInfo() {
        //Show Info Toast
    }
}