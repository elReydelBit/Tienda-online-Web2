import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Consultar usuarios
    const users = await prisma.user.findMany();
    console.log('Usuarios:', users);

    // Consultar productos
    const products = await prisma.product.findMany();
    console.log('Productos:', products);

    // Consultar carritos
    const carts = await prisma.cart.findMany();
    console.log('Carritos:', carts);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
