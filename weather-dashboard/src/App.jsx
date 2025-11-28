import Dashboard from "./pages/Dashboard";
import { Analytics } from '@vercel/analytics/next';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Dashboard />
    </div>
  );
}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Next.js</title>
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}