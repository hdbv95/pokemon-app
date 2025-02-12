# Pokemon App - Vite, React, TypeScript

This is a simple Pokemon app built with Vite, React, TypeScript, and styled using TailwindCSS.

The app allows users to log in, search for Pokemon, view a list of Pokemon, and see detailed information about each Pokemon. The app communicates with the PokeAPI to fetch data about Pokemon.

## Features
### Login Screen:

* User can log in using `admin` as the username and password.
* Login state is persisted across sessions using local storage.
* The login credentials are validated locally.
  * If the user is logged in, they are redirected to the main page. 
  * If they try to access the main page without being logged in, they are redirected back to the login page.

### Main Page:

* Displays a search bar and a list of Pokemon fetched from the [PokeAPI](https://pokeapi.co/).
* The list is paginated, so you can navigate through pages of Pokemon.
* Each Pokemon is displayed with its image and name.

### Detail View:

* When a user clicks on a Pokemon from the list, a modal pops up showing detailed information about the selected Pokemon.
  * The modal includes:
    * Pokemon information: Pokemon's id, height and weight.
    * Abilities: A list of the Pokemon's abilities.
    * Moves: A list of the Pokemon's moves.

## Installation
To run this project locally, follow these steps:

1. Clone the repository:

```console
git clone https://github.com/hdbv95/pokemon-app.git
cd pokemon-app
```
2. Install dependencies:

```console
npm install
```
3. Start the development server:
```console
npm run dev
```
4. Open your browser and go to http://localhost:5173 to view the app.

## Project Structure
* `src/`: Main source code for the app.

  * `components/:` Contains React components like button, card,modal, etc.

  * `utils/`: Contains API calls to fetch Pokemon data from the PokeAPI.

  * `types/:` TypeScript types for various objects used in the app.

  * `pages/:` Contains both the Home and Login page structures.

  * `App.tsx`: Main React component for the app, that handles the routing.

  * `main.tsx`: Entry point for the React app.

## How It Works

### Login Flow:

1. The login screen prompts the user for a username and password The valid credentials are admin for both.
2. If the credentials are correct, the user is logged in, and the context is updated and the user saved in the local storage.
3. If the user is already logged in, they are redirected directly to the Home page.
4. If the user is not logged in and tries to access the main page, they are redirected to the login page.

### Pokemon List:

1. The app fetches Pokemon data from the PokeAPI.
2. Since the data is paginated, and the user can navigate between pages.
4. Each Pokemon is displayed with its image and name, and the user can click on a Pokemon to see more details.

### Pokemon Detail:

1. Upon clicking a Pokemon from the list, a modal displays detailed information about the Pokemon.
2. The modal shows the Pokemon's information, type, abilities and  moves it has.

## Technologies Used
`Vite`: Fast build tool for development.

`React`: JavaScript library for building user interfaces.

`TypeScript`: Typed superset of JavaScript that enhances developer experience.

`TailwindCSS`: Utility-first CSS framework for custom, responsive, and modern design.

`PokeAPI`: Public API used to fetch data about Pokemon.

`Local Storage`: Used to persist the login state across sessions.

`Jest`: is used as the testing framework for running the tests.

`React Testing Library`: is used for testing React components and their behavior in isolation.

## Unit Tests

To run the tests, simply use the following command:

```console
npm run test
```
This will run all the tests in the project and display the results in the terminal.

You can run the tests in watch mode to automatically re-run tests when changes are made to the code. To do so, use the following command:

```console
npm run watch
```