import * as vscode from "vscode";
import * as path from "path";

// Get definition information
export async function getDefinitionInfo(pos: vscode.Position): Promise<string | undefined>{
    const editor = vscode.window.activeTextEditor;

    if (editor) {
        try {
          const referenceLocation = await vscode.commands.executeCommand('vscode.executeDefinitionProvider',
              editor.document.uri, 
              pos 
          )  as vscode.LocationLink[];

          if(referenceLocation.length > 0){
                let link = path.resolve(referenceLocation[0].targetUri.path);
                if(link.includes('node_modules')){
                    // TODO:: Get node package and return info
                    let r = "node_modules" + "\\"+ path.sep +"(.*?)\\" + path.sep;
                    let re = new RegExp(r);
                    return "Test Package"; // TODO:: return info
                }
          }
        } catch(e){
                if (typeof e === "string") {
                    console.log(e.toUpperCase()); 
                } else if (e instanceof Error) {
                    console.log(e.message); 
                }
            }
        }
        return undefined;
  }

// Opens document side by side view
export async function openInUntitled(content: string, language?: string) {

    const document = await vscode.workspace.openTextDocument({
        language,
        content,
    });
    vscode.window.showTextDocument(document, {
		viewColumn: vscode.ViewColumn.Beside
	});
	console.log(vscode.window.showTextDocument.toString());
}
