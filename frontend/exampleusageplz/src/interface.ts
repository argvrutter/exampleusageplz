/**
 * Structures for common datastructures used to interface with the server.
 * Should be used to serialize and deserialize data.
 */
import { Dependency, UsageInstance } from './functions';
/**
 * API interface.
 * required: 
 * name:string (max length: 100)
 * lang:string (max length: 10)
 * semver:string (max length: 10)
 * callees: list of call objects. many to one
 */
export interface Api {
    name: string;
    lang: string;
    semver?: string; // semver (validate?)
}

/**
 * Call interface.
 * required:
 * name:string (max length: 100)
 * api: api object. one to many (parent)
 */
export interface Call {
    name: string;
    api: Api;
}

/**
 * Post interface.
 * required columns are: title:string (max size: 100), content:string, language:string (max size: 10),
 * and a call instance.
 * optional columns are: semantic version:string (max size: 10), scope:string (max size: 100),
 */
export interface Post {
    title: string;
    content: string;
    call: Call;
    scope?: string;
}
/**
 * Convert Dependency instance to a API instance.
 * @param dependency
 * 
 */
export function dependencyToApi(dependency: Dependency, language: string): Api {
    return {
        name: dependency._module,
        lang: language,// dependency._language,
        semver: dependency._version
    };
}

/**
 * Convert usageInstance to a Call instance.
 */
export function usageInstanceToCall(usageInstance: UsageInstance, language: string): Call {
    return {
        name: usageInstance._name,
        api: dependencyToApi(usageInstance._package, language)
    };
}

/**
 * Validator for API.
 */
export function validateApi(api: Api): boolean {
    return api.name.length <= 100 && api.lang.length <= 10 && api.semver.length <= 10;
}

// TODO: validators for post and call
