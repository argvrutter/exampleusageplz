// https://github.com/microsoft/vscode-extension-samples/blob/main/quickinput-sample/src/basicInput.ts

import { window, TextDocument, Range } from 'vscode';
import {UsageInstance } from './functions';
import Provider from './codelens_provider';

/**
 * Show a quickInput box that presents a) a list of method invocations / usage instances
 * and then prompts for a title.
 * TODO: refactor to be multi stage (1) get usage instances, (2) get title, (3) submit
 */
export async function showQuickPick(usageInstances : UsageInstance[]) {
	const items = usageInstances.map(usageInstance => { 
		return `${usageInstance._line} ${usageInstance._name}`; });
			
	const result = await window.showQuickPick(items, {
		placeHolder: 'Select a usage instance',
		onDidSelectItem: item => window.showInformationMessage(`Focus ${item}`)
	});
	window.showInformationMessage(`Got: ${result}`);
}

/**
 * Use an instance of codelens provider to retrieve usage instances in a given range of a document.
 * @param document The document to retrieve usage instances from.
 * @param range The range of the document to retrieve usage instances from.
 * @param provider The codelens provider to use to retrieve usage instances.
 */
export async function getUsageInRange(document: TextDocument, range: Range, provider: Provider) {
	// functions should be located in _provider._funcList
	console.log(provider.funcList);
	// filter to only those in the range
	return provider.funcList.filter(usageInstance => {
		return range.contains(usageInstance._position);
	});
}

/**
 * Datastructure for Post. Will be serialized and posted to the server.
 * Contains relevant UsageInstance, range in document, title, language.
 * 
 */
export class Post {
	public usageInstance!: UsageInstance;
	public range: Range;
	public title: string;
	public language: string;
	
	constructor(usageInstance: UsageInstance, range: Range, title: string, language: string) {
		this.usageInstance = usageInstance;
		this.range = range;
		this.title = title;
		this.language = language;
	}
}

/**
 * Post a usage instance to the server.
 * @param post The post to post.
 * @param server The server to post to.
 * @param token The token to use for authentication.
 */
export async function postUsage(post: Post, server: string, token: string) {
	// TODO - this is a stub
}