/**
 * Wrapper function to interface with the server. Mostly CRUD operations.
 */
// import stuff to make requests

import axios from 'axios';
// import { AxiosResponse } from 'axios';
// import URI class
import {Post, Call, Api} from './interface';

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

export default class Client{

    // base url for the server
    private _baseUrl : string;
    // _token for authentication
    private _token? : string;

    // constructor
    // TODO: accept url as URI
    // token is optional
    constructor(baseUrl : string, token? : string) {
        this._baseUrl = baseUrl;
    
        // set the token
        if (token) {
            this._token = token;
        }
    }

    // get a list of posts matching a Call
    public async getPostsByCall(call : Call) : Promise<Post[] | undefined> {
        // get the list of posts
        // TODO: update to specify API info
        let response = await axios.get(this._baseUrl + '/api/calls/search', { params: {name: call.full_name} });
        console.log(response.data);
        // if no results, return undefined
        if (response.data.length === 0) {
            return undefined;
        }
        return response.data[0].posts;
    }

    // submit a new post
    public async submitPost(post : Post) : Promise<Post> {
        // create the post
        let response = await axios.post(this._baseUrl + '/api/posts', post);
        // return the post
        return response.data;
    }

}
