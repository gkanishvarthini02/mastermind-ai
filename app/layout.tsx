export const metadata = {
  title: 'MasterMind AI',
  description: 'UPSC & TNPSC Short Video Engine',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: "#020617" }}>
        {children}
      </body>
    </html>
  );
}
