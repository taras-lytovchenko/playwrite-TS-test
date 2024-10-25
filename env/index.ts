import { cleanEnv, url, str } from 'envalid'

export const env = cleanEnv(process.env, {
    TALISA_US_URL: url(),
    TALISA_DE_URL: url(),
    EMAIL: str(),
    EMAIL_PAYPAL: str(),
    PASSWORD_PAYPAL: str(),
})