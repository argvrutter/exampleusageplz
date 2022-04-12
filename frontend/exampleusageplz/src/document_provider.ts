import * as vscode from 'vscode';

export class VirtualDocProvider implements vscode. TextDocumentContentProvider {
    provideTextDocumentContent(uri: vscode.Uri, token: vscode.CancellationToken): vscode.ProviderResult<string> {
        // TODO:: Load usage info from server
        return "exampleFunction(x, y) {\n\tx = y\n}";
    }
}


