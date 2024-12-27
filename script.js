let calorieEntries = [];

// Set the max attribute of the date picker to today's date
document.getElementById('datePicker').max = new Date().toISOString().split('T')[0];

// Event listeners for form submission and button clicks
document.getElementById('calorieForm').addEventListener('submit', addCalorieEntry);
document.getElementById('viewEntriesButton').addEventListener('click', viewTodayEntries);
document.getElementById('viewByDateButton').addEventListener('click', viewEntriesByDate);

// Function to add a calorie entry
function addCalorieEntry(event) {
    event.preventDefault();

    const foodName = document.getElementById('foodName').value;
    const calories = parseInt(document.getElementById('calories').value);
    const date = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

    // Push the new entry to the calorieEntries array
    calorieEntries.push({ foodName, calories, date });
    document.getElementById('calorieForm').reset(); // Reset the form
    viewTodayEntries(); // Refresh today's entries
}

// Function to view today's entries
function viewTodayEntries() {
    const today = new Date().toISOString().split('T')[0]; // Get today's date
    const todayEntries = calorieEntries.filter(entry => entry.date === today); // Filter entries for today
    displayEntries(todayEntries, 'entryList', 'summary'); // Display today's entries
}

// Function to view entries by selected date
function viewEntriesByDate() {
    const selectedDate = document.getElementById('datePicker').value; // Get the selected date
    const dateEntries = calorieEntries.filter(entry => entry.date === selectedDate); // Filter entries for the selected date
    displayEntries(dateEntries, 'entryListByDate', 'summaryByDate'); // Display entries for the selected date
}

// Function to display entries in the UI
function displayEntries(entries, entryListId, summaryId) {
    const entryList = document.getElementById(entryListId);
    const summary = document.getElementById(summaryId) || document.getElementById('summary');
    entryList.innerHTML = ''; // Clear the current list
    let totalCalories = 0; // Initialize total calories

    // Check if there are any entries to display
    if (entries.length === 0) {
        summary.textContent = "No entries for this date.";
        return; // Exit if no entries
    }

    // Loop through each entry and create a list item
    entries.forEach(entry => {
        const li = document.createElement('li');
        li.textContent = `${entry.foodName}: ${entry.calories} calories`;
        entryList.appendChild(li); // Add the list item to the entry list
        totalCalories += entry.calories; // Sum the calories
    });

    // Update the summary with total calories
    summary.textContent = `Total Calories: ${totalCalories}`;
}