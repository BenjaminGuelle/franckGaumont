const SITES_FOLDERS: string[] = ['admin-web', 'front-web']

export function copyItem(rootPath: string, targetName: string): void {
  const requestPath: string = `${rootPath}/${targetName}`;

  SITES_FOLDERS.forEach((folder: string): void => {
    const itemPath: string = folder === 'mobile' ? `./frontends/${folder}/shared/${targetName}` : `./frontends/${folder}/src/assets/${targetName}`;

    // copySync(requestPath, itemPath,
    //   filter: (src: string) => {
    //     prettyLog.log(src, 'blue');
    //     return !BLACKLISTED_FILES.some(blackListedItem => src.includes(blackListedItem));
    //   },
    // });

  });
}

function replaceTimestampContentAndRemoveImports(content: string): string {
  return content.replace(/import {\s?firestore\s?} from ['"]firebase-admin['"];\nimport Timestamp = firestore.Timestamp;/g, '')
    .replace(/import {\s?Timestamp\s?} from ['"](?:[\w.]+\/?)+?referential\/Timestamp.model['"];\n?/g, '')
    .replace(/import {\s?Timestamp\s?} from ['"]firebase-admin\/firestore['"];/g, '')
    .replace(/Timestamp\s?\|\s?number/g, 'number')
    .replace(/import 'firebase-functions\/logger\/compat';/g, '');
};