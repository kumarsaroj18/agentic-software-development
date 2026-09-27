// App logic for Code Issues webapp

// Global state
let searchIndex = [];
let searchModal = null;
let searchInput = null;
let searchResults = null;
let highlightedIndex = -1;
let currentResults = [];
let selectedCard = null;
let keyboardFocusedCard = null;
let keyboardFocusIndex = -1;
let visibleCards = [];

// Tab switcher state
let tabSwitcherModal = null;
let tabSwitcherInput = null;
let tabSwitcherResults = null;
let tabSwitcherHighlightedIndex = 0;
let tabSwitcherCurrentResults = [];
let allTabs = [];

// Filter state per tab
let tabFilters = {}; // { tabName: { agentRecommended: Set, areaPillar: Set } }

function initApp() {
    const tabsContainer = document.getElementById('tabs');
    const contentContainer = document.getElementById('content');

    // Create header shortcuts container
    const headerShortcuts = document.createElement('div');
    headerShortcuts.className = 'header-shortcuts';
    
    const isMac = navigator.platform.includes('Mac');
    const modKey = isMac ? '⌘' : 'Ctrl';

    // Search shortcut button
    const searchBtn = document.createElement('button');
    searchBtn.className = 'shortcut-btn';
    searchBtn.innerHTML = `<span>🔍 Search</span><kbd>${modKey}+K</kbd>`;
    searchBtn.onclick = openSearchModal;
    headerShortcuts.appendChild(searchBtn);

    // Tab switcher shortcut button
    const tabBtn = document.createElement('button');
    tabBtn.className = 'shortcut-btn';
    tabBtn.innerHTML = `<span>📑 Tabs</span><kbd>${modKey}+⇧+K</kbd>`;
    tabBtn.onclick = openTabSwitcher;
    headerShortcuts.appendChild(tabBtn);

    tabsContainer.parentElement.insertBefore(headerShortcuts, tabsContainer);

    // Create tabs
    const tabNames = Object.keys(DATA);
    tabNames.forEach((tabName, index) => {
        const btn = document.createElement('button');
        btn.className = 'tab-btn' + (index === 0 ? ' active' : '');
        btn.innerHTML = `${tabName}<span class="count-badge">${DATA[tabName].length}</span>`;
        btn.onclick = () => switchTab(tabName);
        tabsContainer.appendChild(btn);
        
        // Build tabs list for switcher
        allTabs.push({
            name: tabName,
            count: DATA[tabName].length
        });
        
        // Initialize filter state for this tab
        tabFilters[tabName] = {
            agentRecommended: new Set(),
            areaPillar: new Set()
        };
    });

    // Create content sections and build search index
    let cardIndex = 0;
    tabNames.forEach((tabName, index) => {
        const section = document.createElement('section');
        section.id = `tab-${tabName.replace(/[^a-zA-Z0-9]/g, '-')}`;
        section.className = 'tab-content' + (index === 0 ? ' active' : '');

        // Extract unique values for this tab
        const tabData = DATA[tabName];
        const uniqueAgentRecommended = new Map(); // value -> count
        const uniqueAreaPillar = new Map(); // value -> count

        tabData.forEach(item => {
            const agent = item["Coding Agent Recommended"];
            const area = item["Area / Pillar"];
            
            if (agent) {
                uniqueAgentRecommended.set(agent, (uniqueAgentRecommended.get(agent) || 0) + 1);
            }
            if (area) {
                // Area can have multiple values separated by comma
                area.split(',').forEach(a => {
                    const trimmed = a.trim();
                    if (trimmed) {
                        uniqueAreaPillar.set(trimmed, (uniqueAreaPillar.get(trimmed) || 0) + 1);
                    }
                });
            }
        });

        // Create filters section
        const filtersSection = createFiltersSection(tabName, uniqueAgentRecommended, uniqueAreaPillar);
        section.appendChild(filtersSection);

        // Add count info with clear filters button
        const countInfo = document.createElement('div');
        countInfo.className = 'count-info';
        countInfo.id = `count-info-${tabName.replace(/[^a-zA-Z0-9]/g, '-')}`;
        countInfo.innerHTML = `
            <span class="count-text"><strong>Showing ${tabData.length} cards</strong></span>
            <button class="clear-filters" onclick="clearFilters('${tabName}')">Clear Filters</button>
        `;
        section.appendChild(countInfo);

        const grid = document.createElement('div');
        grid.className = 'cards-grid';
        grid.id = `grid-${tabName.replace(/[^a-zA-Z0-9]/g, '-')}`;

        let cardCount = 0;
        tabData.forEach((item, itemIndex) => {
            const card = createCard(item, tabName, cardIndex);
            if (card) {
                grid.appendChild(card);
                cardCount++;
                
                // Add to search index
                const title = item["Code Issue / Anti-Pattern Identified"];
                if (title) {
                    searchIndex.push({
                        title: title,
                        tabName: tabName,
                        cardId: `card-${cardIndex}`,
                        searchText: Object.values(item).join(' ').toLowerCase()
                    });
                }
                cardIndex++;
            }
        });

        section.appendChild(grid);
        contentContainer.appendChild(section);
    });

    // Create modals
    createSearchModal();
    createTabSwitcherModal();
    
    // Setup keyboard shortcuts
    setupKeyboardShortcuts();
    
    // Update visible cards for the initial tab
    updateVisibleCards();
}

function createFiltersSection(tabName, agentRecommendedMap, areaPillarMap) {
    const filtersSection = document.createElement('div');
    filtersSection.className = 'filters-section';
    filtersSection.id = `filters-${tabName.replace(/[^a-zA-Z0-9]/g, '-')}`;

    // Agent Recommended filters
    if (agentRecommendedMap.size > 0) {
        const agentGroup = document.createElement('div');
        agentGroup.className = 'filter-group';
        agentGroup.innerHTML = '<span class="filter-group-label">Coding Agent Recommended</span>';
        
        const agentTags = document.createElement('div');
        agentTags.className = 'filter-tags';
        
        // Sort by a logical order: Yes, Partial, Not required
        const sortOrder = ['✅ Yes', '⚠️ Partial', '❌ Not required'];
        const sortedAgents = [...agentRecommendedMap.entries()].sort((a, b) => {
            const aIdx = sortOrder.findIndex(s => a[0].includes(s.replace(/[✅⚠️❌]\s*/, '')));
            const bIdx = sortOrder.findIndex(s => b[0].includes(s.replace(/[✅⚠️❌]\s*/, '')));
            return (aIdx === -1 ? 999 : aIdx) - (bIdx === -1 ? 999 : bIdx);
        });
        
        sortedAgents.forEach(([value, count]) => {
            const tag = document.createElement('button');
            let tagClass = 'agent-no';
            if (value.includes('Yes')) tagClass = 'agent-yes';
            else if (value.includes('Partial')) tagClass = 'agent-partial';
            
            tag.className = `filter-tag ${tagClass}`;
            tag.dataset.filterType = 'agentRecommended';
            tag.dataset.filterValue = value;
            tag.innerHTML = `${escapeHtml(value)} <span class="filter-count">${count}</span>`;
            tag.onclick = () => toggleFilter(tabName, 'agentRecommended', value, tag);
            agentTags.appendChild(tag);
        });
        
        agentGroup.appendChild(agentTags);
        filtersSection.appendChild(agentGroup);
    }

    // Area/Pillar filters
    if (areaPillarMap.size > 0) {
        const areaGroup = document.createElement('div');
        areaGroup.className = 'filter-group';
        areaGroup.innerHTML = '<span class="filter-group-label">Area / Pillar</span>';
        
        const areaTags = document.createElement('div');
        areaTags.className = 'filter-tags';
        
        // Sort alphabetically
        const sortedAreas = [...areaPillarMap.entries()].sort((a, b) => a[0].localeCompare(b[0]));
        
        sortedAreas.forEach(([value, count]) => {
            const tag = document.createElement('button');
            tag.className = 'filter-tag area';
            tag.dataset.filterType = 'areaPillar';
            tag.dataset.filterValue = value;
            tag.innerHTML = `${escapeHtml(value)} <span class="filter-count">${count}</span>`;
            tag.onclick = () => toggleFilter(tabName, 'areaPillar', value, tag);
            areaTags.appendChild(tag);
        });
        
        areaGroup.appendChild(areaTags);
        filtersSection.appendChild(areaGroup);
    }

    return filtersSection;
}

function toggleFilter(tabName, filterType, value, tagElement) {
    const filters = tabFilters[tabName][filterType];
    
    if (filters.has(value)) {
        filters.delete(value);
        tagElement.classList.remove('active');
    } else {
        filters.add(value);
        tagElement.classList.add('active');
    }
    
    applyFilters(tabName);
}

function clearFilters(tabName) {
    // Clear filter state
    tabFilters[tabName].agentRecommended.clear();
    tabFilters[tabName].areaPillar.clear();
    
    // Clear active state from all filter tags in this tab
    const section = document.getElementById(`tab-${tabName.replace(/[^a-zA-Z0-9]/g, '-')}`);
    section.querySelectorAll('.filter-tag.active').forEach(tag => {
        tag.classList.remove('active');
    });
    
    applyFilters(tabName);
}

function applyFilters(tabName) {
    const gridId = `grid-${tabName.replace(/[^a-zA-Z0-9]/g, '-')}`;
    const grid = document.getElementById(gridId);
    const cards = grid.querySelectorAll('.card');
    
    const agentFilters = tabFilters[tabName].agentRecommended;
    const areaFilters = tabFilters[tabName].areaPillar;
    
    const hasFilters = agentFilters.size > 0 || areaFilters.size > 0;
    
    let visibleCount = 0;
    
    cards.forEach(card => {
        const cardAgent = card.dataset.agentRecommended || '';
        const cardArea = card.dataset.areaPillar || '';
        
        let matchesAgent = agentFilters.size === 0 || agentFilters.has(cardAgent);
        
        // For area, check if any of the card's areas match any of the filters
        let matchesArea = areaFilters.size === 0;
        if (!matchesArea && cardArea) {
            const cardAreas = cardArea.split(',').map(a => a.trim());
            matchesArea = cardAreas.some(a => areaFilters.has(a));
        }
        
        const visible = matchesAgent && matchesArea;
        card.style.display = visible ? 'block' : 'none';
        if (visible) visibleCount++;
    });
    
    // Update count display
    const countInfo = document.getElementById(`count-info-${tabName.replace(/[^a-zA-Z0-9]/g, '-')}`);
    const totalCount = cards.length;
    
    if (hasFilters) {
        countInfo.classList.add('has-filters');
        countInfo.querySelector('.count-text').innerHTML = `<strong>Showing ${visibleCount} of ${totalCount} cards</strong> (filtered)`;
    } else {
        countInfo.classList.remove('has-filters');
        countInfo.querySelector('.count-text').innerHTML = `<strong>Showing ${totalCount} cards</strong>`;
    }
    
    // Update visible cards for keyboard navigation
    updateVisibleCards();
}

function createCard(item, tabName, cardIndex) {
    const title = item["Code Issue / Anti-Pattern Identified"];
    const description = item["What the Issue Is"];
    const topic = item["Topic / Framework(s)"];
    const area = item["Area / Pillar"];
    const agentRecommended = item["Coding Agent Recommended"];
    const tools = item["Non-AI Open Source Tool(s)"];
    const whyMatters = item["Why This Matters"];

    if (!title) return null;

    const card = document.createElement('div');
    card.className = 'card';
    card.id = `card-${cardIndex}`;
    card.dataset.searchText = Object.values(item).join(' ').toLowerCase();
    card.dataset.tabName = tabName;
    card.dataset.agentRecommended = agentRecommended || '';
    card.dataset.areaPillar = area || '';
    card.tabIndex = 0;
    card.onclick = () => selectCard(card);

    let agentClass = 'tag-agent-no';
    if (agentRecommended) {
        if (agentRecommended.includes('Yes')) {
            agentClass = 'tag-agent-yes';
        } else if (agentRecommended.includes('Partial')) {
            agentClass = 'tag-agent-partial';
        }
    }

    let html = `<div class="card-title">${escapeHtml(title)}</div>`;
    
    if (description) {
        html += `<div class="card-field">
            <span class="card-field-label">What the Issue Is</span>
            <span class="card-field-value">${escapeHtml(description)}</span>
        </div>`;
    }

    if (topic) {
        html += `<div class="card-field">
            <span class="card-field-label">Topic / Framework(s)</span>
            <span class="card-field-value tag-value tag-topic">${escapeHtml(topic)}</span>
        </div>`;
    }

    if (area) {
        html += `<div class="card-field">
            <span class="card-field-label">Area / Pillar</span>
            <span class="card-field-value tag-value tag-area">${escapeHtml(area)}</span>
        </div>`;
    }

    if (agentRecommended) {
        html += `<div class="card-field">
            <span class="card-field-label">Coding Agent Recommended</span>
            <span class="card-field-value tag-value ${agentClass}">${escapeHtml(agentRecommended)}</span>
        </div>`;
    }

    if (tools && tools !== 'None') {
        html += `<div class="card-field">
            <span class="card-field-label">Non-AI Open Source Tool(s)</span>
            <span class="card-field-value tools-value">${escapeHtml(tools)}</span>
        </div>`;
    }

    if (whyMatters) {
        html += `<div class="card-field why-matters-field">
            <span class="card-field-label">Why This Matters</span>
            <span class="card-field-value">${escapeHtml(whyMatters)}</span>
        </div>`;
    }

    card.innerHTML = html;
    return card;
}

// ==================== SEARCH MODAL ====================

function createSearchModal() {
    const overlay = document.createElement('div');
    overlay.className = 'search-modal-overlay';
    overlay.id = 'search-modal-overlay';
    overlay.onclick = (e) => {
        if (e.target === overlay) closeSearchModal();
    };

    overlay.innerHTML = `
        <div class="search-modal">
            <div class="search-modal-header">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input type="text" class="search-modal-input" id="global-search-input" placeholder="Search all code issues..." autocomplete="off">
                <span class="search-modal-shortcut">ESC</span>
            </div>
            <div class="search-modal-results" id="search-modal-results">
                <div class="search-modal-empty">Type to search across all ${searchIndex.length} code issues</div>
            </div>
            <div class="search-modal-footer">
                <span><kbd>↑</kbd> <kbd>↓</kbd> Navigate</span>
                <span><kbd>Enter</kbd> Select</span>
                <span><kbd>ESC</kbd> Close</span>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);
    
    searchModal = overlay;
    searchInput = document.getElementById('global-search-input');
    searchResults = document.getElementById('search-modal-results');

    searchInput.addEventListener('input', handleSearchInput);
    searchInput.addEventListener('keydown', handleSearchKeydown);
}

function openSearchModal() {
    searchModal.classList.add('active');
    highlightedIndex = -1;
    currentResults = [];
    searchResults.innerHTML = `<div class="search-modal-empty">Type to search across all ${searchIndex.length} code issues</div>`;
    
    setTimeout(() => {
        searchInput.value = '';
        searchInput.focus();
    }, 50);
}

function closeSearchModal() {
    searchModal.classList.remove('active');
    searchInput.value = '';
}

function handleSearchInput(e) {
    const query = e.target.value.trim().toLowerCase();
    
    if (query.length === 0) {
        searchResults.innerHTML = `<div class="search-modal-empty">Type to search across all ${searchIndex.length} code issues</div>`;
        currentResults = [];
        highlightedIndex = -1;
        return;
    }

    currentResults = fuzzySearch(query, searchIndex, 'title');
    highlightedIndex = currentResults.length > 0 ? 0 : -1;
    
    renderSearchResults(query);
}

function renderSearchResults(query) {
    if (currentResults.length === 0) {
        searchResults.innerHTML = `<div class="search-modal-empty">No results found for "${escapeHtml(query)}"</div>`;
        return;
    }

    const html = currentResults.map((result, index) => {
        const highlightedTitle = highlightMatches(result.title, query);
        const isHighlighted = index === highlightedIndex ? 'highlighted' : '';
        
        return `
            <div class="search-result-item ${isHighlighted}" data-index="${index}" onclick="selectSearchResult(${index})">
                <div class="search-result-title">${highlightedTitle}</div>
                <div class="search-result-tab">
                    <span class="search-result-tab-name">${escapeHtml(result.tabName)}</span>
                </div>
            </div>
        `;
    }).join('');

    searchResults.innerHTML = html;
}

function handleSearchKeydown(e) {
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (currentResults.length > 0) {
            highlightedIndex = (highlightedIndex + 1) % currentResults.length;
            updateSearchHighlight();
        }
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (currentResults.length > 0) {
            highlightedIndex = highlightedIndex <= 0 ? currentResults.length - 1 : highlightedIndex - 1;
            updateSearchHighlight();
        }
    } else if (e.key === 'Enter') {
        e.preventDefault();
        if (highlightedIndex >= 0 && currentResults[highlightedIndex]) {
            selectSearchResult(highlightedIndex);
        }
    }
}

function updateSearchHighlight() {
    const items = searchResults.querySelectorAll('.search-result-item');
    items.forEach((item, index) => {
        item.classList.toggle('highlighted', index === highlightedIndex);
    });
    
    const highlighted = searchResults.querySelector('.search-result-item.highlighted');
    if (highlighted) {
        highlighted.scrollIntoView({ block: 'nearest' });
    }
}

function selectSearchResult(index) {
    const result = currentResults[index];
    if (!result) return;
    
    closeSearchModal();
    switchTab(result.tabName);
    
    setTimeout(() => {
        const card = document.getElementById(result.cardId);
        if (card) {
            clearCardSelection();
            card.classList.add('selected');
            selectedCard = card;
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            updateVisibleCards();
        }
    }, 100);
}

// ==================== TAB SWITCHER MODAL ====================

function createTabSwitcherModal() {
    const overlay = document.createElement('div');
    overlay.className = 'tab-switcher-overlay';
    overlay.id = 'tab-switcher-overlay';
    overlay.onclick = (e) => {
        if (e.target === overlay) closeTabSwitcher();
    };

    overlay.innerHTML = `
        <div class="tab-switcher-modal">
            <div class="tab-switcher-header">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                <input type="text" class="tab-switcher-input" id="tab-switcher-input" placeholder="Switch to tab..." autocomplete="off">
                <span class="search-modal-shortcut">ESC</span>
            </div>
            <div class="tab-switcher-results" id="tab-switcher-results"></div>
            <div class="tab-switcher-footer">
                <span><kbd>↑</kbd> <kbd>↓</kbd> Navigate</span>
                <span><kbd>Enter</kbd> Select</span>
                <span><kbd>ESC</kbd> Close</span>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);
    
    tabSwitcherModal = overlay;
    tabSwitcherInput = document.getElementById('tab-switcher-input');
    tabSwitcherResults = document.getElementById('tab-switcher-results');

    tabSwitcherInput.addEventListener('input', handleTabSwitcherInput);
    tabSwitcherInput.addEventListener('keydown', handleTabSwitcherKeydown);
}

function openTabSwitcher() {
    tabSwitcherModal.classList.add('active');
    tabSwitcherHighlightedIndex = 0;
    tabSwitcherCurrentResults = [...allTabs];
    renderTabSwitcherResults('');
    
    setTimeout(() => {
        tabSwitcherInput.value = '';
        tabSwitcherInput.focus();
    }, 50);
}

function closeTabSwitcher() {
    tabSwitcherModal.classList.remove('active');
    tabSwitcherInput.value = '';
}

function handleTabSwitcherInput(e) {
    const query = e.target.value.trim().toLowerCase();
    
    if (query.length === 0) {
        tabSwitcherCurrentResults = [...allTabs];
    } else {
        tabSwitcherCurrentResults = fuzzySearchTabs(query);
    }
    
    tabSwitcherHighlightedIndex = tabSwitcherCurrentResults.length > 0 ? 0 : -1;
    renderTabSwitcherResults(query);
}

function fuzzySearchTabs(query) {
    const queryLower = query.toLowerCase();
    
    return allTabs
        .map(tab => {
            const nameLower = tab.name.toLowerCase();
            let score = 0;
            
            if (nameLower.includes(queryLower)) {
                score += 100;
                if (nameLower.startsWith(queryLower)) {
                    score += 50;
                }
            }
            
            score += fuzzyMatch(queryLower, nameLower);
            
            return { ...tab, score };
        })
        .filter(tab => tab.score > 0)
        .sort((a, b) => b.score - a.score);
}

function renderTabSwitcherResults(query) {
    const activeTabName = getActiveTabName();
    
    const html = tabSwitcherCurrentResults.map((tab, index) => {
        const highlightedName = query ? highlightMatches(tab.name, query) : escapeHtml(tab.name);
        const isHighlighted = index === tabSwitcherHighlightedIndex ? 'highlighted' : '';
        const isActive = tab.name === activeTabName ? 'active-tab' : '';
        
        return `
            <div class="tab-switcher-item ${isHighlighted} ${isActive}" data-index="${index}" onclick="selectTabFromSwitcher(${index})">
                <span class="tab-switcher-item-name">${highlightedName}</span>
                <span class="tab-switcher-item-count">${tab.count}</span>
            </div>
        `;
    }).join('');

    tabSwitcherResults.innerHTML = html || '<div class="search-modal-empty">No matching tabs</div>';
}

function handleTabSwitcherKeydown(e) {
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (tabSwitcherCurrentResults.length > 0) {
            tabSwitcherHighlightedIndex = (tabSwitcherHighlightedIndex + 1) % tabSwitcherCurrentResults.length;
            updateTabSwitcherHighlight();
        }
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (tabSwitcherCurrentResults.length > 0) {
            tabSwitcherHighlightedIndex = tabSwitcherHighlightedIndex <= 0 ? tabSwitcherCurrentResults.length - 1 : tabSwitcherHighlightedIndex - 1;
            updateTabSwitcherHighlight();
        }
    } else if (e.key === 'Enter') {
        e.preventDefault();
        if (tabSwitcherHighlightedIndex >= 0 && tabSwitcherCurrentResults[tabSwitcherHighlightedIndex]) {
            selectTabFromSwitcher(tabSwitcherHighlightedIndex);
        }
    }
}

function updateTabSwitcherHighlight() {
    const items = tabSwitcherResults.querySelectorAll('.tab-switcher-item');
    items.forEach((item, index) => {
        item.classList.toggle('highlighted', index === tabSwitcherHighlightedIndex);
    });
    
    const highlighted = tabSwitcherResults.querySelector('.tab-switcher-item.highlighted');
    if (highlighted) {
        highlighted.scrollIntoView({ block: 'nearest' });
    }
}

function selectTabFromSwitcher(index) {
    const tab = tabSwitcherCurrentResults[index];
    if (!tab) return;
    
    closeTabSwitcher();
    switchTab(tab.name);
}

function getActiveTabName() {
    const activeSection = document.querySelector('.tab-content.active');
    if (!activeSection) return '';
    
    for (const tab of allTabs) {
        const expectedId = `tab-${tab.name.replace(/[^a-zA-Z0-9]/g, '-')}`;
        if (activeSection.id === expectedId) {
            return tab.name;
        }
    }
    return '';
}

// ==================== KEYBOARD NAVIGATION ====================

function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        const isModalOpen = searchModal.classList.contains('active') || tabSwitcherModal.classList.contains('active');
        
        if ((e.metaKey || e.ctrlKey) && !e.shiftKey && e.key === 'k') {
            e.preventDefault();
            if (tabSwitcherModal.classList.contains('active')) {
                closeTabSwitcher();
            }
            openSearchModal();
            return;
        }
        
        if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'k') {
            e.preventDefault();
            if (searchModal.classList.contains('active')) {
                closeSearchModal();
            }
            openTabSwitcher();
            return;
        }
        
        if (e.key === 'Escape') {
            if (searchModal.classList.contains('active')) {
                closeSearchModal();
                return;
            }
            if (tabSwitcherModal.classList.contains('active')) {
                closeTabSwitcher();
                return;
            }
            clearKeyboardFocus();
            return;
        }
        
        if (!isModalOpen && !isInputFocused()) {
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                navigateCards(1);
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                navigateCards(-1);
            } else if (e.key === 'Enter' && keyboardFocusedCard) {
                e.preventDefault();
                selectCard(keyboardFocusedCard);
            }
        }
    });
}

function isInputFocused() {
    const active = document.activeElement;
    return active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA');
}

function updateVisibleCards() {
    const activeSection = document.querySelector('.tab-content.active');
    if (!activeSection) {
        visibleCards = [];
        return;
    }
    
    const grid = activeSection.querySelector('.cards-grid');
    if (!grid) {
        visibleCards = [];
        return;
    }
    
    visibleCards = Array.from(grid.querySelectorAll('.card')).filter(card => {
        return card.style.display !== 'none';
    });
    
    keyboardFocusIndex = -1;
    clearKeyboardFocus();
}

function navigateCards(direction) {
    if (visibleCards.length === 0) {
        updateVisibleCards();
        if (visibleCards.length === 0) return;
    }
    
    if (keyboardFocusIndex === -1) {
        keyboardFocusIndex = direction > 0 ? 0 : visibleCards.length - 1;
    } else {
        keyboardFocusIndex += direction;
        if (keyboardFocusIndex < 0) {
            keyboardFocusIndex = visibleCards.length - 1;
        } else if (keyboardFocusIndex >= visibleCards.length) {
            keyboardFocusIndex = 0;
        }
    }
    
    clearKeyboardFocus();
    keyboardFocusedCard = visibleCards[keyboardFocusIndex];
    if (keyboardFocusedCard) {
        keyboardFocusedCard.classList.add('keyboard-focus');
        keyboardFocusedCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function clearKeyboardFocus() {
    if (keyboardFocusedCard) {
        keyboardFocusedCard.classList.remove('keyboard-focus');
    }
    keyboardFocusedCard = null;
}

// ==================== CARD SELECTION ====================

function selectCard(card) {
    clearKeyboardFocus();
    
    if (selectedCard === card) {
        card.classList.remove('selected');
        selectedCard = null;
        return;
    }
    
    clearCardSelection();
    card.classList.add('selected');
    selectedCard = card;
}

function clearCardSelection() {
    if (selectedCard) {
        selectedCard.classList.remove('selected');
        selectedCard = null;
    }
}

// ==================== TAB SWITCHING ====================

function switchTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(section => section.classList.remove('active'));

    const targetId = `tab-${tabName.replace(/[^a-zA-Z0-9]/g, '-')}`;
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    document.querySelectorAll('.tab-btn').forEach(btn => {
        if (btn.textContent.startsWith(tabName)) btn.classList.add('active');
    });
    
    updateVisibleCards();
}

// ==================== UTILITIES ====================

function fuzzySearch(query, items, field) {
    const queryLower = query.toLowerCase();
    const queryWords = queryLower.split(/\s+/).filter(w => w.length > 0);
    
    return items.map(item => {
        let score = 0;
        const fieldValue = item[field].toLowerCase();
        const searchText = item.searchText || fieldValue;
        
        if (fieldValue.includes(queryLower)) {
            score += 100;
            if (fieldValue.startsWith(queryLower)) {
                score += 50;
            }
        }
        
        queryWords.forEach(word => {
            if (fieldValue.includes(word)) {
                score += 30;
            }
            if (searchText.includes(word)) {
                score += 10;
            }
        });
        
        score += fuzzyMatch(queryLower, fieldValue);
        
        return { ...item, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 20);
}

function fuzzyMatch(query, text) {
    let score = 0;
    let queryIndex = 0;
    let consecutiveMatches = 0;
    
    for (let i = 0; i < text.length && queryIndex < query.length; i++) {
        if (text[i] === query[queryIndex]) {
            score += 1 + consecutiveMatches;
            consecutiveMatches++;
            queryIndex++;
        } else {
            consecutiveMatches = 0;
        }
    }
    
    if (queryIndex === query.length) {
        score += 10;
    }
    
    return score;
}

function highlightMatches(text, query) {
    const escaped = escapeHtml(text);
    const queryLower = query.toLowerCase();
    const textLower = escaped.toLowerCase();
    
    const queryIndex = textLower.indexOf(queryLower);
    if (queryIndex !== -1) {
        const before = escaped.substring(0, queryIndex);
        const match = escaped.substring(queryIndex, queryIndex + query.length);
        const after = escaped.substring(queryIndex + query.length);
        return before + '<mark>' + match + '</mark>' + after;
    }
    
    let result = escaped;
    const words = queryLower.split(/\s+/).filter(w => w.length > 0);
    words.forEach(word => {
        const regex = new RegExp(`(${word})`, 'gi');
        result = result.replace(regex, '<mark>$1</mark>');
    });
    
    return result;
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

document.addEventListener('DOMContentLoaded', initApp);
