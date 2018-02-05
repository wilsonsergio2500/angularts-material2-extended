// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBEMHcdDcZb_sZoEYwDlLLCrwmziOswp0o',
    authDomain: 'landmark-app-ng.firebaseapp.com',
    databaseURL: 'https://landmark-app-ng.firebaseio.com',
    projectId: 'landmark-app-ng',
    storageBucket: 'landmark-app-ng.appspot.com',
    messagingSenderId: '618726019370'
  }
};
