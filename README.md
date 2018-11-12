# MyBooks App | Udacity FEND | 2018

Project six of seven for Udacity's Front End Web Developer Nanodegree; completed as part of the Grow with Google Scholarship program, 2018.

The focus of this project was demonstrating and practicing skills and knowledge around the fundamentals of using React to develop for the Web.

## Authors

I -- Jacob W. Olson -- used React to implement this app's functionality. A starter template that included an HTML example of the markup, most all of the CSS stylings, the `BooksAPI.js` file with its content and methods, and other material, was provided by Udacity. 

A detailed description of the code provided by Udacity is below,in the block-quoted material copied over from the README provided with the starter template.

My contributions include creating the `Search.js` file and much or most of the functional code found in the `ListBooks.js` and `App.js` files. I also added the text displayed, along with its styles, when no book is found in the search component.

## Getting the App Up and Running

1. Create a local directory on your machine and clone the repository to it. For help with this step, see [this tutorial from GitHub](https://help.github.com/articles/cloning-a-repository/ "GitHub Help — Clone a Repository").

2. Make sure you have node.js and npm installed. 
    * To check for node.js, open a console and enter "node -v" in the command line. If node is installed, a version number should be returned: e.g., "v8.11.3." 
    * To check for npm, enter "npm -v." If npm is installed, you should likewise see a version number returned -- e.g., "6.4.1."
    * If you do not have node or npm installed, follow [these instructions from Dave McFarland at Treehouse](https://blog.teamtreehouse.com/install-node-js-npm-windows "How to Install Node.js® and NPM on Windows" by Dave McFarland).
    * To learn more about node.js and npm, you may wish to check out the linked article from Treehouse above, see [this article by Priyash Patel on freeCodeCamp's blog](https://medium.freecodecamp.org/what-exactly-is-node-js-ae36e97449f5 ""What exactly is Node.js?" by Priyesh Patel"), take a look around [the node.js website](https://node.js.org/en/ "Node.js website). or search for any number of other great resources for learning out there. 

3. With node.js and npm installed, you'll next want to install the application's dependencies. 
    * Run `npm install` on the command line, and wait for the intallation process to complete.

4. Next, fire up the development server.
    * Enter `npm start` on the command line. After a short time, a browser window with the URL "https:localhost:3000" should open, displaying the app. You can navigate to this URL as well.

5. You should now be able to check out the app and it's features!

## Using the App

1. On the home page, you will see a default set of books loaded to their specified shelves. Select the downward arrow icon next to any book to access a menu that allows you to change the book's shelf. When you select a new shelf, [the app's state will change](https://reactjs.org/docs/faq-state.html "'Component State' entry at reacjs.org") and the app will re-render, and the book will move to the newly selected shelf. 


If "none" is selected, the book will dissapear from the home page completely, but will still be seachable ...

2. Select the plus-sign icon in the bottom right-hand corner of the page to navigate to ".../search," a page displaying a component that will allow you to search the API for new books to add your shelves.

Enter some text in to the text field and a list of matching books with matching titles or authors will appear. Change the shelf option on any of these books to add them to one of your shelves. Books that are already assigned to a shelf will also appear in search results -- if you open an already selected-book's search menu, you will see that it's current shelf will match the selected value in the books shelf menu. 


Changing any book's shelf assignment on the search page will update its shelf placement on the home page.

When you change a book's shelf on the search page, you will be redirected to the home page, where you will see the newly selected, or freshly moved, book on the appropriate shelf, or will you will no longer see the book in question if its shelf value was changed to "none."

3. That's the app! Thanks for taking a look. Check out the code to see how it works. And always, comments, feedback, questions and requests to collaborate are more than welcome!

## Details on the starter template as provided by Udacity. See the repository for the starter template [here](https://github.com/udacity/reactnd-project-myreads-starter). 

### Blockquoted material below from the README for the starter template repository.


        ## What You're Getting
        ```bash
        ├── CONTRIBUTING.md
        ├── README.md - This file.
        ├── SEARCH_TERMS.md # The whitelisted short collection of available search terms for you to use with your app.
        ├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
        ├── public
        │   ├── favicon.ico # React Icon, You may change if you wish.
        │   └── index.html # DO NOT MODIFY
        └── src
            ├── App.css # Styles for your app. Feel free to customize this as you desire.
            ├── App.js # This is the root of your app. Contains static HTML right now.
            ├── App.test.js # Used for testing. Provided with Create React App. Testing is encouraged, but not required.
            ├── BooksAPI.js # A JavaScript API for the provided Udacity backend. Instructions for the methods are below.
            ├── icons # Helpful images for your app. Use at your discretion.
            │   ├── add.svg
            │   ├── arrow-back.svg
            │   └── arrow-drop-down.svg
            ├── index.css # Global styles. You probably won't need to change anything here.
            └── index.js # You should not need to modify this file. It is used for DOM rendering only.
        ```

        Remember that good React design practice is to create new JS files for each component and use import/require statements to include them where they are needed.

        ## Backend Server

        To simplify your development process, we've provided a backend server for you to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

        * [`getAll`](#getall)
        * [`update`](#update)
        * [`search`](#search)

        ### `getAll`

        Method Signature:

        ```js
        getAll()
        ```

        * Returns a Promise which resolves to a JSON object containing a collection of book objects.
        * This collection represents the books currently in the bookshelves in your app.

        ### `update`

        Method Signature:

        ```js
        update(book, shelf)
        ```

        * book: `<Object>` containing at minimum an `id` attribute
        * shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
        * Returns a Promise which resolves to a JSON object containing the response data of the POST request

        ### `search`

        Method Signature:

        ```js
        search(query)
        ```

        * query: `<String>`
        * Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
        * These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

        ## Important
        The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

        ## Create React App

        This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).









# MyReads Project

This is the starter template for the final assessment project for Udacity's React Fundamentals course. The goal of this template is to save you time by providing a static example of the CSS and HTML markup that may be used, but without any of the React code that is needed to complete the project. If you choose to start with this template, your job will be to add interactivity to the app by refactoring the static code in this template.

Of course, you are free to start this project from scratch if you wish! Just be sure to use [Create React App](https://github.com/facebookincubator/create-react-app) to bootstrap the project.

## TL;DR

To get started developing right away:

* install all project dependencies with `npm install`
* start the development server with `npm start`

## What You're Getting
```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms for you to use with your app.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   └── index.html # DO NOT MODIFY
└── src
    ├── App.css # Styles for your app. Feel free to customize this as you desire.
    ├── App.js # This is the root of your app. Contains static HTML right now.
    ├── App.test.js # Used for testing. Provided with Create React App. Testing is encouraged, but not required.
    ├── BooksAPI.js # A JavaScript API for the provided Udacity backend. Instructions for the methods are below.
    ├── icons # Helpful images for your app. Use at your discretion.
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── index.css # Global styles. You probably won't need to change anything here.
    └── index.js # You should not need to modify this file. It is used for DOM rendering only.
```

Remember that good React design practice is to create new JS files for each component and use import/require statements to include them where they are needed.

## Backend Server

To simplify your development process, we've provided a backend server for you to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query)
```

* query: `<String>`
* Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Contributing

This repository is the starter code for _all_ Udacity students. Therefore, we most likely will not accept pull requests.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).
