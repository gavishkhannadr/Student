document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registration-form');
    const recordsSection = document.getElementById('records-section');

    function updateRecords() {
        const students = JSON.parse(localStorage.getItem('students')) || [];
        recordsSection.innerHTML = '';
        students.forEach((student, index) => {
            const studentDiv = document.createElement('div');
            studentDiv.innerHTML = `
                <p><strong>Name:</strong> ${student.name}</p>
                <p><strong>ID:</strong> ${student.id}</p>
                <p><strong>Email:</strong> ${student.email}</p>
                <p><strong>Contact:</strong> ${student.contact}</p>
                <button onclick="editRecord(${index})">Edit</button>
                <button onclick="deleteRecord(${index})">Delete</button>
                <hr>
            `;
            recordsSection.appendChild(studentDiv);
        });
    }

    window.editRecord = (index) => {
        const students = JSON.parse(localStorage.getItem('students')) || [];
        const student = students[index];
        document.getElementById('student-name').value = student.name;
        document.getElementById('student-id').value = student.id;
        document.getElementById('email-id').value = student.email;
        document.getElementById('contact-no').value = student.contact;
        students.splice(index, 1);
        localStorage.setItem('students', JSON.stringify(students));
        updateRecords();
    };

    window.deleteRecord = (index) => {
        const students = JSON.parse(localStorage.getItem('students')) || [];
        students.splice(index, 1);
        localStorage.setItem('students', JSON.stringify(students));
        updateRecords();
    };

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('student-name').value;
        const id = document.getElementById('student-id').value;
        const email = document.getElementById('email-id').value;
        const contact = document.getElementById('contact-no').value;

        if (!name || !id || !email || !contact) {
            alert('All fields are required.');
            return;
        }

        if (!/^[a-zA-Z\s]+$/.test(name)) {
            alert('Name should only contain letters.');
            return;
        }

        if (!/^\d+$/.test(id)) {
            alert('ID should only contain numbers.');
            return;
        }

        if (!/^\d+$/.test(contact)) {
            alert('Contact number should only contain numbers.');
            return;
        }

        const students = JSON.parse(localStorage.getItem('students')) || [];
        students.push({ name, id, email, contact });
        localStorage.setItem('students', JSON.stringify(students));

        form.reset();
        updateRecords();
    });

    updateRecords();
});
