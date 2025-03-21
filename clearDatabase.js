const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function clearDatabase() {
  try {
    console.log('Iniciando limpeza do banco de dados...');

    await prisma.payment.deleteMany();
    await prisma.rental.deleteMany();
    await prisma.locker.deleteMany();
    await prisma.sala.deleteMany();
    await prisma.corredor.deleteMany();
    await prisma.achado.deleteMany();

   

    console.log('Todos os dados foram apagados com sucesso!');


    await prisma.$executeRaw`ALTER TABLE Payment AUTO_INCREMENT = 1`;
    await prisma.$executeRaw`ALTER TABLE Rental AUTO_INCREMENT = 1`;
    await prisma.$executeRaw`ALTER TABLE Locker AUTO_INCREMENT = 1`;
    await prisma.$executeRaw`ALTER TABLE Sala AUTO_INCREMENT = 1`;
    await prisma.$executeRaw`ALTER TABLE Corredor AUTO_INCREMENT = 1`;
    await prisma.$executeRaw`ALTER TABLE Achado AUTO_INCREMENT = 1`;


    console.log('IDs resetados com sucesso!');
  } catch (error) {
    console.error('Erro ao apagar os dados:', error);
  } finally {
    await prisma.$disconnect();
  }
}

clearDatabase();
