import express from "express"
import { Router } from "express"
import { PrismaClient } from "@prisma/client"
import { create } from "domain"

const app = express()

app.listen(4000)

const router = Router()

const prisma = new PrismaClient()


const prismaTester = async () => {
    prisma.chapters.create({
        data: {
            name: 'Esquilo',
            book: {
                connectOrCreate: {
                    where: { title: 'Vida de cão'},
                    create: {title: 'Vida de gato'}
                }
            }
        }
    })
    return { fim: 'verificar db'}
}

const prismaTester2 = async () => {
    await prisma.pages.create({
        data: {
            book: {
                connectOrCreate: {
                    where: { title: 'Vida de cão'},
                    create: {title: 'Vida de gato'}
                }
            },
            chapter: {
                connectOrCreate: {
                    where: { name: 'Esquilo'},
                    create: { name: 'Esquilo', book:
                        connectOrCreate: {
                            where: { title: 'Vida de cão'},
                            create: {title: 'Vida de gato'}
                        }
                    }
                }
            }
        }
    })
}


