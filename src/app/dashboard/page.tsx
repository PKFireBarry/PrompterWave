"use client";

import React, { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import Nav from "../components/Nav";
import Logout from "../components/Logout";
import Footer from "../components/Footer";
import { doc, collection, setDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useUser } from "@clerk/nextjs";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";


const layout: string = `
Here is the Structure of how you should respond to the user.
 Always follow this format when responding.

Instagram Post: 'post goes here'

Stable Diffusion Prompt: 'generated prompt with high detail goes here'

Stable Diffusion Negitive Prompt: 'highly detailed dislikes go here'
`;

const examples = `
Anatomy of a good prompt
A good prompt needs to be detailed and specific. A good process is to look through a list of keyword categories and decide whether you want to use any of them.

The keyword categories are

Subject
Medium
Style
Art-sharing website
Resolution
Additional details
Color
Lighting


You don’t have to include keywords from all categories. Treat them as a checklist to remind you what could be used.

Let’s review each category and generate some images by adding keywords. I will use the Dreamshaper model, an excellent model for beginners.

To see the effect of the prompt alone, I won’t be using negative prompts for now. Don’t worry. We will study negative prompts in the later part of this article.

All images are generated with 25 steps of DPM++ 2M Karas sampler and an image size of 512×768.

Subject
The subject is what you want to see in the image. A common mistake is not writing enough about the subjects.

Let’s say we want to generate a sorceress casting magic. A newbie may write


A sorceress




You get some decent images, but this prompt leaves too much room for imagination. (It is common to see the face garbled in Stable Diffusion. There are ways to fix it.)

How do you want the sorceress to look? Do you have any keywords to describe her more specifically? What does she wear? What kind of magic is she casting? Is she standing, running, or floating in the air? What’s the background scene?

Stable Diffusion cannot read our minds. We have to say exactly what we want.

As a demo, 


let’s say she is powerful and mysterious and uses lightning magic. She wears a leather outfit with gemstones. She sits down on a rock. She wears a hat. The background is a castle.

a beautiful and powerful mysterious sorceress, smile, sitting on a rock, lightning magic, hat, detailed leather clothing with gemstones, dress, castle background




Now, we generate more specific images. The outfit, the pose and the background are consistent across images.

Medium
Medium is the material used to make artwork. Some examples are illustration, oil painting, 3D rendering, and photography. Medium has a strong effect because one keyword alone can dramatically change the style.

Let’s add the keyword digital art.

a beautiful and powerful mysterious sorceress, smile, sitting on a rock, lightning magic, hat, detailed leather clothing with gemstones, dress, castle background, digital art




The images switched from a realistic painting style to being more like computer graphics. I think we can stop here. Just kidding.

Style
The style refers to the artistic style of the image. Examples include impressionist, surrealist, pop art, etc.

Add hyperrealistic, fantasy, dark art to the prompt.

a beautiful and powerful mysterious sorceress, smile, sitting on a rock, lightning magic, hat, detailed leather clothing with gemstones, dress, castle background, digital art, hyperrealistic, fantasy, dark art




Now, the scene has become darker and more gloomy.

Art-sharing website
Niche graphic websites such as Artstation and Deviant Art aggregate many images of distinct genres. Using them in a prompt is a sure way to steer the image toward these styles.

Let’s add artstation to the prompt.
														
a beautiful and powerful mysterious sorceress, smile, sitting on a rock, lightning magic, hat, detailed leather clothing with gemstones, dress, castle background, digital art, hyperrealistic, fantasy, dark art, artstation




It’s not a huge change, but the images do look like what you would find on Artstation.

Resolution
Resolution represents how sharp and detailed the image is. Let’s add keywords highly detailed and sharp focus.

a beautiful and powerful mysterious sorceress, smile, sitting on a rock, lightning magic, hat, detailed leather clothing with gemstones, dress, castle background, digital art, hyperrealistic, fantasy, dark art, artstation, highly detailed, sharp focus




Well, it’s not a huge effect, perhaps because the previous images are already pretty sharp and detailed. But it doesn’t hurt to add.

Additional details
Additional details are sweeteners added to modify an image. We will add sci-fi and dystopian to add some vibe to the image.

a beautiful and powerful mysterious sorceress, smile, sitting on a rock, lightning magic, hat, detailed leather clothing with gemstones, dress, castle background, digital art, hyperrealistic, fantasy, dark art, artstation, highly detailed, sharp focus, sci-fi, dystopian




Color
You can control the overall color of the image by adding color keywords. The colors you specified may appear as a tone or in objects.

Let’s add some golden color to the image with the keyword iridescent gold.

a beautiful and powerful mysterious sorceress, smile, sitting on a rock, lightning magic, hat, detailed leather clothing with gemstones, dress, castle background, digital art, hyperrealistic, fantasy, dark art, artstation, highly detailed, sharp focus, sci-fi, dystopian, iridescent gold




The gold comes out great in a few places!

Lighting
Any photographer would tell you lighting is key to creating successful images. Lighting keywords can have a huge effect on how the image looks. Let’s add studio lighting to make it studio photo-like.

a beautiful and powerful mysterious sorceress, smile, sitting on a rock, lightning magic, hat, detailed leather clothing with gemstones, dress, castle background, digital art, hyperrealistic, fantasy, dark art, artstation, highly detailed, sharp focus, sci-fi, dystopian, iridescent gold, studio lighting




This completes our example prompt.
`;

let dislikes = `morbid, mutilated, mutation, disfigured, worst quality, extra fingers, missing fingers, poorly rendered hands, mutation, deformed iris, deformed pupils, deformed limbs, missing limbs, amputee, amputated limbs, watermark, logo , text, piercing, big eyes , teeth, cartoon, shallow depth of field, makeup, Fooocus V2 Expansion, Deformed, blurry, bad anatomy, disfigured, poorly drawn face, mutation, mutated, extra limb, ugly, poorly drawn hands, missing limb, blurry, floating limbs, disconnected limbs, malformed hands, blur, out of focus, long neck, long body, realisticvision-negative-embedding, worst quality, low quality, normal quality, child, blurry, deformed, disfigured, morbid, mutated, bad anatomy, bad art, (bad teeth, weird teeth, broken teeth), (dead, weird eyes, deformed eyes, lifeless eyes, robot eyes), (worst quality, low quality, logo, text, watermark, username), incomplete`;

const stable_diffusion_docs = `
(Example: cat, small, cute, outside, playing, forest, daytime, with a dog, by a tree)

The keyword categories are

Subject
Medium
Style
Art-sharing website
Resolution
Additional details
Color
Lighting
Clear and specific
Concise
Relevant
Unambiguous

 Understanding Stable Diffusion
Stable Diffusion is an image synthesis technology that uses a combination of AI models and image generation techniques to create highly realistic images based on text prompts. By inputting a text prompt, the system generates images that match the description, allowing users to create unique and tailored visuals for a wide range of applications.

 The Importance of Effective Prompts
The quality of the images generated by Stable Diffusion heavily depends on the effectiveness of the prompt. A well-crafted prompt can guide the AI model in generating images that closely match the desired result, while an unclear or vague prompt can lead to unexpected or unsatisfactory outcomes. Therefore, understanding how to write effective prompts is crucial for getting the most out of the Stable Diffusion technology.

 Keyword Selection and Evaluation
Keywords play a critical role in guiding the AI model to generate relevant images. When selecting keywords for your prompt, consider the following:

Relevance: Choose keywords that are directly related to the subject and scene you want to generate.
Popularity: Popular keywords are more likely to be recognized and understood by the AI model.
Effectiveness: Test individual keywords to see if they produce the desired effect on the generated images.
6. Managing Variation in Image Generation
To control the variation in the images generated by Stable Diffusion, you can:

Add more detail to your prompt: By providing more specific descriptions, you can narrow down the possible interpretations of your prompt and reduce the variation in the generated images.

7. Understanding Association Effects
Association effects occur when certain attributes or elements are strongly correlated in the AI model's understanding. These associations can lead to unintended consequences in the generated images. To manage association effects:

Be aware of common associations, such as ethnicity and eye color, and plan your prompts accordingly.
Be cautious when using celebrity names or artist names, as they can carry unintended associations with poses, outfits, or styles.
Test your prompts to identify any unintended association effects and adjust the prompt as needed.`;

const instagram_examples = `
Use natural light for bright, balanced photos.
Write a compelling Instagram post.
Once your content is ready, it’s time to craft a post that captures what your post is all about.

Lead with the most important information.
Use a consistent and personal tone.
Keep copy short and to the point.
Encourage action with simple, direct text.


Add helpful hashtags.
You’re almost ready to post! 
Adding tags before you share helps customers discover you more.

Use hashtags to make posts more discoverable.
Tag partners to bring them into the conversation.
`;
let like = 'looking at viewer, natural skin texture, realistic eye and face details, full lips, motion blur, kodak gold 400, beauty photography, bokeh, soft focus, masterpiece, breathtaking, atmospheric perspective, diffusion, pore correlation, skin imperfections, slight smile , detailed skin face and eyes , natural lighting, long hair, natural face , jet black hair , brown eyes, dark circles under eyes,';

const ideas = `
"Embracing natural beauty: No makeup selfie 🌺 #NaturalBeauty"
"Celebrating strength: Post a workout or fitness progress photo 💪 #StrongWomen"
"Dress to impress: OOTD featuring your favorite outfit 👗 #Fashionista"
"Confidence is key: Share a candid photo with a confidence-boosting caption 🌟 #ConfidentWoman"
"Glowing from within: Radiant skincare routine results ✨ #SkincareGlow"
"Elegance in simplicity: Black and white portrait 📷 #ClassicBeauty"
"Empowerment vibes: Strike a power pose and inspire others 🚺 #EmpowerHer"
"Casual chic: Relaxed weekend look in comfy attire 😊 #CasualStyle"
"Inspirational journey: Reflect on personal growth with a throwback photo 🌻 #Growth"
"Sunkissed moments: Capture the beauty of natural sunlight on your face ☀️ #Sunkissed"
"Fierce and fabulous: Channel your inner diva with a bold look 💋 #FierceFashion"
"Timeless beauty: Vintage-inspired photo shoot 🕰️ #VintageGlam"
"Effortless charm: Share a candid moment that captures your charisma 💃 #Charismatic"
"Powerful women unite: Tag and celebrate the women who inspire you 💖 #WomenSupportingWomen"
"Dancing through life: Showcase your love for dance in a vibrant photo 💃 #DanceLife"
"Morning routine: Capture a peaceful moment to start the day right 🌅 #MorningGlow"
"Adventure awaits: Pose with a breathtaking scenic backdrop 🏞️ #AdventureTime"
"Bold and beautiful: Experiment with a bold makeup look and share the results 💄 #BoldBeauty"
"Inner strength: Share a quote that reflects your resilience as a woman 🌺 #InnerStrength"
"In the spotlight: Showcase your talent or passion in a creative way 🎤 #Spotlight"
"Nature's beauty: Outdoor photo surrounded by flowers or greenery 🌷 #NatureLover"
"Sisterhood vibes: Post a photo with your close female friends or family 👭 #Sisterhood"
"Glamorous night out: Share a photo from a special evening event 🌟 #GlamNight"
"Fashion-forward: Highlight a favorite accessory or fashion statement piece 👠 #FashionForward"
"Wisdom in words: Share a photo with a meaningful quote about life or womanhood 📖 #Wisdom"
"Casual elegance: Everyday outfit that exudes comfort and style 😌 #CasualElegance"
"Fitness journey update: Progress photo and fitness achievements 💪 #FitnessJourney"
"Radiant smile: Showcase your infectious smile in a joyful photo 😊 #JoyfulMoment"
"Creative expression: Share an artistic or creative project you've been working on 🎨 #CreativeSpirit"
"Celebrating individuality: Embrace your unique qualities and share a photo that represents you 🌈 #BeYourself"`;

function Dashboard() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [constants, setConstants] = useState("");
  const [Nconstants, setNconstants] = useState("");
  const { user } = useUser();


  //submiting the propmpt to the api
  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    data: any
  ) => {
    event.preventDefault();

    // Make API call to OpenAI ChatGPT-3.5 Turbo
    try {
      setIsLoading(true);
      setResponse("");

      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
            // Replace with your actual API key
          },
          body: JSON.stringify({
            messages: [
              {
                role: "system",
                content: `
                Forget everything from before this message and only use what is given here.
                Here is the layout of the response I would like to see do not deviant from this format: ${layout}. 
                this is very important and should be followed at all times.
                Use these in the stable diffusion prompt ${constants} exactly as it's written.
                add more words to the stable duffsion prompt to match well with the ${prompt}
                Always include the dislikes in the negitive prompt ${Nconstants}.  
                Generate a high quailty Instagram post from the perspective that correlates to a matching stable diffusion prompt. 
                Here are some instructions for your ability to accomplish the task. 
                Using (if no prompt, pick a post idea from here in the list ${ideas}): ${prompt}. Make a compelling instagram post that is based on the prompt.
                Make sure this is something that follows ${instagram_examples} as well as the charater limit of post on the website.
                Feel free to use emojis and other charaters to feel like something an actual user would post in alignment with the post idea.
               
                Next, You will create a corisponding prompt in stable diffusion for the instagram post to generate an image.
                Use keyword prompt format for the prompt and the negitive prompt.
                Dont include hashtags in the stable diffusion prompt.
                
                             
                There will be documentation below on what you should include in the form of ${stable_diffusion_docs}.
                Make sure to be a descriptive as possibe and to as clearly as possible try to paint a realistic setting from the instagram post for the stable diffsion propmt this part is exetremly important. 
                For each catergory in the pick at least 3 keywords for the prompt.
                The prompt shouldnt be written as a sentence but a short grouping of words or single words seperated by commas.
                Here is the layout of the response I would like to see do not deviant from this format: ${layout}. 
                this is very important and should be followed at all times.
                `,
              },
            ],
            temperature: 0.5,
            model: "gpt-4-1106-preview",

            max_tokens: 4000,
          }),
        }
      );

      const data = await response.json();
      console.log("API Response:", data);

      console.log(
        "The response from the Api was: ",
        data.choices[0]?.message.content
      );
      const message = data.choices[0]?.message.content;

      setConstants(like);
      setNconstants(dislikes);
      setResponse(message);
      
      addResponseToDatabase(message);
      
      // send info to database
    } catch (error) {
      console.error("Error making API call:", error);
    } finally {
      console.log(data, constants, Nconstants);
      setIsLoading(false);
      setPrompt("");

    }
  };

  // adding the response to the database
  const addResponseToDatabase = async (message: string) => {
    try {
      // Reference to the Firestore collection
      const collectionRef = collection(db, "db");

      // Explicitly generate a new document ID
      const newDocRef = doc(collectionRef);

      // Get user information using Clerk's useUser hook
      const name = user?.fullName;
      const email = user?.primaryEmailAddress?.emailAddress;
      response.split("");

      // Add a new document to the collection with the response message and user information
      await setDoc(newDocRef, {
        response: message,
        name: name,
        email: email,
        prompt: prompt,
      });

      console.log("Document written with ID:", newDocRef.id);
    } catch (error) {
      console.error("Error adding response to database:", error);
    }
  };

  return (
    <>
      <Nav />
      <Logout />
      <div className="justify-center flex items-center h-5/6">
        <div className="flex w-11/12 bg-blue-200 gap-4 p-6 rounded   py-12 md:py-24 lg:py-32  dark:bg-gray-800 outline">
          <form
            onSubmit={(event) => handleSubmit(event, response)}
            className="w-[30%]"
          >
            <div className="flex flex-col gap-4">
              <HoverCard>
                <HoverCardTrigger>
                  <h1 className="text-4xl underline animate-bounce font-bold">
                    Dashboard
                  </h1>
                </HoverCardTrigger>
                <HoverCardContent className="outline">
                  Welcome to the Dashboard! Here, you have two options: you can
                  either opt for a random selection without providing a prompt,
                  or if you have a specific idea in mind, use the text box below
                  to guide the AI in generating the desired image. Your
                  creativity is the limit!
                </HoverCardContent>
              </HoverCard>

              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="input-field"
                  className="text-xl  text-black font-bold"
                >
                  {" "}
                  Prompt concept{" "}
                </Label>

                <Input
                  id="input-field"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Enter your prompt idea here"
                  className="bg-white "
                />

                <HoverCard>
                  <HoverCardTrigger>
                    <Label
                      htmlFor="input-field"
                      className="text-lg  text-black font-bold"
                    >
                      {" "}
                      Prompt Constants{" "}
                    </Label>
                  </HoverCardTrigger>
<HoverCardContent className="outline">
  Prompts are crucial components in the realm of Stable Diffusion, acting as the foundational blueprint from which AI algorithms create unique pieces of art. Think of prompt constants like things you want to be consistent throughout many different photographs you wish to create. This can be helpful for keeping a subject the same while altering the environment/location around it.
</HoverCardContent>

                </HoverCard>

                <Textarea
                  id="input-field-2"
                  
                  defaultValue={like}
                  onChange={(e) => setConstants(e.target.value)}
                  placeholder="Enter your Constants"
                  className="bg-white"
                  rows={7}
                  
                />

                <HoverCard>
                  <HoverCardTrigger>
                    <Label
                      htmlFor="input-field"
                      className="text-lg  text-black font-bold"
                    >
                      {" "}
                      Negitive Prompt Constants{" "}
                    </Label>
                  </HoverCardTrigger>
                  <HoverCardContent className="outline">
                    Negative prompts are basically text representations of what
                    you do not want to see in the image you're trying to
                    generate. The negative prompt is an additional way to nudge
                    Stable Diffusion to give you what you want. A negative
                    prompt removes objects or styles in a way that may not be
                    possible by tinkering with a positive prompt alone.
                  </HoverCardContent>
                </HoverCard>

                <Textarea
      id="input-field-3"
      
      defaultValue={dislikes}
      onChange={(e) => setNconstants(e.target.value)}
      placeholder="Enter your Negitive Constants"
      className="bg-white"
      rows={7}
    />
              </div>

              <Button className="" type="submit">
                {isLoading ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </form>

          <div className="bg-slate-400 rounded-lg p-6 w-4/6 outline">
            <HoverCard>
              <HoverCardTrigger>
                <h2 className="text-xl font-bold mb-4 underline transition">
                  Content Area
                </h2>
              </HoverCardTrigger>
              <HoverCardContent className="outline">
                The response content will be showcased here. If you wish to
                review previous generations, simply navigate to the{" "}
                <a className="font-bold text-blue-500" href="/history">
                  archive
                </a>{" "}
                page to retrieve them from the database. You can edit and delete
                old ideas there as well!
              </HoverCardContent>
            </HoverCard>
            <Textarea
              className=" bg-white"
              id="textarea"
              value={response}
              rows={30}
              placeholder="Get ready for an awesome and fully developed idea that's about to make an appearance – I swear! (Response content will show up here....)"
            />
            <p></p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Dashboard;
