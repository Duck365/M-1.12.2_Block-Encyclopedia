// Foundation DOM Elements
const mainMenu = document.getElementById('main-menu');
const encyclopediaScreen = document.getElementById('encyclopedia-screen');
const detailsScreen = document.getElementById('details-screen');
const btnStart = document.getElementById('btn-start');
const btnBack = document.getElementById('btn-back');
const searchBar = document.getElementById('search-bar');
const blockGrid = document.getElementById('block-grid');

// Detail Screen Elements
const detailName = document.getElementById('detail-name');
const detailImage = document.getElementById('detail-image');
const detailDescription = document.getElementById('detail-description');

// Initial Foundation Data (This acts as our placeholder until we expand the list)
const blockData = [
    {
        name: "Grass Block",
        category: "Building Blocks",
        image: "https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.12.2/assets/minecraft/textures/blocks/grass_side.png",
        description: "A natural block that forms the surface of the Overworld."
    },
    {
        name: "Double Tallgrass",
        category: "Decoration Blocks",
        image: "https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.12.2/assets/minecraft/textures/blocks/double_plant_grass_top.png",
        description: "A two-block high grass plant. Usually found in biomes with standard grass."
    }
];

// Screen Switching Logic
btnStart.addEventListener('click', () => {
    mainMenu.classList.remove('active');
    mainMenu.classList.add('hidden');
    encyclopediaScreen.classList.remove('hidden');
    encyclopediaScreen.classList.add('active');
    renderGrid(blockData);
});

btnBack.addEventListener('click', () => {
    detailsScreen.classList.remove('active');
    detailsScreen.classList.add('hidden');
    encyclopediaScreen.classList.remove('hidden');
    encyclopediaScreen.classList.add('active');
});

// Render Grid Function (Fills the inventory GUI)
function renderGrid(blocks) {
    blockGrid.innerHTML = ''; 
    
    // Renders exactly 45 slots (9x5) to match the empty inventory grid size in your reference
    const minSlots = 45; 
    const slotsToRender = Math.max(blocks.length, minSlots);

    for (let i = 0; i < slotsToRender; i++) {
        const slot = document.createElement('div');
        slot.classList.add('block-slot');
        
        // If we have block data for this slot, populate it
        if (i < blocks.length) {
            const block = blocks[i];
            slot.classList.add('tooltip-container');
            
            slot.innerHTML = `
                <img src="${block.image}" alt="${block.name}">
                <div class="tooltip block-tooltip">
                    <span class="block-name">${block.name}</span><br>
                    <span class="block-category">${block.category}</span>
                </div>
            `;

            slot.addEventListener('click', () => {
                openDetails(block);
            });
        }
        blockGrid.appendChild(slot);
    }
}

// Search Logic
searchBar.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredBlocks = blockData.filter(block => 
        block.name.toLowerCase().includes(searchTerm)
    );
    renderGrid(filteredBlocks);
});

// Open Details Screen Logic
function openDetails(block) {
    encyclopediaScreen.classList.remove('active');
    encyclopediaScreen.classList.add('hidden');
    
    detailName.textContent = block.name;
    detailImage.src = block.image;
    detailDescription.textContent = block.description;
    
    detailsScreen.classList.remove('hidden');
    detailsScreen.classList.add('active');
}
