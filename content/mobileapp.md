# Aplikacje Mobilne

<div class="mobile-app-cards">
    <!-- Przykładowa karta aplikacji mobilnej - skopiuj i dostosuj dla każdej nowej aplikacji -->
    <!-- 
    <div class="mobile-app-card" onclick="loadMarkdownContentExclusive('content/mobileapps/nazwa-aplikacji/opis-aplikacji.md', 'main-column', ['markdown-1', 'markdown-dark-1'])">
        <h3>Nazwa Aplikacji - Krótki opis</h3>
        <div class="mobile-app-card-content">
            <p>Krótki opis aplikacji mobilnej, jej funkcjonalności i przeznaczenia.</p>
            <div class="mobile-app-card-tags">
                <span class="tag">iOS</span>
                <span class="tag">Android</span>
                <span class="tag">Swift</span>
                <span class="tag">Flutter</span>
            </div>
        </div>
    </div>
    -->
</div>

<style>
.mobile-app-cards {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 20px;
}

.mobile-app-card {
    flex: 1 1 300px;
    border: 1px solid #333;
    border-radius: 8px;
    padding: 15px;
    background-color: #222;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
    max-width: 100%;
}

.mobile-app-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.mobile-app-card h3 {
    margin-top: 0;
    color: #e0e0e0;
    border-bottom: 1px solid #444;
    padding-bottom: 10px;
}

.mobile-app-card-content {
    margin-top: 10px;
}

.mobile-app-card-tags {
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
