
import * as vscode from 'vscode';
import Provider from './codelens_provider';
import { openInUntitled } from './functions';
import { showQuickPick } from './post';
export async function activate(context: vscode.ExtensionContext) {
	const codeLensProvider = new Provider();
	//const tree = new ExampleUsageTreeProvider();
	let codeLensProviderDisposable = vscode.languages.registerCodeLensProvider(
		"*",
		codeLensProvider
	);
	
	let openCodelensDisposable = vscode.commands.registerCommand("exampleusageplz.getUsage", async () => {
		codeLensProvider.startCodelens();
	});

	// start codelens on opening a typescript file
	let openCodelensOnOpenDisposable = vscode.workspace.onDidOpenTextDocument(async (document) => {
		if (document.languageId === "typescript") {
			codeLensProvider.startCodelens(document);
		}
	});
	// update the codelens when the cursor moves
	let updateCodelensOnCursorMoveDisposable = vscode.window.onDidChangeTextEditorSelection(async (e) => {
		codeLensProvider.startCodelens(e.textEditor.document);
	});
	// update the codelens when interacting with the editor
	let updateCodelensOnEditorChangeDisposable = vscode.window.onDidChangeActiveTextEditor(async (e) => {
		codeLensProvider.startCodelens(e.document);
	});

    let codelensDisposable = vscode.commands.registerCommand("exampleusageplz.addUsageInfo", (args: any) => {
		openInUntitled('Test');
    });

	// Add a command for quickly submitting a post
	// based on quickinput-sample: 
	// https://github.com/microsoft/vscode-extension-samples/blob/main/quickinput-sample/src/extension.ts
	let quickPostDisposable = vscode.commands.registerCommand("exampleusageplz.quickPost", async () => {
		const result = await showQuickPick(codeLensProvider);
		vscode.window.showInformationMessage(`Got: ${result}`);
	});
	
	context.subscriptions.push(codeLensProviderDisposable, openCodelensDisposable,
								codelensDisposable, quickPostDisposable, openCodelensOnOpenDisposable);

}

export function deactivate() {}
