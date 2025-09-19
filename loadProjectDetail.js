// loadProjectDetail.js (in root directory)

document.addEventListener('DOMContentLoaded', () => {
    const projectId = document.body.dataset.projectId;

    // --- START HARDCODED PROJECT DATA (MUST BE IDENTICAL TO loadProjects.js) ---
    const projects = [
        {
            "id": "keep-magazine",
            "title": "Keep Magazine",
            "tags": ["Creative Direction", "UI/UX", "Branding", "Editorial"],
            "description": "Keep Magazine is a <i>digital first</i>, bi-weekly publication at the junction of creatives. Each interview comes with an experience that is co-created and deeply personalised. We aim to create a level of connection and collaboration no other magazine has matched. We have interviewed the likes of <b>Dan Alves</b> and <b>Alex Clayton</b>.",
            "mainImage": "KeepMagazineGif.gif",
            "galleryImages": [
                { "src": "KeepMagazineImage.png", "class": "gallery-tall" },
                { "src": "KeepMagazineImage2.png" },
                { "src": "KeepMagazineImage3.png" },
            ],
            "externalLink": "https://keepmagazine.online/",
            "externalLinkHtml": `<span class="no-underline">See more at </span><a href="https://keepmagazine.online/">keepmagazine.online</a>`,
            "localLink": "project-keep.html"
        },
        {
            "id": "sui-generis",
            "title": "Sui Generis",
            "tags": ["Print", "Writing", "Type Design"],
            "description": "A <b>self-published zine</b> that flips inside out into a poster. A reminder to place ourselves in our work and <em>embrace our individuality</em>.<br> <br>Distributed locally. ",
            "mainImage": "SuiGenerisGif.gif",
            "galleryImages": [
                { "src": "SuiGenerisImage.png", "class": "gallery-tall" },
                { "src": "SuiGenerisGif.gif" },
                { "src": "SuiGenerisImage2.png" },
                { "src": "SuiGenerisImage3.png" },
            ],
            "externalLink": "SuiGenerisPDF.pdf",
            "externalLinkHtml": `<a href="SuiGenerisPDF.pdf" target="_blank"><span class="no-underline">Download the </span>PDF</a>`,
            "localLink": "project-suigeneris.html"
        },
        // --- NEW PROJECT: EDITORIALS ---
        {
            "id": "editorials",
            "title": "Editorials",
            "tags": ["Writing", "Publishing", "Layout Design"],
            "description": "A collection of editorials I've <b>designed and contributed to</b>, from a variety of publications.",
            "mainImage": "editorialsgif.gif",
            "galleryImages": [
                { "src": "editorial1.png" },
                { "src": "editorial2.png" },
                { "src": "editorial3.png" },
                { "src": "editorial4.png" },
                { "src": "editorial5.png" },
                { "src": "editorial6.png" },
                { "src": "editorial8.png" },
                { "src": "editorial10.png" }
            ],
            "localLink": "project-editorials.html"
        },
        // --- NEW PROJECT: CONTENT DESIGN ---
        {
            "id": "content-design",
            "title": "Content Design",
            "tags": ["UX", "Journalism", "Strategy"],
            "description": "Telling stories through <em>meaningful design</em> and presenting ideas in a way that resonates with an audience.<br> <br>These projects showcase engaging content that is both <b>visually appealing</b> and <b>informative</b>.",
            "mainImage": "contentdesigngif.gif",
            "galleryImages": [
                { "src": "ContentDesign1.mp4" },
                { "src": "ContentDesign3.mp4" },
                { "src": "ContentDesign2.mp4" },
            ],
            "externalLink": "https://www.instagram.com/madanivision/",
            "externalLinkHtml": `<span class="no-underline">See more on my </span><a href="https://www.instagram.com/madanivision/" target="_blank">Instagram</a>`,
            "localLink": "project-contentdesign.html"
        }
    ];
    // --- END HARDCODED PROJECT DATA ---


    if (!projectId) {
        console.error('Project ID not found in data-project-id attribute.');
        return;
    }

    const project = projects.find(p => p.id === projectId);
    if (project) {
        renderProjectDetail(project);
    } else {
        console.error(`Project with ID "${projectId}" not found in hardcoded data.`);
        const projectDetailSection = document.querySelector('.project-detail');
        if (projectDetailSection) {
            const galleryHtml = '';
            const externalLinkHtml = '';
            projectDetailSection.innerHTML = `
                <h1>Project Not Found</h1>
                <p>The project you are looking for could not be found.</p>
                <a href="portfolio.html" class="back-button no-underline">&larr; Back to Portfolio</a>
            `;
        }
    }

function renderProjectDetail(project) {
        document.title = `${project.title} — Madani`;

        const projectDetailSection = document.querySelector('.project-detail');
        if (!projectDetailSection) {
            console.error('Element with class .project-detail not found.');
            return;
        }

        const galleryHtml = project.galleryImages && project.galleryImages.length > 0 ? `
            <div class="gallery">
                ${project.galleryImages.map((imgData, index) => {
                    const src = typeof imgData === 'string' ? imgData : imgData.src;
                    const finalSrc = src.startsWith('http') ? src : src;
                    const itemClass = typeof imgData === 'object' && imgData.class ? imgData.class : '';
                    const fileExtension = src.split('.').pop().toLowerCase();

                    if (['mp4', 'webm', 'ogg'].includes(fileExtension)) {
                        return `<video src="${finalSrc}" alt="${project.title} gallery video ${index + 1}" class="${itemClass}" controls loop></video>`;
                    } else {
                        return `<img src="${finalSrc}" alt="${project.title} gallery image ${index + 1}" class="${itemClass}" />`;
                    }
                }).join('')}
            </div>
        ` : '';

        const finalExternalLink = project.externalLink && !project.externalLink.startsWith('http') ? project.externalLink : project.externalLink;

        let generatedExternalLinkHtml = ''; // Renamed variable to avoid confusion
        if (project.externalLink) {
            // If the project provides explicit HTML for the external link, use it directly.
            if (project.externalLinkHtml) {
                generatedExternalLinkHtml = project.externalLinkHtml;
            }
            // Fallback for projects that only define externalLink without custom HTML.
            // This will create a standard underlined link from the URL.
            else {
                generatedExternalLinkHtml = `<a href="${finalExternalLink}" target="_blank">${finalExternalLink}</a>`;
            }
            // Wrap the generated/provided HTML in the paragraph container.
            generatedExternalLinkHtml = `<p class="download-link-container">${generatedExternalLinkHtml}</p>`;
        }

        projectDetailSection.innerHTML = `
            <h1>${project.title}</h1>
            <div class="tags-container">
                ${project.tags.map(tag => `<span class="tag no-underline">${tag}</span>`).join('')}
            </div>
            <p class="grey-text">${project.description}</p>
            ${galleryHtml}
            ${generatedExternalLinkHtml}
        `;

        // The lightbox logic currently only works for images.
        // For videos, you might want a different lightbox behavior (e.g., a modal with video controls).
        // For now, videos won't open in the image lightbox.
        const galleryImages = projectDetailSection.querySelectorAll('.gallery img');
        galleryImages.forEach(img => {
            img.addEventListener('click', () => openLightbox(img.src));
        });

        // Optional: Add event listeners for videos if you want custom controls/interactions
        const galleryVideos = projectDetailSection.querySelectorAll('.gallery video');
        galleryVideos.forEach(video => {
            // Example: play/pause on click (if controls are hidden)
            // video.addEventListener('click', () => {
            //     if (video.paused) {
            //         video.play();
            //     } else {
            //         video.pause();
            //     }
            // });
        });
    }

    function openLightbox(src) {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');

        if (!lightbox || !lightboxImg) {
            console.error("Lightbox elements not found. Make sure lightbox HTML is included.");
            return;
        }

        // Only show images in lightbox for now. Videos won't work in this specific lightbox.
        const fileExtension = src.split('.').pop().toLowerCase();
        if (['mp4', 'webm', 'ogg'].includes(fileExtension)) {
            console.warn("Lightbox currently supports images only. Video will not open in lightbox.");
            return;
        }

        lightboxImg.src = src;
        lightbox.classList.add('show');
        document.body.style.overflow = 'hidden';

        lightbox.addEventListener('click', closeLightbox);
    }

    function closeLightbox() {
        const lightbox = document.getElementById('lightbox');
        if (lightbox) {
            lightbox.classList.remove('show');
            document.body.style.overflow = '';
            lightbox.removeEventListener('click', closeLightbox);
        }
    }
});