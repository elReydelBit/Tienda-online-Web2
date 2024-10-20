import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    // Crear dos usuarios con contraseñas hasheadas
    const hashedPassword1 = await bcrypt.hash('Contraseña123@', 10);
    const hashedPassword2 = await bcrypt.hash('Usuario456#', 10);

    // Verificar si los usuarios ya existen
    const existingUser1 = await prisma.user.findUnique({
        where: { email: 'usuario1@example.com' }
    });

    const existingUser2 = await prisma.user.findUnique({
        where: { email: 'usuario2@example.com' }
    });

    let user1, user2;

    // Solo crear usuarios si no existen
    if (!existingUser1) {
        user1 = await prisma.user.create({
            data: {
                email: 'usuario1@example.com',
                name: 'usuario1',
                password: hashedPassword1,
            },
        });
        console.log('Usuario 1 creado:', user1);
    }

    if (!existingUser2) {
        user2 = await prisma.user.create({
            data: {
                email: 'usuario2@example.com',
                name: 'usuario2',
                password: hashedPassword2,
            },
        });
        console.log('Usuario 2 creado:', user2);
    }

    // Verificar si ya existen productos
    const existingProducts = await prisma.product.findMany();
    
    if (existingProducts.length === 0) {
        const products = await prisma.product.createMany({
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
        });
        console.log(`${products.count} productos creados.`);
    }

    // Crear carritos solo si se crearon usuarios nuevos
    if (user1) {
        const cart1 = await prisma.cart.create({
            data: {
                userId: user1.id,
            },
        });

        const cartItems1 = await prisma.cartItem.createMany({
            data: [
                { cartId: cart1.id, productId: 1, quantity: 1 },
                { cartId: cart1.id, productId: 3, quantity: 2 },
                { cartId: cart1.id, productId: 5, quantity: 1 },
            ],
        });
        console.log(`Elementos del carrito creados para usuario1: ${cartItems1.count}`);
    }

    if (user2) {
        const cart2 = await prisma.cart.create({
            data: {
                userId: user2.id,
            },
        });

        const cartItems2 = await prisma.cartItem.createMany({
            data: [
                { cartId: cart2.id, productId: 2, quantity: 1 },
                { cartId: cart2.id, productId: 4, quantity: 1 },
                { cartId: cart2.id, productId: 6, quantity: 2 },
            ],
        });
        console.log(`Elementos del carrito creados para usuario2: ${cartItems2.count}`);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });