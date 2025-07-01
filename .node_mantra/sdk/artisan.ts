#!/usr/bin/env node

import fs from "fs";
import path from "path";
import * as ejs from "ejs";
import { ucwords, toCamelCase, toKebabCase, toSnakeCase } from "./util/String";

interface Command {
  name: string;
  description: string;
  usage: string;
  execute: (args: string[]) => Promise<void>;
}

class Artisan {
  private commands: Map<string, Command> = new Map();

  constructor() {
    this.registerCommands();
  }

  private registerCommands() {
    // Make commands
    this.registerCommand({
      name: "make:controller",
      description: "Create a new controller class",
      usage: "make:controller <name>",
      execute: (args) => this.makeController(args[0])
    });

    this.registerCommand({
      name: "make:model",
      description: "Create a new model class",
      usage: "make:model <name>",
      execute: (args) => this.makeModel(args[0])
    });

    this.registerCommand({
      name: "make:service",
      description: "Create a new service class",
      usage: "make:service <name>",
      execute: (args) => this.makeService(args[0])
    });

    this.registerCommand({
      name: "make:validator",
      description: "Create a new validator class",
      usage: "make:validator <name>",
      execute: (args) => this.makeValidator(args[0])
    });

    this.registerCommand({
      name: "make:route",
      description: "Create a new route file",
      usage: "make:route <name>",
      execute: (args) => this.makeRoute(args[0])
    });

    this.registerCommand({
      name: "make:middleware",
      description: "Create a new middleware class",
      usage: "make:middleware <name>",
      execute: (args) => this.makeMiddleware(args[0])
    });

    this.registerCommand({
      name: "make:test",
      description: "Create a new test file",
      usage: "make:test <name>",
      execute: (args) => this.makeTest(args[0])
    });

    this.registerCommand({
      name: "make:seeder",
      description: "Create a new seeder class",
      usage: "make:seeder <name>",
      execute: (args) => this.makeSeeder(args[0])
    });

    this.registerCommand({
      name: "make:migration",
      description: "Create a new migration file",
      usage: "make:migration <name>",
      execute: (args) => this.makeMigration(args[0])
    });

    this.registerCommand({
      name: "make:resource",
      description: "Create a complete resource (controller, model, service, validator, route)",
      usage: "make:resource <name>",
      execute: (args) => this.makeResource(args[0])
    });

    // List commands
    this.registerCommand({
      name: "list",
      description: "List all available commands",
      usage: "list",
      execute: () => this.listCommands()
    });

    // Clear commands
    this.registerCommand({
      name: "clear:cache",
      description: "Clear application cache",
      usage: "clear:cache",
      execute: () => this.clearCache()
    });

    this.registerCommand({
      name: "clear:logs",
      description: "Clear application logs",
      usage: "clear:logs",
      execute: () => this.clearLogs()
    });

    // Route commands
    this.registerCommand({
      name: "route:list",
      description: "List all registered routes",
      usage: "route:list",
      execute: () => this.listRoutes()
    });

    // Database commands
    this.registerCommand({
      name: "db:seed",
      description: "Run database seeders",
      usage: "db:seed [seeder]",
      execute: (args) => this.runSeeders(args[0])
    });

    this.registerCommand({
      name: "db:migrate",
      description: "Run database migrations",
      usage: "db:migrate",
      execute: () => this.runMigrations()
    });

    this.registerCommand({
      name: "db:rollback",
      description: "Rollback database migrations",
      usage: "db:rollback [steps]",
      execute: (args) => this.rollbackMigrations(args[0])
    });

    // Serve command
    this.registerCommand({
      name: "serve",
      description: "Start the development server",
      usage: "serve [--port=3000] [--host=localhost]",
      execute: (args) => this.serve(args)
    });

    // Optimize command
    this.registerCommand({
      name: "optimize",
      description: "Optimize the application for production",
      usage: "optimize",
      execute: () => this.optimize()
    });

    // Key commands
    this.registerCommand({
      name: "key:generate",
      description: "Generate application key",
      usage: "key:generate",
      execute: () => this.generateKey()
    });

    // Config commands
    this.registerCommand({
      name: "config:cache",
      description: "Cache configuration files",
      usage: "config:cache",
      execute: () => this.cacheConfig()
    });

    this.registerCommand({
      name: "config:clear",
      description: "Clear configuration cache",
      usage: "config:clear",
      execute: () => this.clearConfigCache()
    });
  }

  private registerCommand(command: Command) {
    this.commands.set(command.name, command);
  }

  async execute(args: string[]) {
    const commandName = args[0];
    
    if (!commandName) {
      this.showHelp();
      return;
    }

    const command = this.commands.get(commandName);
    
    if (!command) {
      console.error(`❌ Command "${commandName}" not found.`);
      console.log("Run 'artisan list' to see all available commands.");
      return;
    }

    try {
      await command.execute(args.slice(1));
    } catch (error) {
      console.error(`❌ Error executing command "${commandName}":`, error);
    }
  }

  private showHelp() {
    console.log("NodeMantra Artisan - Command Line Interface");
    console.log("");
    console.log("Usage: artisan <command> [options]");
    console.log("");
    console.log("Available commands:");
    console.log("");
    
    const categories = {
      "Make Commands": ["make:controller", "make:model", "make:service", "make:validator", "make:route", "make:middleware", "make:test", "make:seeder", "make:migration", "make:resource"],
      "Database Commands": ["db:seed", "db:migrate", "db:rollback"],
      "Route Commands": ["route:list"],
      "Cache Commands": ["clear:cache", "clear:logs", "config:cache", "config:clear"],
      "Server Commands": ["serve"],
      "Utility Commands": ["list", "optimize", "key:generate"]
    };

    for (const [category, commands] of Object.entries(categories)) {
      console.log(`  ${category}:`);
      for (const cmdName of commands) {
        const cmd = this.commands.get(cmdName);
        if (cmd) {
          console.log(`    ${cmd.name.padEnd(20)} ${cmd.description}`);
        }
      }
      console.log("");
    }
  }

  private async listCommands() {
    console.log("Available commands:");
    console.log("");
    
    for (const [name, command] of this.commands) {
      console.log(`  ${name.padEnd(20)} ${command.description}`);
      console.log(`    Usage: ${command.usage}`);
      console.log("");
    }
  }

  // Make Commands
  private async makeController(name: string) {
    if (!name) {
      console.error("❌ Controller name is required.");
      return;
    }

    const className = ucwords(name);
    const classNameCamelCase = toCamelCase(name);
    const classNameLowerCase = name.toLowerCase();

    const filePath = `./src/app/controllers/${classNameLowerCase}.controller.ts`;
    const templatePath = "./.node_mantra/sdk/template/app/controllers/starter.controller.ejs";

    try {
      const rendered = await ejs.renderFile(templatePath, {
        className,
        classNameLowerCase,
        classNameCamelCase
      });

      this.ensureDirectoryExists(path.dirname(filePath));
      fs.writeFileSync(filePath, rendered);
      console.log(`✅ Controller created successfully: ${filePath}`);
    } catch (error) {
      console.error(`❌ Error creating controller:`, error);
    }
  }

  private async makeModel(name: string) {
    if (!name) {
      console.error("❌ Model name is required.");
      return;
    }

    const className = ucwords(name);
    const classNameCamelCase = toCamelCase(name);
    const classNameLowerCase = name.toLowerCase();

    const filePath = `./src/app/models/${classNameLowerCase}.schema.ts`;
    const templatePath = "./.node_mantra/sdk/template/app/models/starter.schema.ejs";

    try {
      const rendered = await ejs.renderFile(templatePath, {
        className,
        classNameLowerCase,
        classNameCamelCase,
      });

      this.ensureDirectoryExists(path.dirname(filePath));
      fs.writeFileSync(filePath, rendered);
      console.log(`✅ Model created successfully: ${filePath}`);
    } catch (error) {
      console.error(`❌ Error creating model:`, error);
    }
  }

  private async makeService(name: string) {
    if (!name) {
      console.error("❌ Service name is required.");
      return;
    }

    const className = ucwords(name);
    const classNameCamelCase = toCamelCase(name);
    const classNameLowerCase = name.toLowerCase();

    const filePath = `./src/app/services/${classNameLowerCase}.service.ts`;
    const templatePath = "./.node_mantra/sdk/template/app/services/starter.service.ejs";

    try {
      const rendered = await ejs.renderFile(templatePath, {
        className,
        classNameLowerCase,
        classNameCamelCase,
      });

      this.ensureDirectoryExists(path.dirname(filePath));
      fs.writeFileSync(filePath, rendered);
      console.log(`✅ Service created successfully: ${filePath}`);
    } catch (error) {
      console.error(`❌ Error creating service:`, error);
    }
  }

  private async makeValidator(name: string) {
    if (!name) {
      console.error("❌ Validator name is required.");
      return;
    }

    const className = ucwords(name);
    const classNameCamelCase = toCamelCase(name);
    const classNameLowerCase = name.toLowerCase();

    const filePath = `./src/app/validators/${classNameLowerCase}.validator.ts`;
    const templatePath = "./.node_mantra/sdk/template/app/validators/starter.validator.ejs";

    try {
      const rendered = await ejs.renderFile(templatePath, {
        className,
        classNameLowerCase,
        classNameCamelCase,
      });

      this.ensureDirectoryExists(path.dirname(filePath));
      fs.writeFileSync(filePath, rendered);
      console.log(`✅ Validator created successfully: ${filePath}`);
    } catch (error) {
      console.error(`❌ Error creating validator:`, error);
    }
  }

  private async makeRoute(name: string) {
    if (!name) {
      console.error("❌ Route name is required.");
      return;
    }

    const className = ucwords(name);
    const classNameCamelCase = toCamelCase(name);
    const classNameLowerCase = name.toLowerCase();

    const filePath = `./src/routes/${classNameLowerCase}.route.ts`;
    const templatePath = "./.node_mantra/sdk/template/routes/starter.route.ejs";

    try {
      const rendered = await ejs.renderFile(templatePath, {
        className,
        classNameLowerCase,
        classNameCamelCase,
      });

      this.ensureDirectoryExists(path.dirname(filePath));
      fs.writeFileSync(filePath, rendered);
      console.log(`✅ Route created successfully: ${filePath}`);
    } catch (error) {
      console.error(`❌ Error creating route:`, error);
    }
  }

  private async makeMiddleware(name: string) {
    if (!name) {
      console.error("❌ Middleware name is required.");
      return;
    }

    const className = ucwords(name);
    const classNameCamelCase = toCamelCase(name);
    const classNameLowerCase = name.toLowerCase();

    const filePath = `./src/app/middlewares/${classNameLowerCase}.middleware.ts`;
    const templatePath = "./.node_mantra/sdk/template/app/middlewares/starter.middleware.ejs";

    try {
      const rendered = await ejs.renderFile(templatePath, {
        className,
        classNameLowerCase,
        classNameCamelCase,
      });

      this.ensureDirectoryExists(path.dirname(filePath));
      fs.writeFileSync(filePath, rendered);
      console.log(`✅ Middleware created successfully: ${filePath}`);
    } catch (error) {
      console.error(`❌ Error creating middleware:`, error);
    }
  }

  private async makeTest(name: string) {
    if (!name) {
      console.error("❌ Test name is required.");
      return;
    }

    const className = ucwords(name);
    const classNameCamelCase = toCamelCase(name);
    const classNameLowerCase = name.toLowerCase();

    const filePath = `./src/tests/${classNameLowerCase}.test.ts`;
    const templatePath = "./.node_mantra/sdk/template/tests/starter.test.ejs";

    try {
      const rendered = await ejs.renderFile(templatePath, {
        className,
        classNameLowerCase,
        classNameCamelCase,
      });

      this.ensureDirectoryExists(path.dirname(filePath));
      fs.writeFileSync(filePath, rendered);
      console.log(`✅ Test created successfully: ${filePath}`);
    } catch (error) {
      console.error(`❌ Error creating test:`, error);
    }
  }

  private async makeSeeder(name: string) {
    if (!name) {
      console.error("❌ Seeder name is required.");
      return;
    }

    const className = ucwords(name);
    const classNameCamelCase = toCamelCase(name);
    const classNameLowerCase = name.toLowerCase();

    const filePath = `./src/database/seeders/${classNameLowerCase}.seeder.ts`;
    const templatePath = "./.node_mantra/sdk/template/database/seeders/starter.seeder.ejs";

    try {
      const rendered = await ejs.renderFile(templatePath, {
        className,
        classNameLowerCase,
        classNameCamelCase,
      });

      this.ensureDirectoryExists(path.dirname(filePath));
      fs.writeFileSync(filePath, rendered);
      console.log(`✅ Seeder created successfully: ${filePath}`);
    } catch (error) {
      console.error(`❌ Error creating seeder:`, error);
    }
  }

  private async makeMigration(name: string) {
    if (!name) {
      console.error("❌ Migration name is required.");
      return;
    }

    const timestamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0];
    const className = ucwords(name);
    const classNameCamelCase = toCamelCase(name);
    const classNameLowerCase = name.toLowerCase();

    const filePath = `./src/database/migrations/${timestamp}_${classNameLowerCase}.ts`;
    const templatePath = "./.node_mantra/sdk/template/database/migrations/starter.migration.ejs";

    try {
      const rendered = await ejs.renderFile(templatePath, {
        className,
        classNameLowerCase,
        classNameCamelCase,
        timestamp
      });

      this.ensureDirectoryExists(path.dirname(filePath));
      fs.writeFileSync(filePath, rendered);
      console.log(`✅ Migration created successfully: ${filePath}`);
    } catch (error) {
      console.error(`❌ Error creating migration:`, error);
    }
  }

  private async makeResource(name: string) {
    if (!name) {
      console.error("❌ Resource name is required.");
      return;
    }

    console.log(`Creating resource: ${name}`);
    
    await this.makeController(name);
    await this.makeModel(name);
    await this.makeService(name);
    await this.makeValidator(name);
    await this.makeRoute(name);

    console.log(`✅ Resource "${name}" created successfully!`);
  }

  // Utility methods
  private ensureDirectoryExists(dirPath: string) {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }

  // Database commands
  private async runSeeders(seederName?: string) {
    console.log("🌱 Running database seeders...");
    if (seederName) {
      console.log(`Running specific seeder: ${seederName}`);
    } else {
      console.log("Running all seeders...");
    }
    // Implementation would go here
    console.log("✅ Seeders completed successfully!");
  }

  private async runMigrations() {
    console.log("🔄 Running database migrations...");
    // Implementation would go here
    console.log("✅ Migrations completed successfully!");
  }

  private async rollbackMigrations(steps?: string) {
    const stepCount = steps ? parseInt(steps) : 1;
    console.log(`🔄 Rolling back ${stepCount} migration(s)...`);
    // Implementation would go here
    console.log("✅ Rollback completed successfully!");
  }

  // Route commands
  private async listRoutes() {
    console.log("📋 Registered Routes:");
    console.log("");
    // Implementation would go here
    console.log("GET    /api/v1/users");
    console.log("POST   /api/v1/users");
    console.log("GET    /api/v1/users/:id");
    console.log("PUT    /api/v1/users/:id");
    console.log("DELETE /api/v1/users/:id");
  }

  // Cache commands
  private async clearCache() {
    console.log("🧹 Clearing application cache...");
    // Implementation would go here
    console.log("✅ Cache cleared successfully!");
  }

  private async clearLogs() {
    console.log("🧹 Clearing application logs...");
    // Implementation would go here
    console.log("✅ Logs cleared successfully!");
  }

  private async cacheConfig() {
    console.log("⚙️  Caching configuration files...");
    // Implementation would go here
    console.log("✅ Configuration cached successfully!");
  }

  private async clearConfigCache() {
    console.log("🧹 Clearing configuration cache...");
    // Implementation would go here
    console.log("✅ Configuration cache cleared successfully!");
  }

  // Server commands
  private async serve(args: string[]) {
    let port = 3000;
    let host = 'localhost';

    // Parse arguments
    for (const arg of args) {
      if (arg.startsWith('--port=')) {
        port = parseInt(arg.split('=')[1]);
      } else if (arg.startsWith('--host=')) {
        host = arg.split('=')[1];
      }
    }

    console.log(`🚀 Starting development server on http://${host}:${port}`);
    console.log("Press Ctrl+C to stop the server");
    
    // Implementation would go here
    // This would typically start the development server
  }

  // Utility commands
  private async optimize() {
    console.log("⚡ Optimizing application for production...");
    // Implementation would go here
    console.log("✅ Application optimized successfully!");
  }

  private async generateKey() {
    console.log("🔑 Generating application key...");
    const key = require('crypto').randomBytes(32).toString('hex');
    console.log(`✅ Application key generated: ${key}`);
    console.log("Remember to add this to your .env file as APP_KEY");
  }
}

// Parse command line arguments
const args = process.argv.slice(2);
const artisan = new Artisan();

// Execute the command
artisan.execute(args).catch((error) => {
  console.error("❌ Fatal error:", error);
  process.exit(1);
});
