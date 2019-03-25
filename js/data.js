const project_data = [
  {name: 'Movie Project', langs: ['python', 'HTML'], link: 'https://github.com/megofast/Movie-Website',
  description: 'This is a simple python script that, when run, will dynamically create a website displaying six movies. The website includes the trailer, a description, and the movie poster.',
  image: 'Images/background1.png', featured: false, other: ''},
  {name: 'Calculator', langs: ['Java'], link: 'link',
  description: 'This is an advanced calculator made with Java. This calculator can calculate basic math, interest rates, and much more!',
  image: 'Images/background2.png', featured: false, other: ''},
  {name: 'Neighborhood Mapper', langs: ['Javascript', 'AJAX', 'CSS', 'HTML', 'Knockout JS', 'Bootstrap'],
  link: 'https://github.com/megofast/Neighborhood-Mapper',
  description: 'A single-page web application, built using the Knockout framework, that displays a Google Map of an area and various points of interest. Users can search and select landmarks from a list to easily locate a given landmark. When a landmark is clicked more information is displayed from the Yelp API.',
  image: 'Images/background3.png', featured: true, other: ''},
  {name: 'Catalog App', langs: ['Python', 'Flask', 'CSS', 'HTML', 'SQL'], link: 'https://github.com/megofast/Catalog_App',
  description: 'A content management catalog created using the Flask Python Framework. The content is arranged by category and item and is stored in a PostgreSQL Database. To add, edit, or delete categories and items a user must be authorized which is done using Oauth and Google. ',
  image: 'Images/background4.png', featured: true, other: ''},
  {name: 'ManageMyRide', langs: ['Java', 'Android Studio'], link: 'https://github.com/megofast/Vehicle_Manager',
  description: 'ManageMyRide is a complex android app made in Android Studio using Java. The app allows for the organization of maintenance records and receipts for many vehicles or equipment. To add a vehicle there is a barcode scanner and decoder to automatically detect vehicle make and year. Data and pictures are stored in a database.',
  image: 'Images/background1.png', featured: true, other: ''},
  {name: 'Log Creator', langs: ['SQL', 'Python'], link: 'https://github.com/megofast/log_creator',
  description: 'A short python program to create logs from a database (containing blog post visits) using sql queries.',
  image: 'Images/background2.png', featured: false, other: ''},
  {name: 'Coffee Kiosk', langs: ['Java'], link: 'https://github.com/megofast/coffee-kiosk',
  description: 'This is a Java program made to simulate an automatic ordering kiosk for a coffee shop. It allows the user to select things like how many cups to order, what kind of coffee, size, and condiments. After the user is done selecting options the kiosk will display a receipt for the cost including taxes.',
  image: 'Images/background3.png', featured: false, other: ''}
];

let project = function(data) {
  self = this;
  self.name = ko.observable(data.name);
  self.description = ko.observable(data.description);
  self.short_desc = ko.computed(function() {
    return truncate(data.description, 190);
  });
  self.langs = ko.observable(data.langs.join(', '));
  self.link = ko.observable(data.link);
  self.image = ko.observable(data.image);
  self.other = ko.observable(data.other);
};
