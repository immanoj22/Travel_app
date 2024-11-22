import express from "express";
import bodyParser from "body-parser";
import pg from "pg"

const app = express();
const port = 3000;

const db=new pg.Client({
  user:"postgres",
  host:"localhost",
  database:"World",
  password:"Manoj@205",
  port:5432
})
db.connect();

async function checkVisisted() {
  const result = await db.query("SELECT country_code FROM visited_country");
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  const result=await db.query("SELECT country_code FROM visited_country")
  let arraycountry=[]
  result.rows.forEach(country=>{
    arraycountry.push(country.country_code)
  })

  res.render("index.ejs",{total:arraycountry.length,countries:arraycountry})
  
});

app.post("/add",async (req,res)=>{
  let input=req.body["country"]
  let remaining=input.slice(1,input.length)
  input=input[0].toUpperCase();
  const fullcount=input+remaining


  try{
    const element =await db.query("SELECT  country_code FROM allcountry WHERE country_name= $1",[fullcount])

    const data=element.rows[0];
    const countrycode=data.country_code

    try{
      await db.query("INSERT INTO visited_country (country_code) VALUES ($1)", [
        countrycode,
      ]);
      res.redirect("/")

    }catch (err) {
      console.log(err);
      const countries = await checkVisisted();
      res.render("index.ejs", {
        countries: countries,
        total: countries.length,
        error: "Country has already been added, try again.",
      });
    }
  
  
  } catch (err) {
    console.log(err);
    const countries = await checkVisisted();
    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      error: "Country name does not exist, try again.",
    });

    }

      
      
      
    
    
  })
  
  
  
  


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
