import prisma from "../prisma/prisma";

export const productRepository = {
  async getProduct(productId: number) {
    return await prisma.product.findUnique({ where: { id: productId } });
  },
};
