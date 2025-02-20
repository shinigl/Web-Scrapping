 const axios = require("axios");
 const cheerio = require("cheerio")
 const fs = require("node:fs")
 const xlsx = require("xlsx")
//  const url = "https://www.amazon.in/s?k=laptop&crid=3USMQG9UPSEMO&sprefix=laptop-%2Caps%2C263&ref=sr_pg_1";

 const scrapper =async()=>{

        try{
            // const res = await axios.get(`https://www.amazon.in/s?k=laptop&crid=3USMQG9UPSEMO&sprefix=laptop-%2Caps%2C263&ref=sr_pg_${i}`);
            // const data = res.data;
            // fs.appendFile("data1.txt",data.toString(),(err)=>{
            //     if(err){
            //         console.log(err);
            //         return
            //     }
            //     console.log("File save successfully");
                
            // })
            // console.log(data);

            const htmlData =  fs.readFileSync("data1.txt")
            // console.log(htmlData.toString())
            const $ = cheerio.load(htmlData.toString());
            const productCard = $("div[data-uuid]")
            const products=[];
            
            productCard.each((index,element)=>{
                const title  = $(element).find('h2>span').text();
                const price = $(element).find(".a-price-whole").text()
                const rating = $(element).find(".a-icon-alt").text()
                const rate =rating.split(" ")[0];
                // console.log(rate);
                
                if(title && price && rate){
                    products.push({
                        Title:title,
                        Price:price.replaceAll(",",""),
                        Rate:rate
                    })
                }   
            })
            // fs.writeFile("product.json",JSON.stringify(product),(err)=>{
            //     if(err){
            //         console.log(err);
            //         return
                    
            //     }
            //     console.log("Product Json Data is successfully SAVE");
                
            // })
           
            const workbook =xlsx.utils.book_new();
            const sheet = xlsx.utils.json_to_sheet(products)
            xlsx.utils.book_append_sheet(workbook,sheet,"products")
            xlsx.writeFile(workbook,"Products.xlsx")
            
            // const prices = $(".a-price-whole")
            // prices.each((index,ele)=>{
            //     const price = $(ele).text();
            //     console.log(price); 
            // })
           
            
        }catch(err){
            console.log("error while calling the url",err)
        }

    }
 
 scrapper()