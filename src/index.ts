import "./module-alias";
import "reflect-metadata";
import dotenv from "dotenv";

dotenv.config();

// Load environment variables based on NODE_ENV
switch (process.env.NODE_ENV) {
  case 'production':
    dotenv.config({ path: '.env.production' });
    console.log("Connect to production environment");
    break;
  case 'development':
    dotenv.config({ path: '.env.development' });
    console.log("Connect to development environment");
    break;
  case 'stage':
    dotenv.config({ path: '.env.stage' });
    console.log("Connect to stage environment");
    break;
  default:
    console.log("Cannot connect to environment");
}

// Export the framework
export * from './framework';
export { default } from './framework';


  
  

