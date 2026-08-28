document.addEventListener('DOMContentLoaded', function() {
    fetch('./projects.json')
        .then(response => response.json())
        .then(projects => {
            const projectContainer = document.querySelector('.projects-area .row');

            while (projectContainer.firstChild) {
                projectContainer.removeChild(projectContainer.firstChild);
            }

            projects.forEach(project => {
                const projectItem = document.createElement('div');
                projectItem.className = "col-md-4";
                projectItem.setAttribute('data-aos', 'zoom-in');

                const projectMarkup = `
                    <div class="project-item shadow-box">
                       <!-- <a class="overlay-link" href="https://www.linkedin.com/in/neelchaniyara/recent-activity/all/""></a> -->

                        <a class="overlay-link" href="https://www.linkedin.com/in/neelchaniyara/recent-activity/all/""></a>
                        <img src="./assets/project-images/${project.pagename}/${project.images[0]}" alt="BG" class="bg-img">
                        <div class="project-img">
                            <img src="./assets/project-images/${project.pagename}/${project.showcase_images[0]}" alt="Project">
                        </div>
                        <div class="d-flex align-items-center justify-content-between">
                            <div class="project-info">
                                <p>${project.services[0]}</p>
                                <h1>${project.project_title}</h1>
                            </div>
                            <!-- <a href="https://www.linkedin.com/in/neelchaniyara/recent-activity/all/"" class="project-btn"> -->
                             <a href="https://www.linkedin.com/in/neelchaniyara/recent-activity/all/" class="project-btn">
                                <img src="./assets/images/icon.svg" alt="Button">
                            </a>
                        </div>
                    </div>
                `;

                projectItem.innerHTML = projectMarkup;
                projectContainer.appendChild(projectItem);
            });
        })
        .catch(error => console.error('Error fetching projects:', error));
});