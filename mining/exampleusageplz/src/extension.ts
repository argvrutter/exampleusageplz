
import * as vscode from 'vscode';
import Provider from './codelens_provider';
import { openPeekView } from './functions';
import { showQuickPick } from './post';
import { VirtualDocProvider } from './document_provider';
import { Post, usageInstanceToCall } from './interface';
import Client from './client';

export async function activate(context: vscode.ExtensionContext) {
	vscode.window.onDidChangeActiveTextEditor(() => {
		console.log("editor change");
	});

	const provider = new Provider();


	const codeLensProvider = new Provider();
	const virtDocProvider = new VirtualDocProvider();
	//const tree = new ExampleUsageTreeProvider();
	let codeLensProviderDisposable = vscode.languages.registerCodeLensProvider(
		"*",
		codeLensProvider
	);

	let virtualDocContentProvider = vscode.workspace.registerTextDocumentContentProvider(
		"exampleusageplz",
		virtDocProvider
	);
	
	let openCodelensDisposable = vscode.commands.registerCommand("exampleusageplz.getUsage", async () => {
		vscode.workspace.getConfiguration("exampleusageplz").update("exampleUsageCodeLens", true);
	});

	let stopCodelensDisposable = vscode.commands.registerCommand("exampleusageplz.stopUsage", async () => {
		vscode.workspace.getConfiguration("exampleusageplz").update("exampleUsageCodeLens", false);
	});

    let codelensDisposable = vscode.commands.registerCommand("exampleusageplz.addUsageInfo", (args: any) => {
		openPeekView(args);
    });

	// Add a command for quickly submitting a post
	// based on quickinput-sample: 
	// https://github.com/microsoft/vscode-extension-samples/blob/main/quickinput-sample/src/extension.ts
	let quickPostDisposable = vscode.commands.registerCommand("exampleusageplz.quickPost", async () => {
		const result = await showQuickPick(codeLensProvider);
		vscode.window.showInformationMessage(`Got: ${result}`);
	});

	// get the name of the current workspace
	const workspaceName = vscode.workspace.name;

	// get all typescript files in the workspace
	let allFiles = await vscode.workspace.findFiles('**/*.ts');
	
	const baseUrl = 'http://localhost:5000';
	// open them all
	for (let file of allFiles) {
		vscode.window.showInformationMessage(`Opening ${file.path}`);
		vscode.workspace.openTextDocument(file.path).then(
			(document) => {
				codeLensProvider.startCodelens();
				// get function calls
				codeLensProvider.funcList.forEach(async (func) => {
					// get the function name
					const title = workspaceName + ": " + func._name;
					// get the text of the document 10 lines before and after the function call
					const text = await document.getText(new vscode.Range(func._position.start.line - 10, 0, func._position.end.line + 10, 0));
					const post = {
						title: title,
						content: text,
						call: usageInstanceToCall(func, document.languageId)
					};
					// post the post
					
					const server = new Client(baseUrl);
					const newPost = await server.submitPost(post);
				});
			});
	}

	context.subscriptions.push(codeLensProviderDisposable, openCodelensDisposable,
								codelensDisposable, quickPostDisposable, virtualDocContentProvider);

}

export function deactivate() {}
