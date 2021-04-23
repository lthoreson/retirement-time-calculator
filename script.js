// This is a simple financial calculator
// to show how long it takes to retire
// based on how much you save.
// Assumes 7% annual return on investments.

// create React component to display calculator
class Presentational extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deadline: true, // toggles calculation mode: user inputs years if true, savings if false
      timeline: 'year', // tracks whether salary input is yearly or monthly
      salary: 50000, // user input for salary variable
      save: 818, // monthly saving rate variable
      retire: 30, // time until retirement variable
      balance: 0 };


    // bind methods so they can be called in JSX
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  // method for any button click, by button ID
  handleClick(event) {
    if (event.target.id === 'reverse') {
      this.setState({ deadline: !this.state.deadline }); // "reverse" switches calculation mode
    } else if (event.target.id === 'annual' && this.state.timeline === 'month') {
      this.setState(state => ({
        timeline: 'year',
        save: Math.round(state.save / 12) }));

    } else if (event.target.id === 'monthly' && this.state.timeline === 'year') {
      this.setState(state => ({
        timeline: 'month',
        save: Math.round(state.save * 12) }));

    }
  }

  // take changes to input fields, by input ID, and update the variables respectively
  handleChange(event) {
    if (event.target.id === 'salary') {
      const salary = Number(event.target.value.replace(/,/g, ''));
      if (!isNaN(salary)) {
        this.setState({ salary: salary }); // convert string input to number and update salary variable to input
      }
    } else if (event.target.id === 'save') {
      this.setState({ save: event.target.value }); // update saving rate variable to input
    } else if (event.target.id === 'retire') {
      this.setState({ retire: event.target.value }); // update retirement date variable to input
    } else if (event.target.id === 'balance') {
      const balance = Number(event.target.value.replace(/,/g, ''));
      if (!isNaN(balance)) {
        this.setState({ balance: balance });
      }
    }

    // recalculates dependent variables based on the updated variable
    this.setState(state => {
      let salary = state.salary; // get salary from component state
      if (state.timeline === 'month') {// if user chose monthly salary
        salary *= 12; // convert to annual salary for consistency
      }

      const rate = 0.07; // return on investment assumption
      let yearSave = 12 * state.save; // convert saving rate to annual
      const goal = 25 * (salary - yearSave); // multiply cost of living by 25
      const time = Math.round(Math.log((goal + yearSave / rate) / (state.balance + yearSave / rate)) / rate); // update retire date
      yearSave = Math.round((25 * salary - state.balance * Math.exp(state.retire * rate)) / ((Math.exp(state.retire * rate) - 1) / rate + 25) / 12); // update saving rate

      // choose formula based on calculator mode
      if (!state.deadline) {
        return { retire: time };
      } else if (state.deadline) {
        return { save: yearSave };
      }
    });
  }

  render() {
    // calculate monthly salary
    let monthlySalary = this.state.salary / 12;
    let year = 'selected';
    let month = '';
    let mode = 'Switch to Deadline Mode';

    if (this.state.timeline === 'month') {
      monthlySalary = this.state.salary;
      year = '';
      month = 'selected';
    };
    if (this.state.deadline) {
      mode = 'Switch to Savings Mode';
    }



    // dictionary for input sections
    const inputs = {

      // salary input section with annual & monthly toggle buttons
      salary: /*#__PURE__*/
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("h2", null, "How much do you earn?")), /*#__PURE__*/

      React.createElement("div", { class: "bubble" }, /*#__PURE__*/
      React.createElement("input", { id: "salary", value: this.state.salary.toLocaleString('en-US'), onChange: this.handleChange }), /*#__PURE__*/
      React.createElement("button", { id: "annual", class: year, onClick: this.handleClick }, "per year"), /*#__PURE__*/
      React.createElement("button", { id: "monthly", class: month, onClick: this.handleClick }, "per month"))),



      balance: /*#__PURE__*/
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("h2", null, "How much have you invested?")), /*#__PURE__*/

      React.createElement("div", { class: "bubble" }, /*#__PURE__*/
      React.createElement("input", { id: "balance", value: this.state.balance.toLocaleString('en-US'), onChange: this.handleChange }))),



      // saving rate input section with range slider
      save: /*#__PURE__*/
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("h2", null, "How much will you invest?")), /*#__PURE__*/

      React.createElement("div", { class: "bubble" }, /*#__PURE__*/
      React.createElement("h2", null, this.state.save.toLocaleString('en-US'), " per month"), /*#__PURE__*/
      React.createElement("input", { id: "save", type: "range", class: "slider", min: "0", max: monthlySalary, value: this.state.save, onChange: this.handleChange }))),



      // retirement date input section with range slider
      retire: /*#__PURE__*/
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("h2", null, "How long will you work?")), /*#__PURE__*/

      React.createElement("div", { class: "bubble" }, /*#__PURE__*/
      React.createElement("h2", null, this.state.retire, " years"), /*#__PURE__*/
      React.createElement("input", { id: "retire", type: "range", class: "slider", min: "0", max: "100", value: this.state.retire, onChange: this.handleChange }))),



      // button to toggle between calculator modes
      switch: /*#__PURE__*/React.createElement("button", { id: "reverse", onClick: this.handleClick }, mode) };


    // dictionary for two possible result messages
    const messages = {
      retireYear: /*#__PURE__*/
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("h1", null, "Results"), /*#__PURE__*/
      React.createElement("div", { class: "bubble" }, /*#__PURE__*/
      React.createElement("h2", null, "You'll have to work for ", /*#__PURE__*/React.createElement("br", null), this.state.retire, " more years.", /*#__PURE__*/React.createElement("br", null), "Your monthly allowance is ", Math.round(monthlySalary - this.state.save).toLocaleString('en-US')))),


      retireSave: /*#__PURE__*/
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("h1", null, "Results"), /*#__PURE__*/
      React.createElement("div", { class: "bubble" }, /*#__PURE__*/
      React.createElement("h2", null, "You'll have to invest ", this.state.save.toLocaleString('en-US'), " per month ", /*#__PURE__*/React.createElement("br", null), "to retire in ", this.state.retire, " years. ", /*#__PURE__*/React.createElement("br", null), "Your monthly allowance is ", Math.round(monthlySalary - this.state.save).toLocaleString('en-US')))) };




    // element display order for calculator mode with savings rate input
    const original = [
    inputs.salary,
    inputs.balance,
    inputs.save,
    inputs.switch,
    messages.retireYear];


    // element display order for calculator mode with retirement deadline input
    const deadline = [
    inputs.salary,
    inputs.balance,
    inputs.retire,
    inputs.switch,
    messages.retireSave];


    // choose elements to display based on calculator mode
    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("h1", null, "Financial Freedom Calculator"), /*#__PURE__*/React.createElement("hr", null),
      this.state.deadline ? deadline : original));


  }}
;

// display React Component through HTML div
ReactDOM.render( /*#__PURE__*/React.createElement(Presentational, null), document.getElementById('view'));