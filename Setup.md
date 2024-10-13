# Setup the project

The steps outlined in this file will help you set up the following:

1. **Next.js** - This will be used as the main framework for the frontend.
2. **TailwindCSS** - This is an option when setting up Next.js.
3. **ESLint** - Also comes with Next.js, used to enforce code quality.
4. **Prettier** - Used to enforce code formatting.
5. **Conventional Commits** - A standard for writing commit messages.
6. **Husky and Lint-Staged** - Tools to add a pre-commit hook for linting and formatting.

## Instructions

### 1. Next.js

```shell
npx create-next-app@latest
```

In the options make sure to chose the following

```shell
What is your project named?  [your team name comes here]
Would you like to use TypeScript?  No
Would you like to use ESLint?  Yes
Would you like to use Tailwind CSS? Yes
Would you like to use `src/` directory?  Yes
Would you like to use App Router? (recommended)  Yes
Would you like to customize the default import alias?  No
```

The above steps will set up Next.js with ESLint and TailwindCSS.

### 2. Prettier

Prettier is used to enforce a consistent coding style throughout the project. To install Prettier, run:

```shell
npm install --save-dev prettier
```

Create a new file called `.prettierrc.js` in the root folder and put the following inside of it

```js
module.exports = {
  semi: false,
  singleQuote: false, // Set to true if you prefer single quotes
  trailingComma: 'all',
};
```

Add the following to `package.json` in the script property

```js
"scripts": {
  // Other existing scripts...
  "format": "prettier --check --ignore-path .gitignore .",
  "format:fix": "prettier --write --ignore-path .gitignore ."
  // Other existing scripts...
}
```

### 3. Conventional Commits

Conventional Commits is a standard for writing commit messages that makes it easier to understand the history of changes in a repository. Here are some common types of commit messages:

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc.)
  refactor: A code change that neither fixes a bug nor adds a feature
- **test**: Adding missing or correcting existing tests
- **chore**: Changes to the build process or auxiliary tools and libraries such as documentation generation

For example, a commit message should look like this:

```shell
feat: add user authentication module
```

### 4. Husky and Lint-Staged

To automate the process of linting and formatting code before committing, we will use **Husky** and **Lint-Staged**.

Install Husky and Lint-Staged as development dependencies:

```shell
npm install --save-dev husky lint-staged
```

Add the following to `package.json`:

```json
"husky": {
  "hooks": {
    "pre-commit": "lint-staged"
  }
},
"lint-staged": {
  "*.{js,jsx,ts,tsx,json,css,scss,md}": [
    "prettier --write",
    "eslint --fix",
    "git add"
  ]
}
```

This configuration will run Prettier and ESLint on staged files before they are committed.

Initialize Husky in your project:

```shell
npx husky install
```

To enable Husky pre-commit hook, run:

```shell
npx husky add .husky/pre-commit "npm test"
```

### 5. GitHub

- **Protect the `main` branch**: Set up branch protection rules in GitHub to prevent direct pushes to the `main` branch. Only code merged through Pull Requests (PRs) should be allowed.
- **Protect the `dev` branch**: Apply the same branch protection rules to the `dev` branch. All new PRs should be merged into the `dev` branch first. Code should be tested on the `dev` branch before being marked as a release and merged into the `main` branch.
- **Vercel integration**: Integrate Vercel with the GitHub repository. Set up Vercel to provide a preview deployment for every PR to review changes before merging.
- **Branch and Issue Management**: Ensure all new branches are created through GitHub, linked to the specific issue they are addressing. This maintains clear traceability between code changes and project issues.

### 6. Finalize

To run your project in development mode, execute:

```shell
npm run dev
```
