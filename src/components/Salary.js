import React from 'react'

/*
  This component is used for rendering a single Salarys's view
  Show's the Salarys details like name, salary amount, due date, etc.
  Also has the payment button next to it, on clicking which, the payment method is executed

  salary: The Salary object that has to be rendered
  paySalary: Method that uses the axios service to pay the specified salary, i.e. send a DELETE request

  Note that the key attribute is not written here, its only written in the map() method that renders
  the collection
*/
const Salary = ({ employeeSalary, paySalary }) => {
    /*
      Instruments are added to watchlists with the help of a dropdown list <select>.
      Add a <option> element with value=-1 in the <select> list that will serve as the default option.
      "value" property corresponds to index of a watchlist in the filteredWatchlists list.
      When user clicks an entry, the onChange of the <select> is triggered which will call createWatchlistInstrument.
      If user clicks default option, then nothing should happen which is why we check for watchlistIdx == -1
      in the createWatchlistInstrument function.
    */
    return (
        <tr>

            {/* Render the Salary's details */}
            <td>{employeeSalary.sId}</td>
            <td>{employeeSalary.ammount}</td>
            <td>{employeeSalary.description}</td>
            <td>{employeeSalary.payment_date}</td>
             <td>{employeeSalary.empId}</td>
            <td>
                {/* Payment button that calls the paySalary() method with the given Salary object onClick */}
                <button onClick={() => paySalary(employeeSalary)}>
                    Pay Salary
                </button>
            </td>
        </tr>
    )
}

export default Salary