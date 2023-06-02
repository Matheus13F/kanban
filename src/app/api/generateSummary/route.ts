import { NextResponse } from "next/server";
import openai from "../../../../openai";

export async function POST(request: Request) {
  // todos in the body of the POST req
  const { todos } = await request.json();

  const response = await openai.createChatCompletion({
    model: "gpt-3",
    temperature: 0.8,
    n: 1,
    stream: false,
    messages: [
      {
        role: "system",
        content: `Enquanto respondendo, Diga bem vindo ao usuario sempre como Senhor Usuario. e diga Bem vindo ao Kanban do CodePeek! 
          Limite a resposta em 200 caracteres`,
      },
      {
        role: "user",
        content: `Ola, providencie um resumo das seguintes tarefas, conte quantos todos existem em cada categoria, como To Do, In progress e Done, entao diga
        ao usuario para ter um dia produtivo! Aqui estao os dados: ${JSON.stringify(
          todos
        )}`,
      },
    ],
  });

  const { data } = response;

  return NextResponse.json(data.choices[0].message);
}
