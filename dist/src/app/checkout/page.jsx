"use strict";
'use client'; // Debe estar en la primera línea del archivo
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CheckoutPage;
var react_1 = require("react");
var Layout_1 = __importDefault(require("../components/Layout")); // Asegúrate de que la ruta sea correcta
function CheckoutPage() {
    (0, react_1.useEffect)(function () {
        var loadRedsysScript = function () {
            var script = document.createElement('script');
            script.src = "https://sis-t.redsys.es:25443/sis/NC/sandbox/redsysV3.js"; // Entorno de pruebas
            script.async = true;
            document.body.appendChild(script);
            script.onload = function () {
                var insiteJSON = {
                    id: "card-form",
                    fuc: "123456789", // Cambia este valor por tu FUC real
                    terminal: "1",
                    order: "ped4227", // Cambia esto por un valor único para cada pedido
                    estiloInsite: "inline"
                };
                // Accede a la función dentro de window
                if (window.getInSiteFormJSON) {
                    window.getInSiteFormJSON(insiteJSON);
                }
                else {
                    console.error("La función getInSiteFormJSON no está disponible");
                }
            };
        };
        loadRedsysScript();
    }, []);
    return (<Layout_1.default>
            <div className="container mx-auto py-20">
                <div id="card-form" className="border p-4 rounded-lg shadow-lg"></div>

                <input type="hidden" id="token"/>
                <input type="hidden" id="errorCode"/>

                <script>
                    {"\n                        function merchantValidationEjemplo(){\n                            return true;\n                        }\n\n                        window.addEventListener(\"message\", function receiveMessage(event) {\n                            storeIdOper(event, \"token\", \"errorCode\", merchantValidationEjemplo);\n                        });\n                    "}
                </script>
            </div>
        </Layout_1.default>);
}
