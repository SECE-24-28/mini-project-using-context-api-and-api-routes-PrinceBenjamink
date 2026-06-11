import { NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function GET() {
  return NextResponse.json(store.notes);
}

export async function POST(req: Request) {
  const { title, content } = await req.json();
  const note = { id: store.nextId++, title, content };
  store.notes.push(note);
  return NextResponse.json(note, { status: 201 });
}
