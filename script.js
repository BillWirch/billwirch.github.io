// iv chosen to create this website using purely JS whenever possible, i started out
// thinking this was the optimal way to do it, however i now think it is a bit convoluted

// this object uses various functions to deploy the correct JS script on whichever page is rendered
// I've done this using a simple switch although there m be better ways
//
// there should be an import export of the data and functions to make this easier to read

const pageSelector = {
      content: () => {
            document.addEventListener('DOMContentLoaded', pageSelector.selected);
            console.log('HTML Loaded');
      },
      selected: () => {
            let page = document.body.id;
            
            const header = document.querySelector('header');
            const main = document.querySelector('main');

            if (!header || !main) {
                  console.warn('Missing header or main element.');
                  return;
              }
            
            switch (page)     {
                  case 'index':
                        header.append(navBar1);
                        navBar1.append(navBar1List);
                        
                        //add contact form stuff
                        
                  break;
                  case 'filmtv' :
                        // header.append(navBar2);
                        // need to grid assign the headers
                        main.append(filmTvHeader);
                        main.append(creditsHeader);
                        main.append(projectList);
                        main.append(commercialHeader);
                        main.append(projectListCommercial);
                  break;
                  case 'apps':
                        console.log("Apps");
                  break;
                  case 'architecture':
                        console.log("Architecture");
                  default:
                console.log("No matching page found.");
             }

            }
      };




/* Standard DOM elements to use in JS
*/
const body = document.querySelector('body');
const header = document.querySelector('header');
const main = document.querySelector('main');
const footer = document.querySelector('footer');

/* Customised DOM elements to use in JS
could a js class be made with all these in to be reeled out when needed?
*/
const navBar1 = document.createElement('nav');5 
      navBar1.className = 'navBar1';

const navBar1List = document.createElement('ul');
      navBar1List.className = 'navbar1list';

const headerName = document.createElement('div');
      headerName.className = "mainHeader";
      headerName.innerText = `will birch.`; 

const headerCV = document.createElement('div');
      headerCV.className = "headerCV";
      headerCV.innerText = 'CV'

const filmTvHeader = document.createElement('div');
      filmTvHeader.className = 'mainHeader';
      filmTvHeader.id = 'filmTvHeader';
      filmTvHeader.innerText = "Film & TV";

const commercialHeader = document.createElement('div');
      commercialHeader.className = 'mainHeader';
      commercialHeader.id = 'commercialHeader';
      commercialHeader.innerText = "Commercial";

const creditsHeader = document.createElement('div');
      creditsHeader.className = 'mainHeader';
      creditsHeader.id = 'creditsHeader';
      creditsHeader.innerText = "Credits"; 
    

const projectContainer = document.createElement('div');
      projectContainer.id = 'projectsContainer' //this is the container grid styled element - not sure tis is being used anymore

// an array of objects with name and link used to create a navbar 
// foreach loop to run through these and create links from array obj components

const navBar1Items = [
      { name: 'Film & TV', url: 'film-tv.html' }, 
      { name: 'Apps', url: 'apps.html' }, 
      { name: 'Architecture', url: 'architecture.html' },
      { name: 'Contact', url: 'contact.html' }
  ];
  
   
  navBar1Items.forEach(item => {
      const navBar1Item = document.createElement('li');
      navBar1Item.className = 'navBar1Item';
  
    
      const link = document.createElement('a');
      link.href = item.url;           
      link.textContent = item.name;   
      link.className = 'navLink';     
  
      // Appending the link inside of the <li> element
      navBar1Item.appendChild(link);
      navBar1List.appendChild(navBar1Item);

      
  });

const projectList = document.createElement('ul');
      projectList.className = 'projectList';

const projectListTitle = document.createElement('div');

// const projectItem = document.createElement('li');
//       projectItem.className = 'projectItem';
    
// array of Objects to control Job list entries, designed to be easily editable top down
// const ProjectListEntries = (projects) =>  {

    let projects = [
    
       
        {
          project: "Person of Interest",
          projRole: "Production Designer",
          projDesc: "Short Feature \n Channel 4\n Halcyon's Heart",
          projRefs: 'Director - Aysha Rafaele \n Exec Producer - Joseph Bullman \n Producer - Meeshan Saxena',
            projectBGImage: 'projectS/person-of-interest/BGImage.png' 
      },
        {
          project: "Ruby",
          projRole: "Production Designer",
          projDesc: "Short Feature \n Channel 4\n Halcyon's Heart",
          projRefs: 'Director - Aysha Rafaele \n Exec Producer - Joseph Bullman \n Producer - Meeshan Saxena',
            projectBGImage: 'projectS/person-of-interest/BGImage.png' 
      },
       
        {
          project: "Standing Set Studio Build",
          projRole: "Supervising Art Director",
          projDesc: "Brentford Studios",
          projRefs: 'Producer - Tara Llwellyn ',
            projectBGImage: 'projectS/brentford-studios/BGImage.jpg' 
      },
        {
            project: "Phoenix Rise Season 4",
            projRole: "Art Director",
            projDesc: "Drama Series \n BBC",
            projRefs: 'Executive Producer - Mark Freeland \n Producer - Alison Matthews \n Production Designer - Kay Brown',
            projectBGImage: 'projectS/phoenix-rise/BGImage.png' 
      },
          {
            project: "Karaoke",
            projRole: "Production Designer",
            projDesc: "Short Feature \n RagTag Productions",
            projRefs: 'Director - Ben  \n Producer - Aruhan ',
            projectBGImage: 'projectS/karaoke/BGImage.png' 
      },
          {
            project: "White Belt",
            projRole: "Art Director",
            projDesc: "Short Feature \n Ki Films",
            projRefs: 'Director - Beau Fowler \n Executive Producer - Andrew Koji \n Producer - David Mullenger',
            projectBGImage: 'projectS/white-belt/BGImage.png' 
      },
        {
            project: "Phoenix Rise Season 3",
            projRole: "Art Director",
            projDesc: "Drama Series \n BBC",
            projRefs: 'Executive Producer - Mark Freeland \n Producer - Alison Matthews \n Production Designer - Kay Brown',
            projectBGImage: 'projectS/phoenix-rise/BGImage2.png' 
      },
        {
            project: "Kanneda",
            projRole: "Production Designer",
            projDesc: "Web Series \n Black Cumin Pictures",
            projRefs: 'Director - Chandan Arora \n Exec Producer - Nitin Upadhyaya \n Producer - Tara Llewllyn',
            projectBGImage: 'projectS/person-of-interest/BGImage.png' 
      },
       
        {
            project: "Trying Season 3",
            projRole: "Draughtsperson - Daily",
            projDesc: "Drama Series \n Apple TV",
            projRefs: 'Production Design - Charlotte Pearson \n Supervising Art Director - Neil McAllister \n Art Director - Edd Cross',
            projectBGImage: 'projectS/person-of-interest/BGImage.png' 
      },
        {
            project: "Inside No. 9",
            projRole: "Art Director",
            projDesc: "Comedy Drama Series \n BBC",
            projRefs: 'Executive Prods - Steve Pemberton \n Reece Shearsmith \n Producer - Kim Crowther \n Prod Design - Paul Rowan',
            projectBGImage: 'projectS/person-of-interest/BGImage.png' 
      },
        {
            project: "Tehran",
            projRole: "Art Director",
            projDesc: "Motion Picture \n Pacific Worldwide Films",
            projRefs: 'Director - Arun Gopalan \n Producer - Cyrus Patel \n Prod Design - Paul Rowan',
            projectBGImage: 'projectS/person-of-interest/BGImage.png' 
      },
        {
            project: "Beaneath the Seams",
            projRole: "Props Supervisor",
            projDesc: 'Haus fo Kraft',
            projRefs: 'Producton Design - Marsha Roddy \n Art Director Jeanefer Jean-Charles',
            projectBGImage: 'projectS/person-of-interest/BGImage.png' 
      },
          {
            project: "Kadhal Konjam Thookala",
            projRole: "Art Director",
            projDesc: "Feature \n Cupid Films",
            projRefs: 'Director - Balaji Mohan \n Producer - Ashwani Chopra',
            projectBGImage: 'projectS/person-of-interest/BGImage.png' 
      },
          {
            project: "3 Day Millionaire",
            projRole: "Standby Prop",
            projDesc: "Feature \n Shush Films",
            projRefs: 'Director - Jack Spring \n Producer - Lucinda Thakrar\n Producer - Giles Anderson\n Production Designer - Errol Jarc',
            projectBGImage: 'projectS/person-of-interest/BGImage.png' 
      },
      
          {
            project: "A Jolly Good Christmas",
            projRole: "Standby Prop",
            projDesc: "Feature \n Hallmark Productions",
            projRefs: 'Director - Jonathan Wright \n Producer - Lucinda Thakrar \n Production Designer - Iain Andrews',
            projectBGImage: 'projectS/person-of-interest/BGImage.png' 
      },
          {
            project: "Brain Reaction - Pilot",
            projRole: "Art Director",
            projDesc: "Series \n Chimp TV",
            projRefs: 'Executive Producer - Richard Hammond \n Producer Rob Morris',
            projectBGImage: 'projectS/person-of-interest/BGImage.png' 
      },
          {
            project: "The Unlikely Pilgrimage of Harold Fry",
            projRole: "Standby Prop // Dressing Props",
            projDesc: "Feature\n Rose Pine Productions",
            projRefs: 'Director - Hettie Macdonald \n Production Designer - Christina Moore \n Supervising Art Director - Iain White',
            projectBGImage: 'projectS/person-of-interest/BGImage.png' 
      },
          {
            project: "Meet the Richardsons",
            projRole: "Props",
            projDesc: "Comedy Series\n Second Act Productions",
            projRefs: 'Executive Producer - Lee Hupfield\n Director - Eddie Stafford \n  Art Director - Phoebe Deeprose',
            projectBGImage: 'projectS/person-of-interest/BGImage.png' 
      },
          {
            project: "Geordie Shore",
            projRole: "Art Department - Dailies",
            projDesc: "Reality TV \n Lime Pictures",
            projRefs: 'Producer Jamie Zwaig',
            projectBGImage: 'projectS/person-of-interest/BGImage.png' 
      },
          {
            project: "Prank King - Pilot",
            projRole: "Art Assistant",
            projDesc: "Reality TV \n ZigZag Productions",
            projRefs: 'Executive Producer - Andy Scott\n Producer - Wendi Rose\n  Art Director - Phoebe Deeprose',
            projectBGImage: 'projectS/person-of-interest/BGImage.png' 
      },
          {
            project: "Backyard Ballistics",
            projRole: "Art Department",
            projDesc: "Series \n ZigZag Productions",
            projRefs: 'Executive Producer - Andy Scott\n Producer - Wendi Rose\n  Producer - Rob Morris',
            projectBGImage: 'projectS/person-of-interest/BGImage.png' 
      }
      ];

      

// for loop controls the addition of the projects to the CV page
// have used a loop instead of forEach as the indexing is required
// also is a for loop quikcer?

for ( let i = 0; i <projects.length; i++) {

    

    const projectItem = document.createElement('li');
    projectItem.className = 'projectItem';

    const projectBGImage = document.createElement('img');
    projectBGImage.className = ('projectBGImage');
    projectBGImage.src = (projects[i].projectBGImage)
    
    const projectName = document.createElement('div'); // should it be an li?
    projectName.className = 'projectName';
    projectName.innerText = (projects[i].project);

    const projectRole = document.createElement('div'); // should it be an div?
    projectRole.className = 'projectRole';
    projectRole.innerText = (projects[i].projRole);
    
    const projectDescription = document.createElement('div'); // should it be an li?
    projectDescription.className = 'projectDescription';
    projectDescription.innerText = (projects[i].projDesc);
    
    const projectReferences = document.createElement('div'); // should it be an li?
    projectReferences.className = 'projectReferences';
    projectReferences.innerText = (projects[i].projRefs);

    projectItem.append(projectBGImage,projectName, projectRole, projectDescription, projectReferences);
    projectList.append(projectItem);
};

let projectsCommercial = [
    
       
      {
      project: "Noe & Associates",
      projRole: "Props",
      projDesc: "Corporate Office Letting Commercial",
      projRefs: 'Head Stylist - Hannah Cork',
      projectBGImage: 'projectS/person-of-interest/BGImage.png' 
    },
      {
      project: "Go Outdoors",
      projRole: "Art Director",
      projDesc: "Go Outdoors Retail Commercial",
      projRefs: 'Producer - Jess Motler\n Producer - Sophie Finnigan\nDirector - Phil Hawkins\n DOP - James Oldham',
      projectBGImage: 'projectS/person-of-interest/BGImage.png' 
    }
];

const projectListCommercial = document.createElement('ul');
      projectListCommercial.className = 'projectList';


for ( let i = 0; i <projectsCommercial.length; i++) {

    

    const projectItem = document.createElement('li');
    projectItem.className = 'projectItem';

    const projectBGImage = document.createElement('img');
    projectBGImage.className = ('projectBGImage');
    projectBGImage.src = (projectsCommercial[i].projectBGImage)
    
    const projectName = document.createElement('div'); // should it be an li?
    projectName.className = 'projectName';
    projectName.innerText = (projectsCommercial[i].project);

    const projectRole = document.createElement('div'); // should it be an div?
    projectRole.className = 'projectRole';
    projectRole.innerText = (projectsCommercial[i].projRole);
    
    const projectDescription = document.createElement('div'); // should it be an li?
    projectDescription.className = 'projectDescription';
    projectDescription.innerText = (projectsCommercial[i].projDesc);
    
    const projectReferences = document.createElement('div'); // should it be an li?
    projectReferences.className = 'projectReferences';
    projectReferences.innerText = (projectsCommercial[i].projRefs);

    projectItem.append(projectBGImage,projectName, projectRole, projectDescription, projectReferences);
    projectListCommercial.append(projectItem);
}
// Execute page selector program

pageSelector.content();







//footer.append() - links to contact, fun APIs, designed by me text


///*the other way to do this would be to stack entries? pushing onto the array and calling latest addition but not sure how to do this.


//this needs to be a function, and might be better suited to being an array




// api's to be listed on site - 
// surf forecast in UK areas
// exhibitions listed in London
// films listed at Castle cinema Hackney


///* stuff to do or has been done  - 

////job titel object

//data - 

//array of objects with named values, referenced by looped object constructor in main script

//tried and failed  - 

//const projectDetails = (jobTitle[i],jobRole[i],jobDesc[i],jobReferences[i]) => {



//     jobTitle : 'jobTitle';
//     // create an id and style it for this property
//     // repeat for each property
//     // needs to be grid css i think
//     // project name needs to be put in a container within the container
//     2 : 'projectName' ;
//     3 : 'description' ;
//     4 : 'references' ;

// }


// const Project = (projectDetails) => {

//     const jobTitle = [];
//     jobTitle.id = 'jobTitle';

//     const jobRole = [];
//     jobRole.id = 'jobRole';

//     const jobDesc = [];
//     jobDesc.id = 'jobDesc';

//     const jobReferences = [];
//     jobReferences.id = 'jobReferences';


  
//     document.createElement('li');
// projectDetails.id = 'project'[i];

// return projectDetails   };