 const fs = require('fs'); 
  const myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer KAsHklqehZVDCe8LebYwR2W6MAe0");

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

fetch("https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=MIA&destinationLocationCode=LHR&departureDate=2026-06-15&adults=1&max=2&maxPrice=500&nonStop=true", requestOptions)
 
 .then((response) => response.json())
.then((result) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    let reportContent = "==========================================\n";
    reportContent += "          V E L O C I S ™ REPORT          \n";
    reportContent += "==========================================\n\n";
    
    const sortedFlights = result.data.sort((a, b) => a.price.total - b.price.total);
    
    sortedFlights.forEach((flight, index) => {
        const badge = index === 0 ? " [BEST DEAL] ⭐" : "";
        reportContent += `Price: ${flight.price.total} ${flight.price.currency} | ID: ${flight.id}${badge}\n`;
    });

    reportContent += "\n==========================================\n";
    reportContent += "      OFFICIAL VELOCIS™ DOCUMENT       \n";
    reportContent += "      Website: www.velocisergo.com     \n";
    reportContent += "      Intelligence: Global Flight Board \n";
    reportContent += "==========================================\n";

    // NEW: Generate the 3D-Ready Data Blueprint
const visualData = {
    brand: "VELOCIS™",
    timestamp: new Date().toISOString(),
    intelligenceSource: "Global Flight Board",
    deals: sortedFlights.map((flight, index) => ({
        id: flight.id,
        price: flight.price.total,
        currency: flight.price.currency,
        isBestDeal: index === 0, // Flag for the 3D gold glow effect
        cardTexture: "Brushed-Metal-Luxury" 
    }))
};

// 1. Save the Professional Text Report
fs.writeFileSync(`Velocis_Report_${timestamp}.txt`, reportContent);

// 2. Save the 3D Visual Data File
fs.writeFileSync(`Velocis_3D_Data_${timestamp}.json`, JSON.stringify(visualData, null, 2));

console.log(`✅ Architecture Synced: Text Report & 3D Visual Data generated.`);
    
});
