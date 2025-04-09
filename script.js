// iv chosen to create this website using purely JS whenever possible, i started out
// thinking this was the optimal way to do it, however i now think it is a bit convoluted

// this object uses various functions to deploy the correct JS script on whichever page is rendered
// I've done this using a simple switch although there m be better ways
//

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
                  console.warn('Missing Stuff');
                  return;
              }
            
            switch (page)     {
                  case 'index':
                        header.append(navBar1);
                        navBar1.append(navBar1List);
                        //make list go sideways
                        //add contact backend stuff
                        
                  break;
                  case 'filmtv' :
                        // header.append(navBar2);
                        main.append(projectList);
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
*/
const navBar1 = document.createElement('nav');
      navBar1.className = 'navBar1';

const navBar1List = document.createElement('ul');
      navBar1List.className = 'navbar1list';

const headerName = document.createElement('div');
      headerName.className = "headerName";
      headerName.innerText = `will birch.`; 

const headerCV = document.createElement('div');
      headerCV.className = "headerCV";
      headerCV.innerText = 'CV'

const filmTvHeader = document.createElement('div');
      filmTvHeader.className = 'filmTvHeader';
      filmTvHeader.innerText = "Film & TV";

const creditsHeader = document.createElement('div');
      creditsHeader.className = 'creditsHeader';
      creditsHeader.innerText = "Credits"; 
    

const projectContainer = document.createElement('div');
      projectContainer.id = 'projectsContainer' //this is the container grid styled element

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
  
      // Create the <a> tag
      const link = document.createElement('a');
      link.href = item.url;           
      link.textContent = item.name;   
      link.className = 'navLink';     
  
      // Append the link inside the <li> element
      navBar1Item.appendChild(link);
      navBar1List.appendChild(navBar1Item);

      
  });

const projectList = document.createElement('ul');
      projectList.className = 'projectList';

// const projectItem = document.createElement('li');
//       projectItem.className = 'projectItem';
    
// array of Objects to control Job list entries, designed to be easily editable top down
// const ProjectListEntries = (projects) =>  {

    let projects = [
    
        {
          project: "Karaoke",
          projRole: "Production Designer",
          projDesc: "Short Feature \n RagTag Productions",
          projRefs: 'Director - Ben  \n Producer - Aruhan '
        },
        {
          project: "Person of Interest",
          projRole: "Production Designer",
          projDesc: "Short Feature \n Channel 4",
          projRefs: 'Director - Aysha Rafaele \n Exec Producer - Joseph Bullman \n Producer - Meeshan Saxena'
        },
        {
          project: "Ruby",
          projRole: "Production Designer",
          projDesc: "Short Feature \n Channel 4",
          projRefs: 'Director - Aysha Rafaele \n Exec Producer - Joseph Bullman \n Producer - Meeshan Saxena'
        },
        {
          project: "White Belt",
          projRole: "Production Designer",
          projDesc: "Short Feature \n Ki Films",
          projRefs: 'Director - Beau Fowler \n Exec Producer - Andrew Koji \n Producer - David Mullenger'
        },
        {
          project: "Standing Set Studio Build",
          projRole: "Supervising Art Director",
          projDesc: "Brentford Studios",
          projRefs: 'Producer - Tara Llwellyn '
        },
        {
            project: "Phoenix Rise Season 4",
            projRole: "Art Director",
            projDesc: "Drama Series \n BBC",
            projRefs: 'Exec Producer - Mark Freeland \n Producer - Alison Matthews \n Production Designer - Kay Brown'
          },
        {
            project: "Phoenix Rise Season 3",
            projRole: "Art Director",
            projDesc: "Drama Series \n BBC",
            projRefs: 'Exec Producer - Mark Freeland \n Producer - Alison Matthews \n Production Designer - Kay Brown'
          },
        {
            project: "Kanneda",
            projRole: "Production Designer",
            projDesc: "Web Series \n BLack Cumin Pictures",
            projRefs: 'Director - Chandan Arora \n Exec Producer - Nitin Upadhyaya \n Producer - Tara Llewllyn'
          },
        {
            project: "Kadhal Konjam Thookala",
            projRole: "Art Director",
            projDesc: "Feature \n Cupid Films",
            projRefs: 'Director - Balaji Mohan \n Producer - Ashwani Chopra'
          },
        {
            project: "Trying Season 3",
            projRole: "Draughtsperson - Daily",
            projDesc: "Series \n Apple TV",
            projRefs: 'Prod Design - Charlotte Pearson \n Super Art Dir - Neil McAllister \n Art Director - Edd Cross'
          },
        {
            project: "Inside No. 9",
            projRole: "Art Director",
            projDesc: "Series \n Apple TV",
            projRefs: 'Prod Design - Charlotte Pearson \n Super Art Dir - Neil McAllister \n Art Director - Edd Cross'
          },
      ]

// for loop controls the addition of the projects to the CV page

for ( i = 0; i <projects.length; i++) {

    

    const projectItem = document.createElement('li');
    projectItem.className = 'projectItem';
    
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

    projectItem.append(projectName, projectRole, projectDescription, projectReferences);
    projectList.append(projectItem);
}

// Execute page selector program

pageSelector.content();



 




//footer.append() - links to contact, fun APIs, designed by me text


///*the other way to do this would be to stack entries? pushing onto the array and calling latest addition but not sure how to do this.


//this needs to be a function, and might be better suited to being an array

//overarching function which creates several functions within itself with 
//different styles
// a data js file as well as a functions js file?


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