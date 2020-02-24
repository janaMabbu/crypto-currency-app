# crypto-currency-app

# Requirement
Node 8.15 or greater and Npm 6.4.1 or greater

# Installation
1. git clone the project
2. cd crypto-currency-app
3. npm i
4. npm start
5. hit http://127.0.0.1:1337/ in the browser

# Testing
1. npm run test - to run eslint, csslint, jest unit test case and snapshot test case
2. npm run test:js:snapshot - to run all snapshot test cases
3. npm run test:update - to update snapshot test cases after any code changes to components.
4. npm run test:js:unit - to run all  unit test cases


# Application Routing
I had implemented application routes with react-router library and these are some possible routes that this application supports and browser back and forward works reasonably.

1. http://127.0.0.1:1337/#/cryptotracker     (default route)
2. http://127.0.0.1:1337/#/cryptotracker/btc  (with  currencyID)



# Application-state
I had used Redux for maintaining the application state.

Although maintaining the app data with the local state would be ideal for small applications, I had used react-redux to maintain the state and using redux-thunk as middle-ware to dispatch async actions for the below particular reason.
## Reason
The reason is when the user selects the routes and view the stops and navigates to contact us page and all the components un-mounts and looses its local state. By having the application state on redux, the component can retain the data when the user clicks the browser back and lands on this page and the component mounts using the data from redux. so it does not need to make service calls to get the data as it is readily available on redux. so it optimizes the application and improves performance.

# using immutable objects
I had used immutable objects in the react components for the below reasons.

1. Immutable. js allows us to detect changes in JavaScript objects/arrays without resorting to the inefficiencies of deep equality checks, which in turn allows React to avoid expensive re-render operations when they are not required. This means Immutable. js performance tends to be good in most scenarios.
2. There is less possibility of any defects when compared to JS objects as its difficult to track down what made the change to our object.

# Code Overview for the reviewer:

### /src/components 
it has all the components and each component folder has a .jsx file and .less file and __tests__ folder which will have some Enzyme snapshot test cases for that component.

### /src/ducks 
this folder has all the business logic that a component needs, each file contains the corresponding actions, reducers and readers and async functions that component triggers or needs.

### /src/__tests __ 
it has the test cases for the duck files, it's mostly unit test cases for the functions present in corresponding duck files.

# CSS Overview
I had used Less  CSS preprocessor in the project and again this is not needed for an application of this size, but I have declared some variables such as colors,and reused them, for Example, it would make developers life much easy if we want to re-brand the site with different colors and different images or width.

# Bundle
npm run build: bundle to build the app. But the app is not yet production-ready because of some reasons below

1. To optimize the app, I made some of the dependencies/libraries are marked as external, and these assets are served by webpack dev server when we run the app locally, these assets have to be copied from node modules to another folder and should be included in the build folder and a web server which hosts the application should serve these files or we can complete on rely on CDN's for loading these libraries.

2. bundle/code splitting and fingerprinting of the files is not done. has to setup webpack configuration for that.

# My work samples

### an npm package I had published last year
https://www.npmjs.com/package/omit-deep-by-values

### some webpages I had built/worked for BestBuy client

1. https://www.bestbuy.com/wireless/transaction-types/render/carriers?numberOfPayments=1&purchaseType=FULL_SRP&skuId=6223303

2. https://www.bestbuy.com/wireless/activated/upgradechecker

3. https://www.bestbuy.com/wireless/activation-guide

The above pages are not reponsive by default, we use useragent to decide what type of view the customer needs, you can switch to responsive view( mobile and IPad view) by clicking on the "Mobile Site" on the bottom of page

### React with GraphQL sample project 
1. Used Apollo client and it was built on github GraphQl services
2. code: https://github.com/janaMabbu/react-graphql-app
3. this sample project is hosted on AWS.
4. http://jana-app.s3-website.us-east-2.amazonaws.com/#/
5. note: I just developed it for my learning purposes the code is not scaled properly.



# Thank you for yourr time!
