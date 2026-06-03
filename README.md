# user-name-generator

An application that will generate a name and avatar.

## What's here

Application uses and DiceBear API & random-word-slugs npm package

* https://www.dicebear.com/how-to-use/http-api/
* https://www.npmjs.com/package/random-word-slugs

## Setup

### 1. Clone the repo via SSH

```bash
git clone git@github.com:BarkleyRhoat/user-name-generator.git
cd user-name-generator 
```

### 2. Open in text editor

```bash
code . 
```

### 3. Install dependencies

```bash
npm install
```

### 4. Install JSON Server

```bash
npm install -g json-server
```

### 5. Start JSON Server

In one terminal start the API server:

```bash
json-server --watch db.json
```

### 6. Start live-server

In second terminal, open the app using the VS Code Live Server extension or run

```bash
npx live-server
```

> **Note:** The `.vscode/settings.json` is configured to ignore `db.json` so Live Server won't reload the page when data is saved.
