document.addEventListener('DOMContentLoaded', () => {
    const studentsContainer = document.getElementById('studentsContainer');
    const destinations = document.querySelectorAll('.destination');
    const messageEscuela = document.getElementById('message-escuela');
    const messageCasa = document.getElementById('message-casa');
    const addStudentBtn = document.getElementById('addStudent');
    let studentCount = 0;

    function createStudentElement(imageUrl, name) {
        const div = document.createElement('div');
        div.className = 'student';
        div.draggable = true;
        div.dataset.name = name;
        
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = name;
        
        const span = document.createElement('span');
        span.textContent = name;
        
        div.appendChild(img);
        div.appendChild(span);
        
        return div;
    }

    function setupDragAndDrop() {
        const students = document.querySelectorAll('.student');
        
        students.forEach(student => {
            student.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', student.dataset.name);
                student.classList.add('dragging');
            });

            student.addEventListener('dragend', () => {
                student.classList.remove('dragging');
            });
        });

        destinations.forEach(destination => {
            destination.addEventListener('dragover', (e) => {
                e.preventDefault();
                destination.classList.add('drag-over');
            });

            destination.addEventListener('dragleave', () => {
                destination.classList.remove('drag-over');
            });

            destination.addEventListener('drop', (e) => {
                e.preventDefault();
                destination.classList.remove('drag-over');
                
                const studentName = e.dataTransfer.getData('text/plain');
                const message = destination.id === 'escuela' ? messageEscuela : messageCasa;
                
                // Ocultar todos los mensajes primero
                messageEscuela.style.display = 'none';
                messageCasa.style.display = 'none';
                
                if (destination.id === 'escuela') {
                    message.textContent = `¡${studentName} está presente! ¡Biennnnn! 🎉`;
                    message.className = 'message presente';
                } else if (destination.id === 'casa') {
                    message.textContent = `¡${studentName} está ausente! 😢`;
                    message.className = 'message ausente';
                }

                message.style.display = 'block';
                
                setTimeout(() => {
                    message.style.display = 'none';
                }, 3000);
            });
        });
    }

    addStudentBtn.addEventListener('click', async () => {
        try {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            
            input.onchange = async (e) => {
                const file = e.target.files[0];
                if (file) {
                    studentCount++;
                    const name = prompt('Ingresa el nombre del estudiante:', `Estudiante ${studentCount}`);
                    if (name) {
                        const imageUrl = URL.createObjectURL(file);
                        const studentElement = createStudentElement(imageUrl, name);
                        studentsContainer.appendChild(studentElement);
                        setupDragAndDrop();
                    }
                }
            };
            
            input.click();
        } catch (error) {
            console.error('Error al seleccionar imagen:', error);
            alert('Hubo un error al seleccionar la imagen. Por favor, intenta de nuevo.');
        }
    });

    setupDragAndDrop();
}); 