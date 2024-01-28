import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import React from 'react'
import Footer from '../components/Footer'
import Nav from '../components/Nav'

function page() {
  return (
    <>
    <Nav/>
    <div className="flex flex-col min-h-screen justify-center items-center bg-slate-300">
      
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          
          <span className="sr-only">Prompter Wave</span>
        </Link>

      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 rounded-lg bg-white outline mb-4">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold underline tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  About PrompterWave
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                The journey of Prompter Wave began with a personal struggle – a challenge I faced in achieving good stable diffusion prompts. 
                While I excelled in using the software i couldnt create captivating images, I found myself lacking the creative spark to generate interesting subjects that aligned seamlessly with my initial concepts. 
                This gap between imagination and execution led me to envision a solution, and that's how Prompter Wave came into existence.
                This platform serves as a dedicated space to brainstorm ideas, refine concepts, and ultimately achieve the perfect balance between creativity and promptability in Stable Diffusion.
                </p>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl mt-4 dark:text-gray-400">
                


                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800 rounded-lg outline mb-4">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl underline">The Team</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Meet the dedicated team behind PrompterWave.
                </p>
              </div>
            </div>
            <div className=" justify-center flex grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-12">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage alt="John Doe" src="/placeholder-avatar.jpg" />
                  <AvatarFallback className='bg-blue-200'>DG</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold">Darion George</h3>
                <p className="text-gray-500">Dev</p>
              </div>

            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 rounded-xl bg-white dark:bg-gray-800 outline mb-4">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl underline">Timeline</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  A timeline of major milestones and achievements.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-8 py-12">
              <div className="flex flex-col items-start space-y-4">
                <div className="text-lg font-bold">2024</div>
                <p className="text-gray-500">We launched LFG.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 rounded-lg bg-white outline mb-4">
  <div className="container px-4 md:px-6">
    <div className="flex flex-col items-center space-y-4 text-center">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold underline tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
          Contact Us
        </h1>
        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
          Have questions or want to get in touch? Reach out to us through the following channels:
        </p>
        <div className="flex flex-col space-y-2 mt-4">
          <div className="flex items-center space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6 text-blue-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M22 12h-6m-6 0H2"
              ></path>
            </svg>
            <span className="text-gray-500">Email: info@prompterwave.com</span>

          </div>
          <div className="flex items-center space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6 text-green-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            <span className="text-gray-500">Phone: +1 (123) 456-7890</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

       
      </main>
       <Footer/>
    </div></>
  )
}

export default page