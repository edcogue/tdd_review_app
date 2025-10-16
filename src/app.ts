import "reflect-metadata";
import express, { Application, Router } from "express";
import { ReviewRouter } from "./routes/reviewRoutes";
import { container } from "tsyringe";

export class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
  }

  private setupMiddleware(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private setupRoutes(): void {
    const reviewRouter = container.resolve(ReviewRouter);
    this.app.use("/api", reviewRouter.getRouter());
  }

  public listen(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }

  public getExpressApp(): Application {
    return this.app;
  }
}
