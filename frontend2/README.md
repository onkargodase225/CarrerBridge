# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
























(base) PS C:\Users\Onkar Godase\OneDrive\Desktop\job portal> cd frontend
(base) PS C:\Users\Onkar Godase\OneDrive\Desktop\job portal\frontend> npm create vite@latest

> npx
> create-vite

│
◇  Project name:
│  .
│
◇  Select a framework:
│  React
│
◇  Select a variant:
│  JavaScript
│
◇  Scaffolding project in C:\Users\Onkar Godase\OneDrive\Desktop\job portal\frontend...
│
└  Done. Now run:

  npm install
  npm run dev

(base) PS C:\Users\Onkar Godase\OneDrive\Desktop\job portal\frontend>
 npm install           
npm warn EBADENGINE Unsupported engine {
npm warn EBADENGINE   package: 'vite@7.0.0',
npm warn EBADENGINE   required: { node: '^20.19.0 || >=22.12.0' },   
npm warn EBADENGINE   current: { node: 'v22.11.0', npm: '10.9.0' }   
npm warn EBADENGINE }

up to date, audited 155 packages in 3s

33 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
(base) PS C:\Users\Onkar Godase\OneDrive\Desktop\job portal\frontend>
 npm install tailwindcss @tailwindcss/vite --legacy-peer-deps
>>
npm warn EBADENGINE Unsupported engine {
npm warn EBADENGINE   package: 'vite@7.0.0',
npm warn EBADENGINE   required: { node: '^20.19.0 || >=22.12.0' },   
npm warn EBADENGINE   current: { node: 'v22.11.0', npm: '10.9.0' }   
npm warn EBADENGINE }

added 20 packages, and audited 175 packages in 14s

36 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
(base) PS C:\Users\Onkar Godase\OneDrive\Desktop\job portal\frontend>
 npx tailwindcss init -p
>>
npm error could not determine executable to run
npm error A complete log of this run can be found in: C:\Users\Onkar Godase\AppData\Local\npm-cache\_logs\2025-06-26T09_05_07_561Z-debug-0.log
(base) PS C:\Users\Onkar Godase\OneDrive\Desktop\job portal\frontend>
 npx --yes tailwindcss init -p
>>
npm error could not determine executable to run
npm error A complete log of this run can be found in: C:\Users\Onkar Godase\AppData\Local\npm-cache\_logs\2025-06-26T09_05_17_501Z-debug-0.log
(base) PS C:\Users\Onkar Godase\OneDrive\Desktop\job portal\frontend>
 npm install -D @types/node
npm error code ERESOLVE
npm error ERESOLVE could not resolve
npm error
npm error While resolving: @tailwindcss/vite@4.1.10
npm error Found: vite@7.0.0
npm error node_modules/vite
npm error   peer vite@"^4.2.0 || ^5.0.0 || ^6.0.0 || ^7.0.0-beta.0" from @vitejs/plugin-react@4.6.0
npm error   node_modules/@vitejs/plugin-react
npm error     dev @vitejs/plugin-react@"^4.5.2" from the root project
npm error   dev vite@"^7.0.0" from the root project
npm error
npm error Could not resolve dependency:
npm error peer vite@"^5.2.0 || ^6" from @tailwindcss/vite@4.1.10     
npm error node_modules/@tailwindcss/vite
npm error   @tailwindcss/vite@"^4.1.10" from the root project        
npm error
npm error Conflicting peer dependency: vite@6.3.5
npm error node_modules/vite
npm error   peer vite@"^5.2.0 || ^6" from @tailwindcss/vite@4.1.10   
npm error   node_modules/@tailwindcss/vite
npm error     @tailwindcss/vite@"^4.1.10" from the root project      
npm error
npm error Fix the upstream dependency conflict, or retry
npm error this command with --force or --legacy-peer-deps
npm error to accept an incorrect (and potentially broken) dependency resolution.
npm error
npm error
npm error For a full report see:
npm error C:\Users\Onkar Godase\AppData\Local\npm-cache\_logs\2025-06-26T09_11_20_174Z-eresolve-report.txt
npm error A complete log of this run can be found in: C:\Users\Onkar Godase\AppData\Local\npm-cache\_logs\2025-06-26T09_11_20_174Z-debug-0.log
(base) PS C:\Users\Onkar Godase\OneDrive\Desktop\job portal\frontend>
 npm install vite@6 @vitejs/plugin-react
>>
npm warn cleanup Failed to remove some directories [
npm warn cleanup   [
npm warn cleanup     'C:\\Users\\Onkar Godase\\OneDrive\\Desktop\\job portal\\frontend\\node_modules\\@esbuild\\linux-s390x',
npm warn cleanup     [Error: EBUSY: resource busy or locked, rmdir 'C:\Users\Onkar Godase\OneDrive\Desktop\job portal\frontend\node_modules\@esbuild\linux-s390x'] {
npm warn cleanup       errno: -4082,
npm warn cleanup       code: 'EBUSY',
npm warn cleanup       syscall: 'rmdir',
npm warn cleanup       path: 'C:\\Users\\Onkar Godase\\OneDrive\\Desktop\\job portal\\frontend\\node_modules\\@esbuild\\linux-s390x'      
npm warn cleanup     }
npm warn cleanup   ],
npm warn cleanup   [
npm warn cleanup     'C:\\Users\\Onkar Godase\\OneDrive\\Desktop\\job portal\\frontend\\node_modules\\@esbuild\\linux-mips64el',
npm warn cleanup     [Error: EBUSY: resource busy or locked, rmdir 'C:\Users\Onkar Godase\OneDrive\Desktop\job portal\frontend\node_modules\@esbuild\linux-mips64el'] {
npm warn cleanup       errno: -4082,
npm warn cleanup       code: 'EBUSY',
npm warn cleanup       syscall: 'rmdir',
npm warn cleanup       path: 'C:\\Users\\Onkar Godase\\OneDrive\\Desktop\\job portal\\frontend\\node_modules\\@esbuild\\linux-mips64el'   
npm warn cleanup     }
npm warn cleanup   ]
npm warn cleanup ]

changed 1 package, and audited 175 packages in 9s

36 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
(base) PS C:\Users\Onkar Godase\OneDrive\Desktop\job portal\frontend>
 npm install -D @types/node

added 2 packages, changed 2 packages, and audited 177 packages in 6s 

36 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
(base) PS C:\Users\Onkar Godase\OneDrive\Desktop\job portal\frontend>
 npm run dev

> frontend@0.0.0 dev
> vite

2:47:01 pm [vite] (client) Re-optimizing dependencies because lockfile has changed

  VITE v6.3.5  ready in 2697 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
(base) PS C:\Users\Onkar Godase\OneDrive\Desktop\job portal\frontend>
 npx shadcn@latest init
✔ Preflight checks.
✔ Verifying framework. Found Vite.
✔ Validating Tailwind CSS config. Found v4.
✔ Validating import alias.
√ Which color would you like to use as the base color? » Neutral     
✔ Writing components.json.
✔ Checking registry.
✔ Updating CSS variables in src\index.css
✔ Installing dependencies.
✔ Created 1 file:
  - src\lib\utils.js

Success! Project initialization completed.
You may now add components.

(base) PS C:\Users\Onkar Godase\OneDrive\Desktop\job portal\frontend>
 npx shadcn@latest add button
✔ Checking registry.
✔ Installing dependencies.
✔ Created 1 file:
  - src\components\ui\button.jsx

(base) PS C:\Users\Onkar Godase\OneDrive\Desktop\job portal\frontend>
 npm run dev                 

> frontend@0.0.0 dev
> vite

2:50:35 pm [vite] (client) Re-optimizing dependencies because lockfile has changed

  VITE v6.3.5  ready in 1247 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help










(base) PS C:\Users\Onkar Godase\OneDrive\Desktop\job portal\frontend> npx shadcn@latest add avatar
✔ Checking registry.
✔ Installing dependencies.
✔ Created 1 file:
✔ Created 1 file:
  - src\components\ui\avatar.jsx
                                                                      npx shadcn@latest add popover^CC:\Users\Onkar Godase\OneDrive\Desktop\job portal\frontend>
(base) PS C:\Users\Onkar Godase\OneDrive\Desktop\job portal\frontend> npx shadcn@latest add popover
✔ Checking registry.
✔ Installing dependencies.
✔ Created 1 file:
  - src\components\ui\popover.jsx

(base) PS C:\Users\Onkar Godase\OneDrive\Desktop\job portal\frontend> npx shadcn@latest add popover