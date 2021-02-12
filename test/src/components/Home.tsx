import React,{useState,useEffect,useCallback} from 'react'
import {Form,Button,Container,Jumbotron} from 'react-bootstrap'
import './Home.css'

interface Props {
    history:{
        push(url:string):void
    }
}
interface WeatherAPI {
    base:string 
    clouds:{
        all:number
    }
    cod:number 
    coord:{
        lat:number 
        lon:number 
    }
    id:number 
    main:{
        feels_like:number 
        pressure:number 
        temp:number 
        temp_max:number 
        temp_min:number 

    }
    weather:[
        {
            id:number 
            main:string 
            description:string
            icon:string
        }
    ]
    sys:{
        sunrise:number 
        sunset:number
    }
    name:string
}
function Home (props:Props){
    const [search, setSearch] = useState('')
    const [results,setResults] = useState<WeatherAPI |null>(null)
    const [sunrise, setSunrise] = useState('')
    const [sunset, setSunset] = useState('')
    const [temp, setTemp] = useState(0)
    const [tempMax, setTempMax] = useState(0)
    const [tempMin, setTempMin] = useState(0)
    const [feels, setFeels] = useState(0)

    const handleChange = (e:React.FormEvent<HTMLInputElement>) => {
        e.preventDefault()
        console.log(e.currentTarget.value)
        setSearch(e.currentTarget.value)
      
     
      
    }

  const submitData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${search}&appid=063bfcaaec6b64a58fccf009290840ca`,{
            method:"GET"
        })
          let data:WeatherAPI = await response.json() 
          setResults(data)
          const unixTimestamp:number = data.sys.sunrise
          const milliseconds = unixTimestamp * 1000 // 1575909015000
          const dateObject = new Date(milliseconds)
          
          const humanDateFormat = dateObject.toLocaleString("en-US", {hour: "numeric"})


          const unixTimestamp1:number = data.sys.sunset
          const milliseconds1 = unixTimestamp1 * 1000 // 1575909015000
          const dateObject1 = new Date(milliseconds1)
         
          const humanDateFormat1 = dateObject1.toLocaleString("en-US", {hour: "numeric"})
        setSunrise(humanDateFormat)
        setSunset(humanDateFormat1)
        const temp = data.main.temp - 273.15
        const temp_min= data.main.temp_min -273.15
        const temp_max = data.main.temp_max - 273.15
        setTempMax(Math.ceil(temp_max))
        setTempMin(Math.ceil(temp_min))
        console.log(data)
        const feelslike = data.main.feels_like - 273.15
        const finalFeels =  Math.ceil(feelslike)
        const finalTemp =  Math.ceil(temp)
        setFeels(finalFeels)
        setTemp(finalTemp)



      } catch (error) {
        console.log(error);
        console.log("why heree")
      }
  };
 
    return(
        <>
        <Container>

       <form className = 'input-list' onSubmit = {submitData} >
              <label>
              Search City <br></br>
              <input type = 'text' name = 'search' onChange = {handleChange}></input>
              </label>
              
              <div>
              <button type = 'submit' >Submit</button>
              </div>
          </form>
          
                         {results && results.weather && results.weather[0].main==="Clear"?
                           (
                               
                               
                            <Jumbotron>
                                 <img src="https://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/256/Status-weather-clear-icon.png" alt="clear"/>
                                <h1>{results.name}</h1>
                                
                                <p>
                                    Today the weather feel like {feels} celsius
                                    and the sunrise was at {sunrise} ,and the sunset will be at {sunset }  take a beer and enjoy it.
                                </p>
                                <p>
                           the minimum temperature  is : <b>{tempMin}</b> and the maximum temperature is : <b>{tempMax}</b> 

                           </p>
                           <p>average : <b>{temp}</b></p>
                                </Jumbotron>
                            
                           ):results && results.weather && results.weather[0].main==="Clouds" ?    
                           (
                            <Jumbotron>
                                 <img src="https://www.jing.fm/clipimg/full/21-214548_cloudy-weather-clipart-cartoon-weather-cloudy.png" style ={{width:"256px",height:"256px"}}alt="clear"/>

                                <h1>{results.name}</h1>
                                
                                <p>
                                    Today the weather feel like {feels} celsius
                                    and the sunrise was at {sunrise} ,and the sunset will be at {sunset }  take a beer and enjoy it.
                                </p>
                                <p>
                           the minimum temperature  is : <b>{tempMin}</b> and the maximum temperature is : <b>{tempMax}</b> 

                           </p>
                           <p>average : <b>{temp}</b></p>
                                </Jumbotron>
                           )
                           :results && results.weather && results.weather[0].main==="Snow" ?
                           (  <Jumbotron>
                            <img src="http://clipart-library.com/new_gallery/39-396184_snowfall-png-pic-snowy-weather-clip-art.png" style ={{width:"256px",height:"256px"}}alt="clear"/>
                           <h1>{results.name}</h1>
                           
                           <p>
                               Today the weather feel like {feels} celsius
                               and the sunrise was at {sunrise} ,and the sunset will be at {sunset }  take a rakia and enjoy it.
                           </p>
                           <p>
                           the minimum temperature  is : <b>{tempMin}</b> and the maximum temperature is : <b>{tempMax}</b> 

                           </p>
                           <p>average : <b>{temp}</b></p>
                           </Jumbotron>)
                           :
                           (<div></div>)
                        }
                      
                    
        </Container>
                    
                </>
               
    )
}

export default Home