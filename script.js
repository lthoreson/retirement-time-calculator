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
      balance: 0,
      step: 0 };


    // bind methods so they can be called in JSX
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  // method for any button click, by button ID
  handleClick(event) {
    if (event.target.id === 'flip') {// switches calculation mode between deadline and saving
      this.setState({ deadline: !this.state.deadline });
    } else if (event.target.id === 'annual' && this.state.timeline === 'month') {// annual salary
      this.setState(state => ({
        timeline: 'year',
        save: Math.round(state.save / 12) }));

    } else if (event.target.id === 'monthly' && this.state.timeline === 'year') {// monthly salary
      this.setState(state => ({
        timeline: 'month',
        save: Math.round(state.save * 12) }));

    } else if (event.target.id === 'back' && this.state.step > 0) {// goes back one page
      this.setState(state => ({
        step: state.step - 1 }));

    } else if (event.target.id === 'forward' && this.state.step < 3) {// goes forward one page
      this.setState(state => ({
        step: state.step + 1 }));

    }
  }

  // update the variables whenever inputs change
  handleChange(event) {
    switch (event.target.id) {
      case 'salary':
        const salary = Number(event.target.value.replace(/,/g, '')); // get salary input as number
        if (!isNaN(salary)) {
          this.setState({ salary: salary }); // update state
        }
        break;
      case 'save':
        this.setState({ save: event.target.value }); // update saving rate
        break;
      case 'retire':
        this.setState({ retire: event.target.value }); // update retirement date
        break;
      case 'balance':
        const balance = Number(event.target.value.replace(/,/g, '')); // get current balance input as number
        if (!isNaN(balance)) {
          this.setState({ balance: balance }); // update state
        }
        break;}


    // recalculates dependent variables based on the updated variable
    this.setState(state => {
      let salary = state.salary; // get salary from component state
      if (state.timeline === 'month') {// if user chose monthly salary
        salary *= 12; // convert to annual salary for consistency
      }

      const rate = 0.07; // "real" rate of return
      let save = 12 * state.save; // convert saving rate to annual
      const goal = 25 * (salary - save); // multiply cost of living by 25 (4% rule)

      // choose formula based on calculator mode
      if (state.deadline) {
        save = Math.round((25 * salary - state.balance * Math.exp(state.retire * rate)) / (
        (Math.exp(state.retire * rate) - 1) / rate + 25) / 12); // update saving rate
        return { save: save };
      } else {
        const time = Math.round(Math.log((goal + save / rate) / (
        state.balance + save / rate)) / rate); // update retire date
        return { retire: time };
      }
    });
  }

  render() {
    // calculate monthly salary
    let monthlySalary = this.state.salary;
    if (this.state.timeline === 'year') {// if salary is annual,
      monthlySalary /= 12; // convert to monthly
    }

    let mode = 'Switch to Deadline Mode';
    if (this.state.deadline) {
      mode = 'Switch to Savings Mode';
    }

    // css class "selected" highlights monthly/yearly buttons on click
    let year = 'selected';
    let month = '';
    if (this.state.timeline === 'month') {
      year = '';
      month = 'selected';
    };

    // dictionary for input sections
    const inputs = {

      // salary input section with toggle button to switch between annual and monthly
      salary: /*#__PURE__*/
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("h2", null, "How much do you earn?")), /*#__PURE__*/

      React.createElement("div", { class: "bubble" }, /*#__PURE__*/
      React.createElement("input", { id: "salary", value: this.state.salary.toLocaleString('en-US'), onChange: this.handleChange }), /*#__PURE__*/
      React.createElement("button", { id: "annual", class: year, onClick: this.handleClick }, "per year"), /*#__PURE__*/
      React.createElement("button", { id: "monthly", class: month, onClick: this.handleClick }, "per month"))),



      // current savings balance
      balance: /*#__PURE__*/
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("h2", null, "How much have you saved for retirement?")), /*#__PURE__*/

      React.createElement("div", { class: "bubble" }, /*#__PURE__*/
      React.createElement("input", { id: "balance", value: this.state.balance.toLocaleString('en-US'), onChange: this.handleChange }))),



      // saving rate input range slider
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
      React.createElement("h2", null, "How much longer will you work?")), /*#__PURE__*/

      React.createElement("div", { class: "bubble" }, /*#__PURE__*/
      React.createElement("h2", null, this.state.retire, " years"), /*#__PURE__*/
      React.createElement("input", { id: "retire", type: "range", class: "slider", min: "0", max: "100", value: this.state.retire, onChange: this.handleChange }))),



      // button to toggle between calculator modes
      switch: /*#__PURE__*/React.createElement("button", { id: "flip", onClick: this.handleClick }, mode),

      // back and forward buttons
      submit: /*#__PURE__*/
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("button", { id: "back", onClick: this.handleClick, value: -1 }, "<"), /*#__PURE__*/
      React.createElement("button", { id: "forward", onClick: this.handleClick, value: 1 }, ">")) };



    // End result messages
    const invest = /*#__PURE__*/React.createElement("h2", null, "Invest: ", this.state.save.toLocaleString('en-US'), " per month");
    const retire = /*#__PURE__*/React.createElement("h2", null, "Retire: ", this.state.retire, " years from now!");
    const budget = /*#__PURE__*/React.createElement("h2", null, "Budget: ", Math.round(monthlySalary - this.state.save).toLocaleString('en-US'), " per month");

    // dictionary for two possible result messages
    const results = /*#__PURE__*/
    React.createElement("div", null, /*#__PURE__*/
    React.createElement("h1", null, "Results"), /*#__PURE__*/
    React.createElement("div", { class: "bubble" },
    invest,
    retire,
    budget));



    // app pages
    const pages = [
    inputs.salary,
    inputs.balance,
    [this.state.deadline ? inputs.retire : inputs.save, inputs.switch],
    results];


    // choose elements to display based on calculator mode
    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("h1", null, "Financial Freedom Calculator"), /*#__PURE__*/React.createElement("hr", null),
      pages[this.state.step],
      inputs.submit));


  }}
;

// display React Component through HTML div
ReactDOM.render( /*#__PURE__*/React.createElement(Presentational, null), document.getElementById('view'));