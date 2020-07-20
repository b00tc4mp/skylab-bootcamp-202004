import React from 'react'
export default function () {


      return <section className="meeting">
      <h1>Create new summary</h1>
      <form onSubmit=''>
          <input type="text" name="title" placeholder="" required pattern="[A-Za-z]{1,20}" />
          <input type="text" name="content" placeholder="" required pattern="[A-Za-z]{1,20}" />
          
          <button>Save</button>    
        </form>
  </section>
}