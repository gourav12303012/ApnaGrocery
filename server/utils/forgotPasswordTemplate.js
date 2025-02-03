const forgotPasswordTemplate = ({name,otp})=>{
    return `
    <div>
      <p>Dear, ${name}</p>
      <p>you are requested a password reset. please use the following code to reset your password </p>

      <div style="background:yellow;font-size:20px;padding:20px;text-align:center;font-weight:800;">
      ${otp}
      </div>
      <p>This otp is valid for one hour only</p>
      </br>
      </br>
      <p>Thanks</p>
      <p>Team ApnaGrocery</p>



    </div>
    
    `

}

export default forgotPasswordTemplate