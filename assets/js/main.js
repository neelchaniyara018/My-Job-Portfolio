;
(function($) {

    $(document).ready(function() {
        $(document).on('click', '.header-area .show-menu', function() {
            $(this).toggleClass('active');
            $(".header-area .navbar").toggleClass('active');
        });
        // $(document).on('click', '.header-area .navbar .close-menu', function() {
        //     $(".header-area .navbar").removeClass('active');
        // });

        AOS.init({
            duration: 1500,
            once: true,
        })
    });

})(jQuery);

// Google Analytics tracking code
// window.dataLayer = window.dataLayer || [];
// function gtag() {
//     dataLayer.push(arguments);
// }
// gtag('js', new Date());

// gtag('config', 'G-BRKLGXXY7G');

var div = document.createElement("div");
div.id = "preloader",
    div.className = "preloader",
    div.innerHTML = '<div class="black_wall"></div><div class="loader"></div>',
    document.body.insertBefore(div, document.body.firstChild), window.onload = function() {
        document.getElementById("preloader").classList.add("off")
    };

document.addEventListener('DOMContentLoaded', function() {
    fetch('./projects.json')
        .then(response => response.json())
        .then(projects => {
            const projectsContainer = document.getElementById('projectsContainer');

            projects.forEach(project => {
                const projectElement = document.createElement('div');
                projectElement.innerHTML = `
                    <h3>${project.title}</h3>
                    <img src="${project.image}" alt="${project.title}" />
                    <p>${project.description}</p>
                    <a href="${project.link}">View Project</a>
                `;

                projectsContainer.appendChild(projectElement);
            });
        })
        .catch(error => console.error('Error fetching projects:', error));
});




// document.addEventListener('DOMContentLoaded', function () {
//     fetch('./experience.json')
//         .then(response => response.json())
//         .then(experiences => {
//             const experienceContainer = document.querySelector('.credential-experience');

//             // Clear existing content
//             while (experienceContainer.firstChild) {
//                 experienceContainer.removeChild(experienceContainer.firstChild);
//             }

//             // Add title
//             const title = document.createElement('h2');
//             title.setAttribute('data-aos', 'fade-up');
//             title.textContent = 'Experience';
//             experienceContainer.appendChild(title);

//             experiences.forEach(experience => {
//                 const experienceElement = document.createElement('div');
//                 experienceElement.classList.add('credential-edc-exp-item');
//                 experienceElement.setAttribute('data-aos', 'zoom-in');
//                 experienceElement.innerHTML = `
//                     <h4>${experience.startDate} - ${experience.endDate}</h4>
//                     <h3>${experience.position}</h3>
//                     <h5>${experience.company}</h5>
//                     <p>${experience.description}</p>
//                 `;

//                 experienceContainer.appendChild(experienceElement);
//             });
//         })
//         .catch(error => console.error('Error fetching experiences:', error));
// });

let projectsDatabase = [];

function fetchProjectsDatabase() {
    return new Promise((resolve, reject) => {
        $.getJSON('./projects.json', function(data) {
            resolve(data);
        }).fail(function(error) {
            reject(error);
        });
    });
}

function getProjectById(projectId) {
    return projectsDatabase.find(project => project.project_title === projectId);
}

function populateProjectDetails(project) {
    console.log("project", project)

    // Assuming this function is called on the page where the section exists.
    // Getting the root of the section to populate
    const section = document.querySelector('.project-details-wrap');

    $('.breadcrumb-content p').text(project.headline);
    $('.breadcrumb-content h1').text(project.project_title);
    $('.breadcrumb-content a').attr('href', project.live_link).attr('target', '_blank');

    // Project images
    const projectImages = section.querySelectorAll('.project-details-img img');
    projectImages[0].src = `./assets/project-images/${project.project_title}/${project.images[0]}`;
    // projectImages[1].src = `./assets/images/${project.images[1]}`;

    // Project info wrap
    const infoWrap = section.querySelector('.project-infos-wrap');
    infoWrap.querySelector('.project-details-info h3').textContent = project.project_title;
    const descriptionDivs = infoWrap.querySelectorAll('.project-details-info p');
    descriptionDivs[0].textContent = project.description.abstract;

    const about = infoWrap.querySelectorAll('.project-details-info');
    const aboutUl = about[1].querySelector('ul');
    aboutUl.querySelector('li:nth-child(1) p').textContent = "Duration"
    aboutUl.querySelector('li:nth-child(1) h4').textContent = project.duration;
    aboutUl.querySelector('li:nth-child(2) h4').textContent = project.project_title;

    const serviceContainer = aboutUl.querySelector('li:nth-child(3)');

    for (let i = 0; i < project.services.length; i++) {
        const serviceElement = document.createElement('h4');
        serviceElement.innerHTML = `${project.services[i]}`;
        serviceContainer.append(serviceElement);
    }


    // Images in the middle of the page
    const middleImages = section.querySelectorAll('.project-details-2-img img, .project-details-3-img img');
    for (let i = 0; i < middleImages.length; i++) {
        middleImages[i].src = `./assets/project-images/${project.project_title}/${project.showcase_images[i]}`;
    }

    // Project about section
    // const about = section.querySelector('.project-about-2');
    // const aboutUl = about.querySelector('ul');
    // aboutUl.querySelector('li:nth-child(1) h4').textContent = project.duration;
    // aboutUl.querySelector('li:nth-child(2) h4').textContent = project.client;

    // const serviceContainer=aboutUl.querySelector('li:nth-child(3)');

    // for (let i = 0; i < project.services.length; i++) {
    //     const serviceElement = document.createElement('h4');
    //     serviceElement.innerHTML = `${project.services[i]}`;
    //     serviceContainer.append(serviceElement);
    // }
    // aboutUl.querySelector('li:nth-child(4) h4').textContent = project.techStackUsed.join(', ');

    const aboutRight = about.querySelector('.right-details');
    aboutRight.querySelector('h3').textContent = "Description";
    const aboutP = aboutRight.querySelectorAll('p');
    aboutP[0].textContent = project.description.abstract;

}

function initProjectDetails() {

    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('project');

    if (projectId) {
        const projectData = getProjectById(projectId);
        if (projectData) {
            populateProjectDetails(projectData);
        } else {
            console.error("Invalid Project ID");
        }
    }
}

fetchProjectsDatabase().then(data => {
    projectsDatabase = data;
    // initProjectDetails();
}).catch(error => {
    console.error("Error fetching projects data:", error);
});

// Resume card download feedback
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.resume-card').forEach(function (card) {
        card.addEventListener('click', function () {
            var icon = card.querySelector('.cta-icon');
            if (icon) {
                var original = icon.textContent;
                icon.textContent = '✓';
                setTimeout(function () { icon.textContent = original; }, 1800);
            }
        });
    });
});

