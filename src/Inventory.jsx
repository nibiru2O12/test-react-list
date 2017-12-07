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
      search:'',stocked:false
    }
    this.handleOnChange=this.handleOnChange.bind(this);
  }

  handleOnChange(val){
    this.setState({
      search:val
    });
  }

  render(){
    return(
      <div>
      <SearchBox value={this.state.search} onChangeHandler={this.handleOnChange}/>
      <ItemList search={this.state.search}/>
      </div>
    )
  }
}

class SearchBox extends Component{
  constructor(props){
    super(props);
    this.handleOnChange=this.handleOnChange.bind(this);
  }

  handleOnChange(e){
    this.props.onChangeHandler(e.target.value);
  }

  render(){
    return(
        <fieldset>
          <legend>Filter Box</legend>
          <label htmlFor="itemname">
            <input type="text" name="itemname" value={this.props.value} onChange={this.handleOnChange} />
          </label>
          <label htmlFor="stock">
            <input type="checkbox" name="stock"   />
            with Stock
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
