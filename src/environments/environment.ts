// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyDpKv2ZSRCffWFSua8lgy2YLVwTSHo_tRE",
    authDomain: "sdi-visual-tools.firebaseapp.com",
    databaseURL: "https://sdi-visual-tools.firebaseio.com",
    projectId: "sdi-visual-tools",
    storageBucket: "sdi-visual-tools.appspot.com",
    messagingSenderId: "759960395397"
  }
};
