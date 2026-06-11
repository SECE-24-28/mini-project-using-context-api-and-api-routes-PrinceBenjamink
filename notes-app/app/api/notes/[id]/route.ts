import { NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  store.notes = store.notes.filter((n) => n.id !== Number(id));
  return NextResponse.json({ message: "deleted" });
}
