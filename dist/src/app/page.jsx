"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HomePage;
var link_1 = __importDefault(require("next/link"));
var Layout_1 = __importDefault(require("@/app/components/Layout")); // Asegúrate de tener el Layout importado correctamente
function HomePage() {
    return (<Layout_1.default>
            <div className="container mx-auto">
                {/* Imagen motivadora */}
                <div className="mb-8 relative w-full">
                    <img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDEwfHxzaG9wcGluZ3xlbnwwfHx8fDE2MzIzMTcyMjk&ixlib=rb-1.2.1&q=80&w=1080" alt="Imagen motivadora de compras" className="w-full h-80 object-cover rounded-lg shadow-lg"/>
                    <div className="absolute inset-0 bg-black bg-opacity-25 flex items-center justify-center">
                        <p className="text-white text-2xl font-semibold transition-all duration-300 hover:text-orange-500 hover:shadow-[0_4px_15px_rgba(255,255,255,0.9)] hover:-translate-y-2">
                            ¡Explora nuestras ofertas exclusivas!
                        </p>
                    </div>
                </div>

                {/* Opciones de productos y ofertas con efectos hover */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="bg-gray-200 p-6 rounded-lg shadow-lg hover:bg-gray-300 hover:shadow-xl transition-all transform hover:-translate-y-1">
                        <link_1.default href="/shop" className="text-xl font-semibold text-gray-700">
                            Ver Productos
                        </link_1.default>
                    </div>
                    <div className="bg-gray-200 p-6 rounded-lg shadow-lg hover:bg-gray-300 hover:shadow-xl transition-all transform hover:-translate-y-1">
                        <link_1.default href="/ofertas" className="text-xl font-semibold text-gray-700">
                            Ofertas Especiales
                        </link_1.default>
                    </div>
                </div>
            </div>
        </Layout_1.default>);
}
