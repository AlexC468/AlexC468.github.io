// Wait for the HTML document to fully load before attaching events
document.addEventListener("DOMContentLoaded", () => {
    
    // Select HTML elements by their unique IDs
    const button = document.getElementById("interactive-btn");
    const messageDisplay = document.getElementById("message-display");

    // Add a click event listener to the button
    button.addEventListener("click", () => {
        // Change the text inside the message paragraph
        messageDisplay.textContent = "🎉 You clicked the button! JavaScript is officially connected and working!";
        
        // Log a confirmation message in the browser developer console
        console.log("Button clicked successfully!");
    });
});
