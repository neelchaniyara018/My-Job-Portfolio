document.addEventListener('DOMContentLoaded', function() {
    fetch('./services.json')
        .then(response => response.json())
        .then(services => {
            const sidebarContainer = document.querySelector('.service-sidebar-inner ul');
            const contentContainer = document.querySelector('.service-content-inner .service-items');

            // Clear existing content
            while (sidebarContainer.firstChild) {
                sidebarContainer.removeChild(sidebarContainer.firstChild);
            }
            while (contentContainer.firstChild) {
                contentContainer.removeChild(contentContainer.firstChild);
            }

            services.forEach(service => {
                // Populate sidebar
                const sidebarItem = document.createElement('li');
                sidebarItem.innerHTML = `
                    <i class="${service.icon} icon"></i>
                    ${service.title}
                `;
                sidebarContainer.appendChild(sidebarItem);

                // Populate main content
                const serviceElement = document.createElement('div');
                serviceElement.classList.add('service-item');
                serviceElement.innerHTML = `
                    <h3>${service.title}</h3>
                    <p>${service.description}</p>
                `;
                contentContainer.appendChild(serviceElement);
            });
        })
        .catch(error => console.error('Error fetching services:', error));
});