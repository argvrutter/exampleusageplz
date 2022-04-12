// https://github.com/microsoft/vscode-extension-samples/blob/main/quickinput-sample/src/basicInput.ts

import { window, TextDocument, Range } from 'vscode';
import {UsageInstance } from './functions';
import Provider from './codelens_provider';
import Server from './server';
import { Post, usageInstanceToCall } from './interface';

/**
 * Show a quickInput box that presents a) a list of method invocations / usage instances
 * and then prompts for a title.
 * TODO: refactor to be multi stage (1) get usage instances, (2) get title, (3) submit
 */
export async function showQuickPick(provider: Provider) {
	const editor = window.activeTextEditor;
	const baseUrl = 'http://localhost:5000';

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
	// ensure title is not null
	if (title === undefined) {
		window.showErrorMessage('No title entered.');
		return;
	}
	
	// TODO: submit to server using postUsage
		// create a new post
	const post = {
		title: title,
		content: selectedText,
		call: usageInstanceToCall(usageInstance, lang)
	};

	// submit the post
	const server = new Server(baseUrl);
	const newPost = await server.submitPost(post);
	console.log(newPost);
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
