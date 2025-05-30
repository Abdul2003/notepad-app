"use server"
import { PrismaClient } from "../app/generated/prisma/client";
const prisma = new PrismaClient();
export async function createData(title: string, content: string) {
  await prisma.note.create({
    data: {
      title: title,
      content: content,
    },
  });
}

export async function getData() 
{
     return prisma.note.findMany()
}

export async function updateData(id:number, data:object){

  await prisma.note.update({
  where: {
    id: id
  },
  data: data
})
}