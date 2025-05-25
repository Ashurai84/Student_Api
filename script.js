const express = require('express');
const cors = require('cors');  
const app = express();
const port = 4000;

app.use(cors());  
app.use(express.json());

let Students = [
    {
        id: 1,
        name: "Garima",
        email: "garima@isu.ac.in",
        branch: "AI & ML",
    },
    {
        id: 2,
        name: "Vrutti",
        email: "vrutti@isu.ac.in",
        branch: "EE",
    },
    {
        id: 3,
        name: "Ashutosh",
        email: "ashutosh@isu.ac.in",
        branch: "CE",
    },
    {
        id: 4,
        name: "Sahil",
        email: "sahil@isu.ac.in",
        branch: "BBA",
    },
];


app.get('/', (req, res) => {
    res.send("Welcome to the Student API");
});


app.get('/students', (req, res) => {
    res.json(Students);
});

// Get student by ID
app.get('/students/:id', (req, res) => {
    const student = Students.find(s => s.id === parseInt(req.params.id));
    if (!student) return res.status(404).send("Student not found");
    res.json(student);
});

// ✅ Add new student (POST)
app.post('/students', (req, res) => {
    const newStudent = {
        id: Students.length + 1,
        name: req.body.name,
        email: req.body.email,
        branch: req.body.branch
    };
    Students.push(newStudent);
    res.status(201).json({
        message: "Student added successfully!",
        data: newStudent
    });
});

// Update student
app.put('/students/:id', (req, res) => {
    const student = Students.find(s => s.id === parseInt(req.params.id));
    if (!student) return res.status(404).send("Student not found");

    student.name = req.body.name;
    student.email = req.body.email;
    student.branch = req.body.branch;

    res.json({
        message: "Student updated successfully!",
        data: student
    });
});

// Delete student
app.delete('/students/:id', (req, res) => {
    const index = Students.findIndex(s => s.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send("Student not found");

    const deleted = Students.splice(index, 1);
    res.json({
        message: "Student deleted successfully!",
        data: deleted[0]
    });
});

app.listen(port, () => {
    console.log(`✅ Student API is running on http://localhost:${port}`);
});
