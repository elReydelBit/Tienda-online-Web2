'use client';

import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Script from 'next/script';

declare global {
    interface Window {
        getInSiteFormJSON: (config: any) => void;
        storeIdOper: (event: MessageEvent, tokenId: string, errorCodeId: string, merchantValidation: () => boolean) => void;
    }
}

export default function CheckoutPage() {
    const [orderId, setOrderId] = useState('');
    const [scriptLoaded, setScriptLoaded] = useState(false);
    const [formInitialized, setFormInitialized] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        console.log('CheckoutPage mounted');
        const newOrderId = `ped${Date.now()}`;
        setOrderId(newOrderId);
        console.log('Order ID set:', newOrderId);
    }, []);

    useEffect(() => {
        if (scriptLoaded && orderId) {
            console.log('Script loaded and order ID available, initializing form');
            initializeRedsysForm();
        }
    }, [scriptLoaded, orderId]);

    const initializeRedsysForm = () => {
        console.log('Attempting to initialize Redsys form');
        if (typeof window.getInSiteFormJSON === 'function') {
            const insiteJSON = {
                id: "card-form",
                fuc: "999008881",
                terminal: "1",
                order: orderId,
                amount: "1000",
                currency: "978",
                transactionType: "0",
                merchantName: "COMERCIO DE PRUEBA",
                merchantCode: "999008881",
                merchantURL: `${window.location.origin}/api/checkout`,
                successURL: `${window.location.origin}/success`,
                errorURL: `${window.location.origin}/error`,
                merchantData: "Datos del comerciante",
                estiloInsite: "inline"
            };

            console.log('insiteJSON:', insiteJSON);
            window.getInSiteFormJSON(insiteJSON);
            console.log('getInSiteFormJSON called');
            setFormInitialized(true);
        } else {
            console.error("La función getInSiteFormJSON no está disponible");
            setError("Error al inicializar el formulario de pago");
        }
    };

    const handleScriptLoad = () => {
        console.log('Redsys script loaded successfully');
        setScriptLoaded(true);
    };

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            console.log('Message received:', event);
            if (window.storeIdOper) {
                window.storeIdOper(event, "token", "errorCode", () => true);
            }
        };

        window.addEventListener("message", handleMessage);

        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, []);

    return (
        <Layout>
            <Script
                src="https://sis-t.redsys.es:25443/sis/NC/sandbox/redsysV3.js"
                onLoad={handleScriptLoad}
                onError={() => setError("Error al cargar el script de Redsys")}
                strategy="afterInteractive"
            />
            <div className="container mx-auto py-20">
                <h1 className="text-2xl font-bold mb-4">Checkout</h1>
                <div id="card-form" className="border p-4 rounded-lg shadow-lg min-h-[200px]">
                    {!scriptLoaded && <p>Cargando script de Redsys...</p>}
                    {scriptLoaded && !formInitialized && <p>Inicializando formulario de pago...</p>}
                    {error && <p className="text-red-500">{error}</p>}
                </div>
                <input type="hidden" id="token" />
                <input type="hidden" id="errorCode" />
                <div className="mt-4">
                    <p>Order ID: {orderId}</p>
                    <p>Script Loaded: {scriptLoaded ? 'Yes' : 'No'}</p>
                    <p>Form Initialized: {formInitialized ? 'Yes' : 'No'}</p>
                </div>
            </div>
        </Layout>
    );
}
