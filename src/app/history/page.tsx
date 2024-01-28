"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  CardTitle,
  CardHeader,
  CardContent,
  Card,
  CardDescription,
} from "../components/ui/card";
import Nav from "../components/Nav";
import Logout from "../components/Logout";
import Footer from "../components/Footer";
import { doc, getDocs, collection, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useUser } from "@clerk/nextjs";

function History() {
  const [history, setHistory] = useState<any[]>([]);
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress;

  const fetchData = useCallback(async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "db")); // Replace 'Ideas' with your actual collection name
      const data: any = [];

      querySnapshot.forEach((doc) => {
        const entry = { id: doc.id, email, ...doc.data() };

        if (entry.email === email) {
          data.push(entry);
        }
      });

      setHistory(data);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }, [email]);

  // Call fetchData within a function or component
  const fetchDataAndDoSomething = useCallback(async () => {
    try {
      const data = await fetchData();
      setHistory(data);
      // Do something with the fetched data
    } catch (error) {
      console.error("Error:", error);
    }
  }, [fetchData]);

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
  }, [fetchData]); // Include fetchData in the dependency array

  async function deleteEntry(entryId: any) {
    try {
      await deleteDoc(doc(db, "db", entryId));
      console.log("Entry deleted successfully");
      // Call fetchData to refresh the history after deletion
      fetchDataAndDoSomething();
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  }

  return (
    <div className=" overflow-x-hidden">
      <Logout />
      <Nav />
      <section className="w-full h-screen py-12 md:py-24 lg:py-32 bg-slate-300">
        <div className="container p-4 px-4 md:px-6 bg-white  rounded-2xl outline">
          <div className="flex flex-col items-center space-y-4 text-center  rounded-lg p-4 mx-2">
            <div className="space-y-2">
              <h1 className="text-3xl m-4 underline font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Log Archive
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Browse through the log entries to check the activities on your
                account.
              </p>
            </div>

            <p></p>
          </div>

          <div className=" h-[700px] overflow-y-scroll  max-w-full items-center gap-8 py-12 lg:grid-cols-2 lg:gap-12">
            {history && Array.isArray(history) && history.length > 0 ? (
              history.map((entry: any) => (
                <Card
                  key={entry.id}
                  data-extension-installed={true}
                  className="relative m-4  overflow-hidden h-[600px]"
                >
                  <CardHeader className="flex flex-row items-center border-b">
                    <CardTitle>{`Log Entry: ${entry.id}`}</CardTitle>

                    <CardDescription className="ml-auto">
                      {entry.name}
                    </CardDescription>
                    <CardDescription className="ml-auto">
                      {entry.email}
                    </CardDescription>
                    <Button
                      className="ml-auto"
                      onClick={() => deleteEntry(entry.id)}
                    >
                      Delete
                    </Button>
                  </CardHeader>
                  <CardContent className="grid gap-4 text-sm p-6">
                    <div className="flex items-center">
                      <p className="font-semibold text-xl flex min-h-full justify-center items-center">
                        Prompt: {entry.prompt}
                      </p>
                    </div>
                    <div className="flex items-center overflow-y-auto">
                      <textarea
                        rows={15}
                        defaultValue={`${entry.response}`}
                        className="w-full h-full text-base flex-grow  flex justify-center items-center"
                      ></textarea>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="flex flex-col items-center justify-start h-screen ">
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin h-5 w-5 border-t-2 rounded-full border-b-2 border-black" />
                </div>
                <p className="mt-4 text-black text-lg">
                  Press the button to load your post from the database...
                </p>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </section>
    </div>
  );
}

export default History;
