// https://github.com/microsoft/vscode-extension-samples/blob/main/quickinput-sample/src/basicInput.ts

import { window, TextDocument, Range } from 'vscode';
import {UsageInstance } from './functions';
import Provider from './codelens_provider';

/**
 * Show a quickInput box that presents a) a list of method invocations / usage instances
 * and then prompts for a title.
 * TODO: refactor to be multi stage (1) get usage instances, (2) get title, (3) submit
 */
export async function showQuickPick(provider: Provider) {
	const editor = window.activeTextEditor;
	if (!editor) {
		return;
	}
	const selectedText = editor.document.getText(editor.selection);

	// call getUsageInRange
	const usageInstances = await getUsageInRange(editor.document, editor.selection, provider);
	if (usageInstances.length === 0) {
		window.showErrorMessage('No usage instances found in the selected range.');
		return;
	}

	const items = usageInstances.map(usageInstance => { 
		return `${usageInstance._line} ${usageInstance._name}`; 
	});
	
	const func = await window.showQuickPick(items, {
		placeHolder: 'Select a usage instance'
		// onDidSelectItem: item => window.showInformationMessage(`Focus ${item}`)
	});

	console.log(func);
	// get the corresponding usage instance (first token is line number,)
	const usageInstance = usageInstances.find(usageInstance => {
		return `${usageInstance._line} ${usageInstance._name}` === func;
	});
	// ensure usage instance is not null
	if (usageInstance === undefined) {
		window.showErrorMessage('No usage instance selected.');
		return;
	}

	console.log(usageInstance);

	// get language of editor as string
	const lang = editor.document.languageId;


	const title = await window.showInputBox({
		placeHolder: 'Enter a title'
	});
	console.log(title);
	
	// Create a new post
	const post = new Post(usageInstance, title, lang, selectedText);
	// TODO: submit to server using postUsage
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
	// public range: Range;
	public title: string;
	public language: string;
	public text: string;

	constructor(usageInstance: UsageInstance, title: string, language: string, text:string) {
		this.usageInstance = usageInstance;
		// this.range = range;
		this.title = title;
		this.language = language;
		this.text= text;
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