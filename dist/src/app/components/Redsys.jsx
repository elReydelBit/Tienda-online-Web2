"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Redsys = Redsys;
var react_1 = require("react");
var redsys_1 = require("@/lib/redsys");
var button_1 = require("@/app/components/ui/button");
var navigation_1 = require("next/navigation");
function Redsys(_a) {
    var amount = _a.amount, orderId = _a.orderId;
    var customerId = (0, navigation_1.useParams)().customerId;
    var _b = (0, react_1.useState)(null), redsys = _b[0], setRedsys = _b[1];
    var origin = window.location.origin;
    (0, react_1.useEffect)(function () {
        (0, redsys_1.getRedsysCheckout)(customerId, origin, amount, orderId).then(function (redsysData) {
            if (redsysData) {
                setRedsys(redsysData);
            }
        }).catch(function (error) {
            console.error("Error fetching Redsys data:", error);
        });
    }, [origin, amount, orderId, customerId]);
    if (!redsys) {
        return null; // or a loading indicator
    }
    // 4548810000000003
    // caducidad :12/29
    // codigo de seguridad: 123
    // http://localhost:3002/ok?orderId=26549
    // amount=19800
    // customerId=ALFKI
    // Ds_SignatureVersion=HMAC_SHA256_V1
    // Ds_MerchantParameters=eyJEc19EYXRlIjoiMTElMkYxMCUyRjIwMjQiLCJEc19Ib3VyIjoiMjMlM0EwMCIsIkRzX1NlY3VyZVBheW1lbnQiOiIxIiwiRHNfQW1vdW50IjoiMTk4MDAiLCJEc19DdXJyZW5jeSI6Ijk3OCIsIkRzX09yZGVyIjoiMjY1NDkiLCJEc19NZXJjaGFudENvZGUiOiI5OTkwMDg4ODEiLCJEc19UZXJtaW5hbCI6IjAwMSIsIkRzX1Jlc3BvbnNlIjoiMDAwMCIsIkRzX1RyYW5zYWN0aW9uVHlwZSI6IjAiLCJEc19NZXJjaGFudERhdGEiOiIiLCJEc19BdXRob3Jpc2F0aW9uQ29kZSI6IjIwMTQ5MiIsIkRzX0NhcmRfTnVtYmVyIjoiNDU0ODgxKioqKioqMDAwMyIsIkRzX0NvbnN1bWVyTGFuZ3VhZ2UiOiIxIiwiRHNfQ2FyZF9Db3VudHJ5IjoiNzI0IiwiRHNfQ2FyZF9CcmFuZCI6IjEiLCJEc19Qcm9jZXNzZWRQYXlNZXRob2QiOiI3OCIsIkRzX0VDSSI6IjA1IiwiRHNfUmVzcG9uc2VfRGVzY3JpcHRpb24iOiJPUEVSQUNJT04rQVVUT1JJWkFEQSIsIkRzX0NvbnRyb2xfMTcyODY4MDQxMjIxMSI6IjE3Mjg2ODA0MTIyMTEifQ%3D%3D
    // Ds_Signature=4NrnjYj_RPVr5K88gIM5xP09A2NBwAFMyws7vj9Wzrc%3D
    return (<form action={redsys.url} method="POST" name="from">
      <input type="hidden" name="Ds_SignatureVersion" value={redsys.signatureVersion}/>
      <input type="hidden" name="Ds_MerchantParameters" value={redsys.merchantParameters}/>
      <input type="hidden" name="Ds_Signature" value={redsys.signature}/>

      <button_1.Button variant="outline" className="bg-green-500 hover:bg-green-600 text-white" type="submit">
        <span>Pasarela de pago</span>
      </button_1.Button>
    </form>);
}
