# Tasks manager

#### Task manager inspired in trello

## Getting Started

Clone the repo and perform an `pnpm install` or `npm install` in the base directory to install all the dependencies for the project.

You can run the web app by using the command `npm run dev` and opening Google Chrome to the specified localhost address (usually [http://localhost:3000/](http://localhost:3000/)).

## Preview

### Add task

<img src="https://user-images.githubusercontent.com/56488686/208325146-600f9023-7ead-49b4-bb42-3ff1ade056eb.png" width="400">

### Move task between status container

<img src="https://user-images.githubusercontent.com/56488686/208325333-0de42e0a-f699-42a8-b73c-c39d06386c37.png" width="400">

### Mobile design

<img src="https://user-images.githubusercontent.com/56488686/208325571-d7d79522-3939-4010-87b0-2d6594a4eca2.png" width="200" style="border-radius: 30px">

## Tools

- Redux to manage actions and local state.
- Local storage how database.
- dnd-kit to move task between status container.
- rxjs to emit subject to search task.
- Tailwind to design website
- MUI to utilities components
- Formik to manage forms

## Scripts

`npm run dev`\
Runs the web app locally on your system.

`npm run build`\
Builds the app to the `/dist`.

`npm run format`\
Formats all the files in the project using Prettier.

`npm run format-check`\
Checks that all the files in the project have been formatted using Prettier.

`npm run lint`\
Checks all the TypeScript/JavaScript code for lint errors.
