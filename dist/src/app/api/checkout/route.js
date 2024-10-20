"use strict";
// src/app/api/checkout/route.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
exports.POST = POST;
var server_1 = require("next/server");
var axios_1 = __importDefault(require("axios")); // Importa axios para realizar solicitudes HTTP
function GET(req) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, server_1.NextResponse.json({ message: 'Checkout API funcionando' })];
        });
    });
}
function POST(req) {
    return __awaiter(this, void 0, void 0, function () {
        var data, paymentResult, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, req.json()];
                case 1:
                    data = _a.sent();
                    return [4 /*yield*/, processPayment(data)];
                case 2:
                    paymentResult = _a.sent();
                    return [2 /*return*/, server_1.NextResponse.json({ message: 'Pago procesado correctamente', paymentResult: paymentResult })];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error al procesar el pago:', error_1);
                    return [2 /*return*/, server_1.NextResponse.json({ error: 'Error al procesar el pago' }, { status: 500 })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Función que procesa el pago con Redsys
function processPayment(data) {
    return __awaiter(this, void 0, void 0, function () {
        var paymentEndpoint, body, response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    paymentEndpoint = 'https://sis-t.redsys.es:25443/sis/NC/sandbox';
                    body = {
                        fuc: "123456789", // Cambia esto por tu FUC real
                        terminal: "1",
                        order: data.order, // El order que envíes desde el cliente
                        amount: data.amount, // Monto del pago en céntimos
                        currency: "978", // 978 es el código para el euro
                        // Otros parámetros según lo que necesites enviar
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios_1.default.post(paymentEndpoint, body)];
                case 2:
                    response = _a.sent();
                    // Maneja la respuesta de Redsys
                    if (response.data) {
                        return [2 /*return*/, { status: 'success', data: response.data }];
                    }
                    else {
                        throw new Error('No se recibió respuesta válida de Redsys');
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error('Error al procesar el pago con Redsys:', error_2);
                    throw new Error('Error al procesar el pago');
                case 4: return [2 /*return*/];
            }
        });
    });
}
