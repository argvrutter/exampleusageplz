
import * as vscode from 'vscode';
import Provider from './codelens_provider';
import { openPeekView } from './functions';
import { showQuickPick } from './post';
import { VirtualDocProvider } from './document_provider';
import { Post, usageInstanceToCall } from './interface';
import Client from './client';
import console = require('console');

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

	// get all typescript files in the workspace not in the node_modules or dist folder

	const allFiles = await vscode.workspace.findFiles('**/*.ts', '**/node_modules/**');
	// filter out dist
	const files = allFiles.filter(f => !f.path.includes('dist'));
	const baseUrl = 'http://localhost:5000';
	const server = new Client(baseUrl);
	// open them all using map
	const openFiles = files.map(async (f) => {
		// vscode.window.showInformationMessage(`Opening ${file.path}`);
		console.log("opening file: ", f.path);
		await vscode.workspace.openTextDocument(f.path).then(
			async (document) => {
				await codeLensProvider.startCodelens(document);
				// get function calls
				const filemap = codeLensProvider.funcList.map(async (func) => {
					// get the function name
					const title = workspaceName + ": " + func._name;
					// get the text of the document 10 lines before and after the function call
					// construct range, accounting for beginning and end of document
					const range = new vscode.Range(
						new vscode.Position(Math.max(0, func._position.start.line - 10), 0),
						new vscode.Position(Math.min(document.lineCount - 1, func._position.end.line + 10), 0)
					);
							
					const text = await document.getText(range);
					const post = {
						title: title,
						content: text,
						call: usageInstanceToCall(func, document.languageId)
					};
					// post the post

					const newPost = await server.submitPost(post);
					console.log("new post: ", newPost);
				});
				await Promise.all(filemap);
			}
		);
	});

	context.subscriptions.push(codeLensProviderDisposable, openCodelensDisposable,
		codelensDisposable, quickPostDisposable, virtualDocContentProvider);
	
	await Promise.all(openFiles);
	console.log("ExampleUsage extension is now active!");
	// exit after done
	// vscode.commands.executeCommand("workbench.action.closeWindow");
}

export function deactivate() { }
