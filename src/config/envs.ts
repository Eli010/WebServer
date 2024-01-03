import 'dotenv/config';
import {get} from 'env-var';

//para usar nuestras variables de entorno
export const envs = {
    PORT: get('PORT').required().asPortNumber(),
    PUBLIC_PATH: get('PUBLIC_PATH').default('public').asString(),
}