
import * as vscode from 'vscode';
import Provider from './codelens_provider';
import { openPeekView } from './functions';
import { showQuickPick } from './post';
import { VirtualDocProvider } from './document_provider';

export async function activate(context: vscode.ExtensionContext) {
	vscode.window.onDidChangeActiveTextEditor(() => {
		console.log("editor change");
	});

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
		if (vscode.workspace.getConfiguration("exampleusageplz").get("exampleUsageCodeLens", false)){
			vscode.workspace.getConfiguration("exampleusageplz").update("exampleUsageCodeLens", true, true);
		}
		//codeLensProvider.startCodelens();
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


	
	context.subscriptions.push(codeLensProviderDisposable, openCodelensDisposable,
								codelensDisposable, quickPostDisposable, virtualDocContentProvider);

}

export function deactivate() {}
