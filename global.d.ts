declare global {
    interface Window {
      ethereum: any;
    }
  
    namespace JSX {
      // prevents typescript errors for the tags
      interface IntrinsicElements {
        'x-utt-balance': any;
        'x-utu-app-link': any;
        'x-utu-wallet-disconnect': any;
        'x-utu-root': any;
        'x-utu-recommendation': any;
        'x-utu-feedback-details-popup': any;
        'x-utu-feedback-form-popup': any;
      }
    }
  }

  export {}
  