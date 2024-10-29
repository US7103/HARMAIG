document.getElementById('feedbackForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(this);

    try {
        const response = await fetch('http://localhost:3000/submit-feedback', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            alert('Feedback submitted successfully!');
        } else {
            alert('Failed to submit feedback.');
        }
    } catch (error) {
        alert('An error occurred: ' + error.message);
    }
});