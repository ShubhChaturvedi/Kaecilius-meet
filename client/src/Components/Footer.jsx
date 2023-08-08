import React from 'react'

export default function Footer() {
  return (
    <div className='mt-5'>
      <footer className="bg-dark text-center mt-4 text-white">
  <div className="container p-4 pb-0">
    <section className="mb-4">
      <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"
        >Github link</a>
      <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"
        >Read docs</a>
      
    </section>
  </div>
  <div className="text-center p-3" style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}>
    © 2023 Copyright :
    <a className="text-white" href="/"> keacilius-meet.com</a>
  </div>
</footer>
    </div>
  )
}
