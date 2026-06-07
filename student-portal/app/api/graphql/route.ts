import { NextResponse } from "next/server";
import { buildSchema, graphql } from "graphql";
import { PrismaClient } from "../../../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const prisma: any = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL || "" }),
});

const schema = buildSchema(`
  type Student {
    id: Int!
    name: String!
    email: String!
    age: Int
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    students: [Student!]!
    student(id: Int!): Student
  }

  type Mutation {
    createStudent(name: String!, email: String!, age: Int): Student!
    updateStudent(id: Int!, name: String, email: String, age: Int): Student!
    deleteStudent(id: Int!): Boolean!
  }
`);

const root: any = {
  students: async () => {
    return prisma.student.findMany({ orderBy: { id: 'asc' } });
  },
  student: async ({ id }: { id: number }) => {
    return prisma.student.findUnique({ where: { id } });
  },
  createStudent: async ({ name, email, age }: any) => {
    return prisma.student.create({ data: { name, email, age } });
  },
  updateStudent: async ({ id, name, email, age }: any) => {
    const data: any = {};
    if (name !== undefined) data.name = name;
    if (email !== undefined) data.email = email;
    if (age !== undefined) data.age = age;
    return prisma.student.update({ where: { id }, data });
  },
  deleteStudent: async ({ id }: { id: number }) => {
    await prisma.student.delete({ where: { id } });
    return true;
  },
};

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const query = body.query || '';
  const variables = body.variables;

  const result = await graphql({ schema, source: query, variableValues: variables, rootValue: root });
  return NextResponse.json(result);
}

export async function GET() {
  return NextResponse.json({ message: 'GraphQL endpoint. Send POST requests with {query, variables}.' });
}
