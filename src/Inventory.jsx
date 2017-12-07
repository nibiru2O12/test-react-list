import React,{Component} from 'react';

var items=[
  {name:"Alcohol",stock:3,price:"100.00"},
  {name:"Bondpaper",stock:100,price:20.00},
  {name:"Scissor",stock:20,price:25.00},
  {name:"Ballpen",stock:100,price:10},
  {name:"Notebook",stock:20,price:10},
  {name:"Scotch Tape",stock:5,price:5},
  {name:"Eraser",stock:0,price:20},
  {name:"Yellow Pad",stock:20,price:10},
  {name:"Envelope",stock:0,price:20},
  {name:"Pencil",stock:20,price:10}
];

class Inventory extends Component{
  constructor(props){
    super(props);
    this.state={
      search:'',"inStockOnly":false
    }
    this.handleSeachOnChange=this.handleSeachOnChange.bind(this);
  }

  handleSeachOnChange(prop,val){
    this.setState({
      [prop]:val
    });
    console.log(prop,val  )
  }

  handleStockOnChange(val){
    this.setState({
      "inStockOnly":val
    });
  }

  render(){
    return(
      <div>
      <SearchBox value={this.state.search} inStockOnly={this.state.inStockOnly} onChangeHandler={this.handleSeachOnChange}/>
      <ItemList search={this.state.search}/>
      </div>
    )
  }
}

class SearchBox extends Component{
  constructor(props){
    super(props);
    this.handleSearchOnChange=this.handleSearchOnChange.bind(this);
  }

  handleSearchOnChange(e){
    switch (e.target.type) {
      case 'text':
        this.props.onChangeHandler(e.target.name,e.target.value);
        break;
      case "checkbox":
        this.props.onChangeHandler(e.target.name,e.target.checked);
        break;
      default:

    }
  }

  render(){
    return(
        <fieldset>
          <legend>Filter Box</legend>
          <label htmlFor="search">
            <input type="text" name="search" value={this.props.value} onChange={this.handleSearchOnChange} />
          </label>
          <label htmlFor="inStockOnly">
            <input type="checkbox" name="inStockOnly" defaultChecked={this.props.inStockOnly} onChange={this.handleSearchOnChange}  />
          </label>
        </fieldset>
    )
  }

}

class ItemList extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <fieldset>
        <legend>Stock List</legend>
        <table>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Stock</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {
              items.filter((e)=>{
                let search=this.props.search;
                let pattern = new RegExp(search,'gi');
                return pattern.test(e.name);
              })
              .map((e,i)=>{
               return (
                <tr key={i}>
                  <td>{e.name}</td>
                  <td>{e.stock}</td>
                  <td>{e.price}</td>
                </tr>
              )
            })
          }
          </tbody>
        </table>
      </fieldset>
    )
  }
}

module.exports = Inventory;
