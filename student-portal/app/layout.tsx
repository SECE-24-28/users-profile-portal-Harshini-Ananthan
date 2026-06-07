export default function RootLayout({
  children,
}:{
  children: React.ReactNode;
})
 {
  return (
    <html>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
