import express, { Request, Response, NextFunction } from "express";
import path from "path";

const app = express();
const port = process.env.PORT || 3000;
const distDir = path.join(process.cwd(), "dist");

// Serve static assets from dist
app.use(express.static(distDir, { extensions: ["html"], index: false }));

// Serve index.html for known SPA routes
// If you add more static pages (e.g., /privacy), they will be found by static middleware above
app.get(["/", "/privacy", "/terms", "/cookies"], (_req: Request, res: Response) => {
  res.sendFile(path.join(distDir, "index.html"));
});

// 404 for everything else (real HTTP 404)
app.use((req: Request, res: Response) => {
  // Try to serve a custom 404 page if present in dist
  const custom404 = path.join(distDir, "404.html");
  res.status(404).sendFile(custom404, (err) => {
    if (err) {
      res.status(404).type("text/plain").send("404 Not Found");
    }
  });
});

// Basic error handler to ensure non-existent assets return 404
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  if (!res.headersSent) {
    res.status(500).type("text/plain").send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


