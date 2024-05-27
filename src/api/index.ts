import axios from "axios";

const url = "https://api.quotable.io"

export async function getQuote() {
    try{
        const res = await axios.get(`${url}/random`)
        if (res && res.data){
            console.log(res.data)
            return res.data
        }
    }
    catch(err){
        console.error(err)
    }
}