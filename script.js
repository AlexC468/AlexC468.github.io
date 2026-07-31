// Wait for the HTML document to fully load before running code
document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Select elements from the HTML page using their unique IDs
    const actionButton = document.getElementById("interactive-btn");
    const messageOutput = document.getElementById("message-text");

    // 2. Add an event listener to listen for clicks on the button
    actionButton.addEventListener("click", function() {
        // Change the text content inside the empty paragraph tag
        messageOutput.textContent = "🎉 You clicked the button! Your JavaScript code is working perfectly!";
        
        // Log a confirmation message in the browser's developer console
        console.log("Interactive button was clicked successfully.");
    });
});
