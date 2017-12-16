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

class AddInventory extends Component{

  render(){
    return (

      <fieldset>

        <legend>Inventory Details</legend>

        <label>Product Code</label>
        <input type="text" />

        <label>Product Name</label>
        <input type="text" />

        <button>Add</button>

      </fieldset>

    )
  }
}

class Inventory extends Component{
  constructor(props){
    super(props);
    this.state={
      search:'',"inStockOnly":false,result:0
    }

    this.handleSeachOnChange=this.handleSeachOnChange.bind(this);
    this.filter=this.filter.bind(this);
    this.recordCount=this.recordCount.bind(this);

  }

  handleSeachOnChange(prop,val){
    this.setState({
      [prop]:val
    });
  }

  handleStockOnChange(val){
    this.setState({
      "inStockOnly":val
    });
  }

  filter(item){

    let search=this.state.search;
    let inStockOnly=this.state.inStockOnly;
    let pattern = new RegExp(search,'gi');

    if(pattern.test(item.name)){
      if (inStockOnly==true){
          return item.stock>0
      }
      return true
    }else{
      return false
    }
  }

  recordCount(count){
  /*  this.setState({
      result:count
    });*/
    }

  render(){

    let search=this.state.search;
    let inStockOnly=this.state.inStockOnly;

    return(
      <div>
      <AddInventory />
      <SearchBox value={this.state.search} inStockOnly={inStockOnly} result={this.state.result}
        onChangeHandler={this.handleSeachOnChange}/>
      <ItemList filter={this.filter} onChange={this.recordCount}/>
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
            show in stock only
          </label>
          <br />
          item found:{this.props.result}
        </fieldset>
    )
  }

}

class ItemList extends Component{
  constructor(props){
    super(props);
  }
  render(){
    var list=items.filter((e)=>{
        return this.props.filter(e);
      })
      .map((e,i)=>{
       return (
        <tr key={i}>
          <td>{e.name}</td>
          <td>{e.stock}</td>
          <td>{e.price}</td>
        </tr>
      )
    });

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
            {list}
          </tbody>
        </table>
      </fieldset>
    )
  }
}

module.exports = Inventory;
