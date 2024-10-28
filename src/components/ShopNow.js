import React from 'react';
import '../styles/shopnow.css'; // Import the CSS file

// Import the icons directly at the top of the file
import zaraIcon from '../assets/icons/zara.png';
import amazonIcon from '../assets/icons/amazon.png';
import meeshoIcon from '../assets/icons/meesho.png';
import flipkartIcon from '../assets/icons/flipkart.png';

// Sample URLs for the clothing brands; update these with the actual links to recommended outfits
const shopLinks = {
    Zara: "https://www.zara.com/",
    Amazon: "https://www.amazon.com/",
    Meesho: "https://www.meesho.com/",
    Flipkart: "https://www.flipkart.com/",
    // Add more brands and their links here...
};

// Create an object mapping brand names to their icons
const icons = {
    Zara: zaraIcon,
    Amazon: amazonIcon,
    Meesho: meeshoIcon,
    Flipkart: flipkartIcon,
    // Add more brands and their icons here...
};

const ShopNow = () => {
    return (
        <div className="shop-now"> {/* Apply the class here */}
            {Object.entries(shopLinks).map(([brand, url]) => (
                <a key={brand} href={url} target="_blank" rel="noopener noreferrer">
                    <img
                        src={icons[brand]} // Use the icons object to get the correct icon
                        alt={`${brand} icon`}
                    />
                </a>
            ))}
        </div>
    );
};

export default ShopNow;
