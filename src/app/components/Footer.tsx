import React from 'react'
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
  } from "@/components/ui/menubar"

  import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
  } from "@/components/ui/navigation-menu"
  
  import { Separator } from "@/components/ui/separator"

  
function Footer() {
  return (
    <>

    <div className='flex sticky h-[10%] bottom-4  items-center justify-center m-4'>

    <div className=''>
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">PrompterWave</h4>
        <p className="text-sm text-muted-foreground">
          Made with <a href=''>Next.js</a>, <a href=''>shadcn/ui</a>, and <a href=''>OpenAI</a>.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5  justify-evenly items-center space-x-4 text-sm">
        <a href='https://github.com/PKFireBarry'>Github</a>
        <Separator orientation="vertical" />
        <a href='https://www.linkedin.com/in/darion-george/'> My Linkedin</a>
        <Separator orientation="vertical" />
        <a href='https://huggingface.co/docs/diffusers/v0.14.0/en/stable_diffusion'>Stable Diffusion</a>
        <Separator orientation="vertical" />
        <a href='/about'>About</a>
      </div>
    </div>

    <div/>
  </div>
  </>
  )
}

export default Footer