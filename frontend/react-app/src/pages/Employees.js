import '../index.css';
import Employee from '../components/Employee';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import EditEmployee from '../components/EditEmployee';
import AddEmployee from '../components/AddEmployee';

function Employees () {
  const showEmployees = true;
  const [employees, setEmployees] = useState([
    {
        name: 'Caleb',
        role: 'YouTube Sensation',
        img: 'https://images.pexels.com/photos/3831645/pexels-photo-3831645.jpeg',
    },
    {
        name: 'Sal',
        role: 'Manager',
        img: 'https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg',
    },
    {
        name: 'John',
        role: 'Director of Eng.',
        img: 'https://images.pexels.com/photos/2095582/pexels-photo-2095582.jpeg',
    },
    {
        name: 'Melanie',
        role: 'Software Engineer',
        img: 'https://images.pexels.com/photos/3760583/pexels-photo-3760583.jpeg',
    },
    {
        name: 'Corey',
        role: 'The Devops Guy',
        img: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg',
    },
    {
        name: 'Jake',
        role: 'Senior',
        img: 'https://images.pexels.com/photos/2225298/pexels-photo-2225298.jpeg',
    },
]);

  function updateEmployee(id, newName, newRole) {
    const newEmployees = employees.map((employee) => {
      if(id === employee.id) {
        return {
          ...employee,
          name: newName,
          role: newRole
        }
      }
      return employee;
    });
    setEmployees(newEmployees);
  }

  function newEmployee(name, role, img) {
    setEmployees([...employees, {
      id: uuidv4(),
      name,
      role,
      img
    }]);
  }

  return (
    <div>
      {
        showEmployees ? (
        <>
          <div className="flex flex-wrap justify-center">
            {
              employees.map((employee) => {
                const editEmployee = (
                  <EditEmployee id={employee.id} name={employee.name} role={employee.role} updateEmployee={updateEmployee} />
                )
                return (
                <Employee key={employee.id} id={employee.id} name={employee.name} role={employee.role} img={employee.img} editEmployee={editEmployee} />
              )
              })
            }
          </div>
          <AddEmployee newEmployee={newEmployee} />
        </>
        ) : (
          <p>You can't see the employees</p>
        )}
    </div>
  );
}

export default Employees;
