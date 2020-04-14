import React from "react"
import Recipe from "./recipe.js"

const APP_KEY = "b661da4c7dda934ce660b564cf5098d5";
const APP_ID  = "2d94b518"


class App extends React.Component{
  constructor(){
      super();
      this.state = {
        recipes : [],
        search : "chicken",
      }
      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
    }
   handleChange(event){
     const {name,value} = event.target;
     this.setState({
       [name] : value
     })
   }

   handleSubmit(event){
     event.preventDefault();
     console.log(this.state.search)
      fetch(`https://api.edamam.com/search?q=${this.state.search}&app_id=${APP_ID}&app_key=${APP_KEY}`)
        .then(response => response.json())
        .then(response =>{
          console.log(response.hits[0])
          this.setState({
            recipes:response.hits
          })
        })
   }
  render(){
    return(
      <div>
        <form className = "App" onSubmit ={this.handleSubmit}>  
        <input type = "text"
              name = "search"
              value = {this.state.search}
              placeholder = "search"
              onChange = {this.handleChange}
        />
          <button> Search </button>
        </form>
        {this.state.recipes.map(recipe => (
          <Recipe
          key = {recipe.recipe.label}
          title = {recipe.recipe.label}
          image = {recipe.recipe.image}
          />
        ))}

      </div>
    )
  }
}
export default App