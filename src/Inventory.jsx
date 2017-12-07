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

  }
  render(){
    return(
      <div>
        <fieldset>
          <legend>Filter Box</legend>
          <label htmlFor="itemname">
            <input type="text" name="itemname" />
          </label>
          <label htmlFor="stock">
            <input type="checkbox" name="stock"  />
            with Stock
          </label>
        </fieldset>
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
                items.map((e,i)=>{
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
      </div>
    )
  }
}
module.exports = Inventory;
