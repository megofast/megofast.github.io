const project_data = [
  {name: 'Movie Project', langs: ['python', 'HTML'], link: 'link',
  description: 'This is a simple python script that, when run, will dynamically create a website displaying six movies. The website includes the trailer, a description, and the movie poster.',
  image: 'images/background1.png', featured: false},
  {name: 'Calculator', langs: ['Java'], link: 'link',
  description: 'This is an advanced calculator made with Java. This calculator can calculate basic math, interest rates, and much more!',
  image: 'images/background2.png', featured: false},
  {name: 'Neighborhood Mapper', langs: ['Javascript', 'AJAX', 'CSS', 'HTML', 'Knockout JS'],
  link: 'link',
  description: 'A single-page web application, built using the Knockout framework, that displays a Google Map of an area and various points of interest. Users can search and select landmarks from a list to easily locate a given landmark. When a landmark is clicked more information is displayed from the Yelp API.',
  image: 'images/background3.png', featured: true},
  {name: 'Catalog App', langs: ['Python', 'Flask', 'CSS', 'HTML', 'SQL'], link: 'link',
  description: 'A content management catalog created using the Flask Python Framework. The content is arranged by category and item and is stored in a PostgreSQL Database. To add, edit, or delete categories and items a user must be authorized which is done using Oauth and Google. ',
  image: 'images/background4.png', featured: true},
  {name: 'ManageMyRide', langs: ['Java', 'Android Studio'], link: 'link',
  description: 'An android app made with Java in Android Studio. ',
  image: 'images/background1.png', featured: true}
];

let project = function(data) {
  self = this;
  self.name = ko.observable(data.name);
  self.description = ko.observable(data.description);
  self.short_desc = ko.computed(function() {
    return truncate(data.description, 200);
  });
  self.langs = ko.observable(data.langs.join(', '));
  self.link = ko.observable(data.link);
  self.image = ko.observable(data.image);
};
