//================================================================================
// Fetches markdown content and converts it to HTML 
//================================================================================

async function fetchMdContent(url)
{
    const response = await fetch(url);
    if (!response.ok) 
    {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.text();
}

function loadHtmlContent(path, elementId) 
{
    fetch(path)
        .then(response => response.text())
        .then(data => 
        {
            const container             = document.getElementById(elementId);
            const cardContainer         = document.createElement('div');
            cardContainer.innerHTML     = data;
            container.appendChild(cardContainer);
        })
        .catch(err => console.error('Failed to load page content', err));
}

function loadMarkdownContent(path, elementId, className) 
{
    const   container       = document.getElementById(elementId);
    let     cardContainer   = document.createElement('div');

            container.appendChild(cardContainer);

    fetch(path)
        .then(response => response.text())
        .then(markdown => {
            const converter = new showdown.Converter({tables: true});
            const html      = converter.makeHtml(markdown);
            cardContainer.className = className[0];
            for (let i = 1; i < className.length; i++) {
                cardContainer.classList.add(className[i]);
            }
            cardContainer.innerHTML = html;

            processCardContainer(cardContainer);
        })
        .catch(err => console.error('Failed to load markdown content', err));
}

//================================================================================
// Processes the card container
//================================================================================

function processCardContainer(container) 
{
    const images = container.querySelectorAll('img');

    // Add class to images based on alt text, format is 'class:alt'

    images.forEach(img => 
    {
        console.info('Processing image', img.src, 'with alt', img.alt);
        const section   = img.alt.split(':', 2);
        // add last section as alt 
        const alt       = section[section.length - 1]; 
        const classes   = section.slice(0, section.length - 1);        

        console.info('Adding classes', classes, 'to image', img.src, 'with alt', alt);
        img.alt         = alt;

        img.classList.add(...classes);
    });

    const links = container.querySelectorAll('a');
    links.forEach(link => 
    {
        if (link.href.endsWith('.md')) 
        {
            console.info('Found markdown link', link.href)
            const styleName = link.textContent;
            
            link.addEventListener('click', function(event) 
            {
                event.preventDefault();
                fetchMdContent(link.href)
                    .then(mdContent => 
                    {
                        const converter = new showdown.Converter({tables: true});
                        const html      = converter.makeHtml(mdContent);

                        let     cardContainer   = document.createElement('div');
                        cardContainer.className = 'markdown-1 markdown-dark-1';
                        cardContainer.innerHTML = html;

                        ref = document.getElementById("main-column");
                        if (ref) ref.appendChild(cardContainer);
                    });
            });
        }
        else if (link.href.startsWith('copy:'))
        {
          link.addEventListener('click', function(event) 
          {
            event.preventDefault();
            const textToCopy = this.getAttribute('href').slice(5);
            
            navigator.clipboard.writeText(textToCopy).then(() => 
            {
                console.log('Tekst skopiowany do schowka: ', textToCopy);
            })
            .catch(err => 
            {
                console.error('Błąd podczas kopiowania: ', err);
            });
          });
        };
    });
}

//================================================================================

