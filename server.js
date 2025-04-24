const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname + '/public'));

let students = [];
let idCounter = 1;

app.get('/students', (req, res) => res.json(students));

app.post('/students', (req, res) => {
  const student = {
    id: idCounter++,
    name: req.body.name,
    age: req.body.age,
    course: req.body.course
  };
  students.push(student);
  res.status(201).json({ message: 'Student added successfully', student });
});

app.put('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = students.findIndex(s => s.id === id);
  if (index !== -1) {
    students[index] = { id, ...req.body };
    res.json({ message: 'Student updated successfully', student: students[index] });
  } else {
    res.status(404).json({ message: 'Student not found' });
  }
});

app.delete('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = students.length;
  students = students.filter(s => s.id !== id);
  if (students.length < initialLength) {
    res.json({ message: 'Student deleted successfully' });
  } else {
    res.status(404).json({ message: 'Student not found' });
  }
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
