import { config as dotenvConfig } from 'dotenv';

// Load environment variables from .env.local file
dotenvConfig();

export const NEXT_PUBLIC_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const NEXT_PUBLIC_TICKET_SERVICE_URL = process.env.NEXT_PUBLIC_TICKET_SERVICE_URL;
export const NEXT_PUBLIC_INVOICE_SERVICE_URL = process.env.NEXT_PUBLIC_INVOICE_SERVICE_URL;
export const NEXT_PUBLIC_INVENTORY_SERVICE_URL = process.env.NEXT_PUBLIC_INVENTORY_SERVICE_URL;
export const NEXT_PUBLIC_REPORTING_SERVICE_URL = process.env.NEXT_PUBLIC_REPORTING_SERVICE_URL;
export const COGNITO_USER_POOL_ID = process.env.COGNITO_USER_POOL_ID;
export const COGNITO_CLIENT_ID = process.env.COGNITO_CLIENT_ID;
export const NEXT_PUBLIC_AUTH_URL = process.env.NEXT_PUBLIC_AUTH_URL;
export const NEXT_PUBLIC_AUTH_SERVICE_URL = process.env.NEXT_PUBLIC_AUTH_SERVICE_URL;
