import { config as dotenvConfig } from 'dotenv'

// Load environment variables from .env.local file
dotenvConfig()

export const NEXT_PUBLIC_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL
export const NEXTAUTH_URL = process.env.NEXTAUTH_URL
export const NEXT_PUBLIC_TICKET_SERVICE_URL = process.env.NEXT_PUBLIC_TICKET_SERVICE_URL
export const NEXT_PUBLIC_INVOICE_SERVICE_URL = process.env.NEXT_PUBLIC_INVOICE_SERVICE_URL
export const NEXT_PUBLIC_INVENTORY_SERVICE_URL = process.env.NEXT_PUBLIC_INVENTORY_SERVICE_URL
export const NEXT_PUBLIC_REPORTING_SERVICE_URL = process.env.NEXT_PUBLIC_REPORTING_SERVICE_URL
