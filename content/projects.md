# Projects

<div class="project-cards">
    <div class="project-card" onclick="loadMarkdownContentExclusive('content/projects/vidscan/vidscan-description.md', 'main-column', ['markdown-1', 'markdown-dark-1'])">
        <h3>VidScan - 3D Scanning System based on video</h3>
        <div class="project-card-content">
            <p>VidScan to zaawansowany system generowania modeli 3D z nagrań wideo, wykorzystujący sieci neuronowe do segmentacji obiektów i fotogrametrię do rekonstrukcji trójwymiarowej.</p>
            <div class="project-card-tags">
                <span class="tag">skanowanie 3D</span>
                <span class="tag">fotogrametria</span>
                <span class="tag">modelowanie 3D</span>
                <span class="tag">sieci neuronowe</span>
            </div>
        </div>
    </div>
</div>

<style>
.project-cards {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 20px;
}

.project-card {
    flex: 1 1 300px;
    border: 1px solid #333;
    border-radius: 8px;
    padding: 15px;
    background-color: #222;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
    max-width: 100%;
}

.project-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.project-card h3 {
    margin-top: 0;
    color: #e0e0e0;
    border-bottom: 1px solid #444;
    padding-bottom: 10px;
}

.project-card-content {
    margin-top: 10px;
}

.project-card-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    margin-top: 15px;
}

.tag {
    background-color: #333;
    color: #ddd;
    border-radius: 4px;
    padding: 3px 8px;
    font-size: 0.8em;
}
</style> 