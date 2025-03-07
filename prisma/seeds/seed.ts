import prismaClient from '../../src/prisma';
import createAdditional from './createAdditional';
import createAdm from './createAdm';
import createCompany from './createCompany';


async function main() {
  await createAdm()
  await createCompany()
  await createAdditional()
  console.log('Seeds criadas com sucesso!');
}
main()
  .then(async () => {
    await prismaClient.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prismaClient.$disconnect();
    process.exit(1);
  });

