// src/app/types/global.d.ts
declare global {
    interface Window {
      getInSiteFormJSON: (config: any) => void;
      storeIdOper: (event: MessageEvent, tokenId: string, errorCodeId: string, merchantValidation: () => boolean) => void;
    }
  }
  
  export {};