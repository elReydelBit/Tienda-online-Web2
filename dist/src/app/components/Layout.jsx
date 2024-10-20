"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Navbar_1 = __importDefault(require("./Navbar"));
var Footer_1 = __importDefault(require("./Footer"));
var Layout = function (_a) {
    var children = _a.children;
    return (<div className="min-h-screen flex flex-col">
      <Navbar_1.default /> {/* Aquí el navbar común a todas las páginas */}
      <main className="container mx-auto flex-grow p-6">{children}</main> {/* Aquí va el contenido específico de cada página */}
      <Footer_1.default /> {/* Aquí el footer común a todas las páginas */}
    </div>);
};
exports.default = Layout;
