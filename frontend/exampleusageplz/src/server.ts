/**
 * Wrapper function to interface with the server. Mostly CRUD operations.
 */
// import stuff to make requests

import axios from 'axios';
// import { AxiosResponse } from 'axios';
// import URI class

/** 
 * 
* GET: /api/apis - returns all apis
* GET: /api/apis/</id/> - returns a single api
* GET: /api/apis/</id/>/calls - returns all calls for an api
* GET: /api/apis/search/<query> - returns all apis that match the query. Can be a list of comma separated values
* GET: /api/apis/</id/>/calls/search/<query> - returns all calls that match the query. 
* POST: /api/apis - creates a new api
* PUT: /api/apis/</id/> - updates an api
* DELETE: /api/apis/</id/> - deletes an api
*/

/**
 * This will primarily use the search endpoint to get a list of posts matching a query
 * The query includes the package name, a list of calls
 */



// URL for the server
export class Server {

    // token for authentication
    private token : string;
    // base url for the server
    private baseUrl : string;

    // constructor: accepts a token, which will be used to authenticate requests
    // and a base url, which will be used to make requests
    constructor(token : string, baseUrl : string) {
        this.token = token;
        this.baseUrl = baseUrl;
    }

}
