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

//const navBar1Item = document.createElement('li');
     // navBar1Item.className = 'navBar1Item';

const headerName = document.createElement('div');
      headerName.className = "headerName";
      headerName.innerText = `will birch.`; 

const headerCV = document.createElement('div');
      headerCV.className = "headerCV";
      headerCV.innerText = 'CV'

const listHeader = document.createElement('div');
      listHeader.className = 'listHeader';
      listHeader.innerText = "Film & TV";

const creditsHeader = document.createElement('div');
      creditsHeader.className = 'creditsHeader';
      creditsHeader.innerText = "Credits"; 
    

const projectContainer = document.createElement('div');
      projectContainer.id = 'projectsContainer' //this is the container grid styled element
// Function to control Navbar links on main page

const navBar1Items = [
    'Film & TV', 'Apps', 'Architecture'
]

for ( i = 0; i < navBar1Items.length; i++) {
    
    const navBar1Item = document.createElement('li');
    navBar1Item.className = 'navBar1Item';
    //navBar1Item.id = navBar1List[i];
    navBar1Item.innerText = (navBar1Items[i]);
    navBar1List.append(navBar1Item);
}

const projectList = document.createElement('ul');
      projectList.className = 'projectList';

// const projectItem = document.createElement('li');
//       projectItem.className = 'projectItem';
    
// Function to control Job list entries, designed to be easily editable via the data js filev cqwa2bz
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
          project: "Ruby",
          projRole: "Production Designer",
          projDesc: "Short Feature Channel 4",
          projRefs: 'Director - Aysha Rafaele \n Exec Producer - Joseph Bullman \n Producer - Meeshan Saxena'
        },
    
      ]

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

// return projectList

// }
       
console.log(projectList);

header.append(headerName);
header.append(navBar1);
navBar1.append(navBar1List);
// main.append(projectList);
// projectList.append()



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