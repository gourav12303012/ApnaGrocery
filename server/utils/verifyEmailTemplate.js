const verifyEmailTemplate =({name,url})=>{
    return `
    <p>Dear ${name} </p>

    <p>Thank you for registering ApnaGrocery.</p>
    <a href=${url} style="color:#fff;background:blue;margin-top:10px,padding:20px;,display:block;">
   Verify Email
    </a>
    
    `
}

export default verifyEmailTemplate;