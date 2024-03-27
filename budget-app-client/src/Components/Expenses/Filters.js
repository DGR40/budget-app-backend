import ExpenseFilter from './ExpenseFilter';
import MonthlyExpenseFilter from './MonthlyExpenseFilter'

const Filters (props) => {
  return (
    <div>
   <ExpenseFilter
        onChangeFilter={props.filterChangeHandler}
        selected={props.filteredYear}
      />
    <MonthlyExpenseFilter
        onMonthlyFilterChange={props.monthlyFilterChangeHandler}
    />
  </div>)
   
}

export default Filters