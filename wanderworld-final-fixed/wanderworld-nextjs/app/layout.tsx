
import "./globals.css";
export const metadata = { title: "游览世界 WanderWorld", description: "去你想去的地方，观你想观的世界" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="zh"><body>{children}</body></html>;
}
