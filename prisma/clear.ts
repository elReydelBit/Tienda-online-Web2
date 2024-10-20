import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Borrar todos los elementos del carrito
    await prisma.cartItem.deleteMany({});
    console.log('Elementos del carrito borrados.');

    // Borrar todos los carritos
    await prisma.cart.deleteMany({});
    console.log('Carritos borrados.');

    // Borrar todos los productos
    await prisma.product.deleteMany({});
    console.log('Productos borrados.');

    // Borrar todos los usuarios
    await prisma.user.deleteMany({});
    console.log('Usuarios borrados.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
