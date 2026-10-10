# OneSpxc Studio — Dart Editor + Design Preview

Static site for GitHub Pages/Vercel. It lets you:
- open a `.dart` file and edit the source in the browser,
- download the edited Dart source,
- adjust the visual dashboard preview using design controls (text, cards, accent/background colors),
- refresh the HTML/CSS mockup.

## Deploy to Vercel
1. Extract this ZIP.
2. Upload the files (`index.html`, `style.css`, `script.js`, `vercel.json`) to the root of a GitHub repository.
3. Import the repository at https://vercel.com/ and deploy as **Other** with no build command.

## Important limitation
This static site does **not** compile or execute Dart/Flutter. Editing the Dart source will not automatically alter the visual preview. The visual preview can be edited through the quick design controls. To display the real rendered Flutter app, build a Flutter project with `flutter build web` and deploy the generated `build/web` folder. To compile arbitrary uploaded Dart source in the browser, an isolated build backend or a real Flutter web IDE/build service is required.
