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
        .then(markdown => 
        {
            console.info("=====================================")
            const baseUrl   = path.substring(0, path.lastIndexOf('/'));
            const converter = new showdown.Converter({
                                                        extensions: [createShowdownExtension(baseUrl)],
                                                        tables: true
                                                    });            
            const html      = converter.makeHtml(markdown);
            console.info("=====================================")
            cardContainer.className = className[0];

            for (let i = 1; i < className.length; i++) 
            {
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

    // ..........................................................................
    // Add class to images based on alt text, format is 'class1:class2: ... :alt'
    // ..........................................................................

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

    // ..........................................................................
    // Add class to link based on link text, format is 'class1:class2: ... :text'
    // ..........................................................................

    const a_sect = container.querySelectorAll('a');
    a_sect.forEach(a => 
    {
        // check if a has href
        if(a.href) 
        {
            console.info('Processing link', a.href, 'with text', a.textContent);
            const section   = a.textContent.split(':', 2);
            // add last section as text
            const text      = section[section.length - 1];
            const classes   = section.slice(0, section.length - 1);

            console.info('Adding classes', classes, 'to link', a.href, 'with text', text);

            a.textContent = text;
            a.classList.add(...classes);
        }
    });

    // ..........................................................................
    // capture clicks on markdown links and fetch content and convert to HTML
    // ..........................................................................

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
                        console.info("=====================================")
                        const baseUrl   = link.href.substring(0, link.href.lastIndexOf('/'));
                        const converter = new showdown.Converter({
                                                                    extensions: [createShowdownExtension(baseUrl)],
                                                                    tables: true
                                                                });
                        const html      = converter.makeHtml(mdContent);
                        console.info("=====================================")

                        let     cardContainer   = document.createElement('div');
                        cardContainer.className = 'markdown-1 markdown-dark-1';
                        cardContainer.innerHTML = html;

                        ref = document.getElementById("main-column");
                        if (ref) ref.appendChild(cardContainer);
                    });
            });
        }
    });
}

//================================================================================

function createShowdownExtension(baseUrl) 
{
    return [
        {
            type: 'lang',
            regex: /\[([^\]]+)\]\((?!http)([^)]+)\)/g,
            replace: function(match, text, link) 
            {
                // if link starts with ./ or ../ then it is a relative link

                console.info('Processing link', link, 'with text', text, 'and baseUrl', baseUrl)

                if (link.startsWith('./')) 
                {
                    return '[' + text + '](' + baseUrl + '/' + link + ')';
                }
                else if (link.startsWith('../')) 
                {
                    let   linkUp     = link
                    let   baseUrlUp  = baseUrl
                    
                    while(linkUp.startsWith('../'))
                    {
                        linkUp      = linkUp.substring(0, linkUp.lastIndexOf('/'));
                        baseUrlUp   = baseUrlUp.substring(0, baseUrl.lastIndexOf('/'));
                    }
                    
                    return '[' + text + '](' + baseUrlUp + '/' + linkUp + ')';
                }
                else
                {
                    return '[' + text + '](' + link + ')';
                }
            }
        }
    ];
}

//================================================================================
