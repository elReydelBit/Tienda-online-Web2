"use strict";
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
var client_1 = require("@prisma/client");
var bcrypt_1 = __importDefault(require("bcrypt"));
var prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var hashedPassword1, hashedPassword2, existingUser1, existingUser2, user1, user2, existingProducts, products, cart1, cartItems1, cart2, cartItems2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, bcrypt_1.default.hash('Contraseña123@', 10)];
                case 1:
                    hashedPassword1 = _a.sent();
                    return [4 /*yield*/, bcrypt_1.default.hash('Usuario456#', 10)];
                case 2:
                    hashedPassword2 = _a.sent();
                    return [4 /*yield*/, prisma.user.findUnique({
                            where: { email: 'usuario1@example.com' }
                        })];
                case 3:
                    existingUser1 = _a.sent();
                    return [4 /*yield*/, prisma.user.findUnique({
                            where: { email: 'usuario2@example.com' }
                        })];
                case 4:
                    existingUser2 = _a.sent();
                    if (!!existingUser1) return [3 /*break*/, 6];
                    return [4 /*yield*/, prisma.user.create({
                            data: {
                                email: 'usuario1@example.com',
                                name: 'usuario1',
                                password: hashedPassword1,
                            },
                        })];
                case 5:
                    user1 = _a.sent();
                    console.log('Usuario 1 creado:', user1);
                    _a.label = 6;
                case 6:
                    if (!!existingUser2) return [3 /*break*/, 8];
                    return [4 /*yield*/, prisma.user.create({
                            data: {
                                email: 'usuario2@example.com',
                                name: 'usuario2',
                                password: hashedPassword2,
                            },
                        })];
                case 7:
                    user2 = _a.sent();
                    console.log('Usuario 2 creado:', user2);
                    _a.label = 8;
                case 8: return [4 /*yield*/, prisma.product.findMany()];
                case 9:
                    existingProducts = _a.sent();
                    if (!(existingProducts.length === 0)) return [3 /*break*/, 11];
                    return [4 /*yield*/, prisma.product.createMany({
                            data: [
                                {
                                    name: 'Laptop Gaming Pro',
                                    description: 'Laptop gaming de alta gama con RTX 3080, 32GB RAM, 1TB SSD',
                                    price: 1299.99
                                },
                                {
                                    name: 'Smartphone X12',
                                    description: 'Smartphone último modelo con cámara 108MP y 256GB almacenamiento',
                                    price: 899.99
                                },
                                {
                                    name: 'Auriculares Inalámbricos',
                                    description: 'Auriculares bluetooth con cancelación de ruido activa',
                                    price: 199.99
                                },
                                {
                                    name: 'Monitor 4K Ultra',
                                    description: 'Monitor gaming 32" 4K 144Hz HDR',
                                    price: 499.99
                                },
                                {
                                    name: 'Teclado Mecánico RGB',
                                    description: 'Teclado mecánico para gaming con switches Cherry MX',
                                    price: 129.99
                                },
                                {
                                    name: 'Ratón Gaming Pro',
                                    description: 'Ratón gaming 16000 DPI con botones programables',
                                    price: 79.99
                                },
                                {
                                    name: 'Webcam HD Pro',
                                    description: 'Webcam 1080p con micrófono incorporado',
                                    price: 89.99
                                },
                                {
                                    name: 'SSD 1TB NVMe',
                                    description: 'Disco duro sólido NVMe con velocidades de hasta 7000MB/s',
                                    price: 149.99
                                },
                                {
                                    name: 'Tarjeta Gráfica RTX',
                                    description: 'GPU gaming de última generación con ray tracing',
                                    price: 799.99
                                },
                                {
                                    name: 'Hub USB-C',
                                    description: 'Hub multipuerto con HDMI, USB 3.0 y carga rápida',
                                    price: 49.99
                                },
                            ],
                        })];
                case 10:
                    products = _a.sent();
                    console.log("".concat(products.count, " productos creados."));
                    _a.label = 11;
                case 11:
                    if (!user1) return [3 /*break*/, 14];
                    return [4 /*yield*/, prisma.cart.create({
                            data: {
                                userId: user1.id,
                            },
                        })];
                case 12:
                    cart1 = _a.sent();
                    return [4 /*yield*/, prisma.cartItem.createMany({
                            data: [
                                { cartId: cart1.id, productId: 1, quantity: 1 },
                                { cartId: cart1.id, productId: 3, quantity: 2 },
                                { cartId: cart1.id, productId: 5, quantity: 1 },
                            ],
                        })];
                case 13:
                    cartItems1 = _a.sent();
                    console.log("Elementos del carrito creados para usuario1: ".concat(cartItems1.count));
                    _a.label = 14;
                case 14:
                    if (!user2) return [3 /*break*/, 17];
                    return [4 /*yield*/, prisma.cart.create({
                            data: {
                                userId: user2.id,
                            },
                        })];
                case 15:
                    cart2 = _a.sent();
                    return [4 /*yield*/, prisma.cartItem.createMany({
                            data: [
                                { cartId: cart2.id, productId: 2, quantity: 1 },
                                { cartId: cart2.id, productId: 4, quantity: 1 },
                                { cartId: cart2.id, productId: 6, quantity: 2 },
                            ],
                        })];
                case 16:
                    cartItems2 = _a.sent();
                    console.log("Elementos del carrito creados para usuario2: ".concat(cartItems2.count));
                    _a.label = 17;
                case 17: return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) {
    console.error(e);
    process.exit(1);
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
