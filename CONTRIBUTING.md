# How to set up your development environment?
- Create a fork of the repository and clone it
- Install local NPM packages with `npm install`
- Install dependencies with: `npm run-script dev-install`
If you get an error, make sure your global NPM packages are up-to-date. Update via npm update -g

- Run `tsc -p ./` to compile TS to JS
(Windows) If you get an error that -p is not a valid switch, make sure you are using the latest TSC.exe. You may need to change your path settings to point to the latest folder in C:\Program Files (x86)\Microsoft SDKs\TypeScript. If it points to 1.0, it won't work.

