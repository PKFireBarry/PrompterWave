"use client";
import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import Link from "next/link";
import Logout from "./components/Logout";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useUser } from "@clerk/nextjs";
import {
  Card,
  CardContent
} from "./components/ui/card";
import { motion } from "framer-motion";

export default function Home() {

  const [history, setHistory] = useState<any[]>([]);
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress;
  const [scrollY, setScrollY] = useState(0);

  async function fetchData() {
    try {
      const querySnapshot = await getDocs(collection(db, "db")); // Replace 'Ideas' with your actual collection name
      const data: any = [];

      querySnapshot.forEach((doc) => {
        const entry = { id: doc.id, response: doc, ...doc.data() };

        // Move the condition inside the loop to filter entries by email
        if (entry) {
          data.push(entry);
        }
      });
      setHistory(data);

      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }

  useEffect(() => {
    // You can update the scrollY state based on your logic
    // For example, scroll down by 125 pixels every second
    const interval = setInterval(() => {
      setScrollY((prevScrollY) => prevScrollY - 50);
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []); // Empty dependency array means this effect runs once on mount

  useEffect(() => {
    const fetchDataAndDoSomething = async () => {
      try {
        const data = await fetchData();
        setHistory(data);
        // Do something with the fetched data
      } catch (error) {
        console.error("Error:", error);
      }
    };

    // Call the fetchDataAndDoSomething function when the component mounts
    fetchDataAndDoSomething();
  }, []);

  return (
    <main className="flex  h-screen flex-col items-center justify-between p-24 bg-slate-300">
      
      <Logout />
      <Nav />


      <section className="w-full py-12 md:py-24 lg:py-32 rounded-3xl bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div>
              <motion.div

                initial={{ opacity: 0 }}
                transition={{ duration: 3 }} // Adjust duration as needed
                animate={{ opacity: 1 }}
                className="overflow-y-hidden  p-8 h-[500px] items-center"
              >
                {" "}
                {history && Array.isArray(history) && history.length > 0 ? (
                  history.map((entry: any) => (
                    <motion.div
                      key={entry.id} 
                      data-extension-installed={true}
                      transition={{ duration: 3 }} // Adjust duration as needed
                      initial={{ y: 0, opacity: 1 }}
                      animate={{ y: scrollY, opacity: 1}}
                     
                    >
                      <Card
                        key={entry.id}
                        className="relative my-8 outline hover:scale-105 transition overflow-hidden h-[500px]"
                      >
                        <CardContent className="grid gap-4 text-sm p-6">
                          <div className="flex items-center">
                            <p className="font-semibold text-xl flex min-h-full justify-center items-center">
                              Prompt: {entry.prompt}
                            </p>
                          </div>
                          <div className="flex items-center overflow-y-auto">
                            <textarea
                              rows={15}
                              defaultValue={entry.response}
                              className="w-full h-full text-base flex-grow overflow-y-hidden flex justify-center items-center"
                            ></textarea>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-start overflow-y-hidden"></div>
                )}
              </motion.div>
            </div>

            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Introducing
                </h1>
                <h1 className="text-3xl font-bold underline tracking-tighter sm:text-5xl xl:text-6xl/none">
                  PrompterWave
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Our product provides a key solution for your stable diffusion
                  prompting, offering seamless integration and efficient results
                  without needing to worry about the little stuff.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link
                  className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                  href="/login"
                >
                  Login
                </Link>
                <Link
                  className="inline-flex hover:underline h-10 items-center justify-center rounded-md border  border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                  href="/dashboard"
                >
                  Dashboad
                </Link>
                <Link
                  className="inline-flex h-10 items-center justify-center rounded-md border  border-gray-200 bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                  href="/about"
                >
                  About
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
