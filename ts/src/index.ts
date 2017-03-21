/**
 * Greets people!
 *
 * @param {string} name - The name of the person to greet
 * @param {number} delay - The delay before greeting
 * @returns {Promise<string>} - The greeting
 */
const greetPromise = (name: string, delay: number): Promise<string> => {
    return new Promise<string>((resolve: any): NodeJS.Timer => setTimeout(() => resolve(`hello ${name}`), delay));
};

const greetAsync = async (name: string): Promise<string> => {
    return await greetPromise(name, 2000);
};

greetAsync('lucas');

export default greetAsync;