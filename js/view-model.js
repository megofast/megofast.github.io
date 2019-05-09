let viewModel = function() {
  let self = this;
  self.projects = ko.observableArray([]);
  self.featured = ko.observableArray([]);
  self.selectedLink = ko.observableArray([true, false, false, false]);
  self.section1 = ko.observable();
  self.section2 = ko.observable();
  self.popupSection = ko.observable();
  self.filterText = ko.observable();

  self.show_popup = function (data) {
    let modal = document.getElementById('popup');
    let sample_site = '';
    if (data.other() != '') {
      // The other field has a link in it, show the website section.
      sample_site = "<h5 class='card_h5'><a target='_blank' href='" + data.other() +"'>View Website</a></h5>";
    modal.style.display = "block";
    self.popupSection("<article><span class='close' onclick='closePopup()'>&times;</span>" +
    "<img class='card_image' src=" + data.image() + ">" +
    "<h4 class='card_h4 fix-display'>" + data.name() + "</h4><a target='_blank' href='" + data.link() + "'><img class='popup-git-image' src='Images/icons/github-sign.png'></a>" +
    "<h5 class='card_h5'>" + data.langs() + "</h5>" +
    "<h5 class='card_h5'><a target='_blank' href='" + data.link() +"'>View Code on Github</a></h5>" +
    sample_site +
    "<p class='card_p'>" + data.description() + "</p>" +
    "</article>");
  };

  self.show_index = function() {
    // Change the selected link variable
    for (let i = 0; i < self.selectedLink().length; i++) {
      self.selectedLink()[i] = false;
    }
    self.selectedLink()[0] = true;
    self.selectedLink.valueHasMutated();

    self.section1("<h3>Introduction</h3>" +
    "<p>Hello, my name is David Rosinski and I am a developer with over 10 " +
    "years of experience using many different programming languages. This " +
    "website was designed and created by me using HTML, CSS, vanilla Javascript, and Knockout. " +
    "I graduated from Udacity's Full Stack Developer Nanodegree program in January of 2019. " +
    "I am currently looking for full time employment as a software engineer, full stack developer, or any other related career. " +
    "The about page has a summary of my skills, however please note that I am always learning new technologies and those skills will likely expand as time passes. " +
    "If you are interested in getting ahold of me please follow on of the links to my linkedin profile and message me there as I have not yet finished the contacts page. " +
    "</p>");

    self.section2("<h3>Featured Projects</h3>" +
    "<div id='proj' class='center-container' data-bind='foreach: featured'>" +
    "<article class='card'  data-bind='click: $parent.show_popup.bind($data, $data)'>" +
    "<img class='card_image' data-bind='attr: {src: image}'>" +
    "<h4 class='card_h4' data-bind='text: name'></h4>" +
    "<h5 class='card_h5' data-bind='text: langs'></h5>" +
    "<p class='card_p' data-bind='text: short_desc'></p>" +
    "</article>" +
    "</div>");

  };

  self.show_projects = function() {
    // Change the selected link variable
    for (let i = 0; i < self.selectedLink().length; i++) {
      self.selectedLink()[i] = false;
    }
    self.selectedLink()[1] = true;
    self.selectedLink.valueHasMutated();
    self.section1("<input type='text' class='filter' data-bind='textInput: filterText, event: {keyup: filter}' placeholder='Filter'>" +
    "<input type='radio' class='filter-radio' name='filter_type' id='name' checked> Name<input type='radio' class='filter-radio' name='filter_type' id='language'> Languages");
    self.section2("<div id='proj' class='center-container' data-bind='foreach: projects'>" +
    "<article class='card' data-bind='click: $parent.show_popup.bind($data, $data)'>" +
    "<img class='card_image' data-bind='attr: {src: image}'>" +
    "<h4 class='card_h4' data-bind='html: name'></h4>" +
    "<h5 class='card_h5' data-bind='html: langs'></h5>" +
    "<p class='card_p' data-bind='html: short_desc'></p>" +
    "</article>" +
    "</div>");
  };

  self.filter = function() {
    let filter_text = self.filterText().toUpperCase();
    // Loop through all the projects
    for (i = 0; i < self.projects().length; i++) {
      if (document.getElementById('name').checked == true) {
        // The name button is selected so only check for filtered words in the name
        let highL = "<span class='highlight'>";
        let highlightPos = self.projects()[i].name().indexOf(highL);
        // Check if the span is found in the name or not
        if (highlightPos > -1) {
          // The card has highlighting, remove the highlighting
          let highEndPos = self.projects()[i].name().indexOf("</span>");
          let part1 = self.projects()[i].name().substring(0, highlightPos);
          let middle = self.projects()[i].name().substring((highlightPos + highL.length), highEndPos);
          let part2 = self.projects()[i].name().substring((highEndPos + 7), self.projects()[i].name().length);
          // Put all the parts back together without the span tags
          self.projects()[i].name(part1 + middle + part2);
        }
        // Check the position of the filtered text in the name
        let pos = self.projects()[i].name().toUpperCase().indexOf(filter_text);

        if (pos > -1) {
          // The filter found text in the project name, show the item
          // Only add the highlights if the filter is not blank
          if (filter_text.length > 0) {
            // Break the text into seperate parts for adding the span tag
            let part1 = self.projects()[i].name().substring(0, pos);
            let middle = self.projects()[i].name().substring(pos, (pos + filter_text.length));
            let part2 = self.projects()[i].name().substring((pos + filter_text.length), self.projects()[i].name().length);
            // Put all the parts back together with the new span tags
            self.projects()[i].name(part1 + highL + middle + "</span>" + part2);
          }
          // Make the card visible since it was found in the filter search
          let cards = document.getElementsByClassName('card');
          cards[i].style.display = 'inline-block';
        } else {
          // The filter did not find text in the item, hide the list item
          let cards = document.getElementsByClassName('card');
          cards[i].style.display = 'none';
        }
      } else {
        // The languages radiobox is checked
        let highL = "<span class='highlight'>";
        let highlightPos = self.projects()[i].langs().indexOf(highL);
        // Check if the span is found in the langs or not
        if (highlightPos > -1) {
          // The card has highlighting, remove the highlighting
          let highEndPos = self.projects()[i].langs().indexOf("</span>");
          let part1 = self.projects()[i].langs().substring(0, highlightPos);
          let middle = self.projects()[i].langs().substring((highlightPos + highL.length), highEndPos);
          let part2 = self.projects()[i].langs().substring((highEndPos + 7), self.projects()[i].langs().length);
          // Put all the parts back together without the span tags
          self.projects()[i].langs(part1 + middle + part2);
        }
        // Check the position of the filtered text in the name
        let pos = self.projects()[i].langs().toUpperCase().indexOf(filter_text);

        if (pos > -1) {
          // The filter found text in the project name, show the item
          // Only add the highlights if the filter is not blank
          if (filter_text.length > 0) {
            // Break the text into seperate parts for adding the span tag
            let part1 = self.projects()[i].langs().substring(0, pos);
            let middle = self.projects()[i].langs().substring(pos, (pos + filter_text.length));
            let part2 = self.projects()[i].langs().substring((pos + filter_text.length), self.projects()[i].langs().length);
            // Put all the parts back together with the new span tags
            self.projects()[i].langs(part1 + highL + middle + "</span>" + part2);
          }
          // Make the card visible since it was found in the filter search
          let cards = document.getElementsByClassName('card');
          cards[i].style.display = 'inline-block';
        } else {
          // The filter did not find text in the item, hide the list item
          let cards = document.getElementsByClassName('card');
          cards[i].style.display = 'none';
        }
      }
    }
  };

  self.show_about = function() {
    // Change the selected link variable
    for (let i = 0; i < self.selectedLink().length; i++) {
      self.selectedLink()[i] = false;
    }
    self.selectedLink()[2] = true;
    self.selectedLink.valueHasMutated();

    // Need to add bootstrap and flask

    self.section1("<div class='skills-key'><img class='skill-pic' src='Images/skill-high.png' width='30' height='30'>Highly Skilled" +
    "<img class='skill-pic' src='Images/skill-moderate.png' width='30' height='30'>Moderately Skilled" +
    "<img class='skill-pic' src='Images/skill-beginner.png' width='30' height='30'>Beginner</div><h3>Skills</h3>" +
    "<div class='skills'><div class='skill'>" +
    "<img src='Images/skill-high.png' width='30' height='30'>" +
    "HTML</div>" +
    "<div class='skill'>" +
    "<img src='Images/skill-high.png' width='30' height='30'>" +
    "CSS</div>" +
    "<div class='skill'>" +
    "<img src='Images/skill-moderate.png' width='30' height='30'>" +
    "PHP</div>" +
    "<div class='skill'>" +
    "<img src='Images/skill-high.png' width='30' height='30'>" +
    "Javascript</div>" +
    "<div class='skill'>" +
    "<img src='Images/skill-moderate.png' width='30' height='30'>" +
    "ASP</div>" +
    "<div class='skill'>" +
    "<img src='Images/skill-high.png' width='30' height='30'>" +
    "SQL</div>" +
    "<div class='skill'>" +
    "<img src='Images/skill-high.png' width='30' height='30'>" +
    "Knockout</div>" +
    "<div class='skill'>" +
    "<img src='Images/skill-beginner.png' width='30' height='30'>" +
    "React</div>" +
    "<div class='skill'>" +
    "<img src='Images/skill-moderate.png' width='30' height='30'>" +
    "C</div>" +
    "<div class='skill'>" +
    "<img src='Images/skill-moderate.png' width='30' height='30'>" +
    "C++</div>" +
    "<div class='skill'>" +
    "<img src='Images/skill-high.png' width='30' height='30'>" +
    "Java</div>" +
    "<div class='skill'>" +
    "<img src='Images/skill-high.png' width='30' height='30'>" +
    "Visual Basic</div>" +
    "<div class='skill'>" +
    "<img src='Images/skill-high.png' width='30' height='30'>" +
    "Python</div>" +
    "<div class='skill'>" +
    "<img src='Images/skill-high.png' width='30' height='30'>" +
    "Android Mobile</div>" +
    "<div class='skill'>" +
    "<img src='Images/skill-moderate.png' width='30' height='30'>" +
    "Windows Server</div>" +
    "<div class='skill'>" +
    "<img src='Images/skill-high.png' width='30' height='30'>" +
    "Windows OS</div>" +
    "<div class='skill'>" +
    "<img src='Images/skill-moderate.png' width='30' height='30'>" +
    "Unix</div>" +
    "<div class='skill'>" +
    "<img src='Images/skill-moderate.png' width='30' height='30'>" +
    "Photoshop</div>" +
    "<div class='skill'>" +
    "<img src='Images/skill-high.png' width='30' height='30'>" +
    "Microsoft Office</div>" +
    "<div class='skill'>" +
    "<img src='Images/skill-high.png' width='30' height='30'>" +
    "Git</div>" +
    "<div class='skill'>" +
    "<img src='Images/skill-moderate.png' width='30' height='30'>" +
    "Bootstrap</div>" +
    "<div class='skill'>" +
    "<img src='Images/skill-moderate.png' width='30' height='30'>" +
    "Flask</div></div>");

    self.section2("<h3>Short Bio</h3>" +
    "<img src='Images/portrait.jpg' align='right'>" +
    "<p>My name is Dave. I have been coding since I was approximately 12 years old when I started tinkering with C and C++. " +
    "Back then my knowledge was soley gained on passion, self study, and trial and error. " +
    "I still carry the same passion and drive to learn new languages and frameworks. " +
    "During the early days I focused mostly on web development and game design. I have several unfinished games " +
    "because I had a tendency to have these elaborate games planned. While in high school I took the only programming class offered which was C and Visual Basic. " +
    "There I excelled and enjoyed having the structure of projects and other students to collaborate with. " +
    "With Visual Basic I developed many games and applications. " +
    "Even collaborated with some friends to create a nefarious application that allowed you to install and take over a computer over a network and show fake bsods and move the mouse. " +
    "That got a lot of laughs and a stern talking to after we infected a whole computer lab with it. " +
    "Around the same time I was taking severl classes in Chemistry and Biology and decided that is what I was going to go to the University and study. " +
    "At the time I never really thought of computer programming as a career. It was a passion for me. Something I did to relax and have fun. " +
    "After several years and many changes to my educational focus I realized I was dumb for not studying programming right away. " +
    "Unfortunately, at that point I had been in school for 4 years and the financial support fell out. " +
    "I ended up dropping out and working various labor jobs while continuing to take classes at the local community college when I could afford. " +
    "That's when my brother told me about Udacity. I found the Full Stack Web Development program to be interesting and worked through it. " +
    "I completed the program in January of 2019. Now I am job hunting and hope to find a career where I can continue my passion for computers and programming!</p>"
    );
  };

  self.show_contact = function() {
    // Change the selected link variable
    for (let i = 0; i < self.selectedLink().length; i++) {
      self.selectedLink()[i] = false;
    }
    self.selectedLink()[3] = true;
    self.selectedLink.valueHasMutated();

    // Contacts page is incomplete, redirect to the about page
    self.show_about();
  };

  self.add_projects = function() {
    // create the array of project objects
    for (let i = 0; i < project_data.length; i++) {
      // put all projects in the projects array
      self.projects.push(new project(project_data[i]));
      if (project_data[i].featured == true) {
        // Add project to the featured array for display on the home page
        self.featured.push(new project(project_data[i]));
      }
    }
  }

  self.remove_projects = function() {
    self.projects.removeAll();
  }

  // Add the projects to the observable
  self.add_projects();

  // Show the initial page and setup the projects data
  self.show_index();

};

// A custom binding for dynamically adding html with bindings
ko.bindingHandlers.htmlWithBinding = {
  'init': function() {
    return { 'controlsDescendantBindings': true };
  },
  'update': function (element, valueAccessor, allBindings, viewModel, bindingContext) {
    let data = ko.unwrap(valueAccessor());
    element.innerHTML = data;
    ko.applyBindingsToDescendants(bindingContext, element);
  }
};

var vm = new viewModel();
ko.applyBindings(vm);
