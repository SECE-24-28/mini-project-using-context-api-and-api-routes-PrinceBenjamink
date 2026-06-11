import { NotesProvider } from "@/context/NotesContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <NotesProvider>{children}</NotesProvider>
      </body>
    </html>
  );
}
