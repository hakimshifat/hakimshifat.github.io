// Add this object to the `achievements` array in src/pages/achievements.astro

{
	title: "Event Name",
	position: "Rank/Position or 'Participated'",
	date: "Month Year",
	type: "international", // 'international' | 'national' (Only required if position is NOT 'Participated')
	
	// --- Optional Fields ---
	// description: "Team: Your_Team_Name",
	// location: "City, Country",
	// heroImage: "/path/to/hero.png", // Banner image displayed at the top of the card
	// images: ["/path/to/image1.png", "/path/to/image2.png"] // Images for the popup gallery
}
