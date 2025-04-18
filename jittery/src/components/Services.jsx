import { useEffect, useState } from "react";
import TypingText from "./ui/typingtext";
import { Copyright } from "lucide-react";

export default function Services(){
    return(
        <div style={{ fontFamily: "monospace", fontSize: "1.1rem", color: "#fff", padding: "1.5rem", position:"fixed", bottom: 0, left:0}}>
            <div style = {{height: 350}}>
            <TypingText 
            text="Jittery Labs" 
            style = {{ fontWeight: 1000, fontSize: 40 }}
            speed = {100}
            />
            <TypingText 
            text="WE CREATE HIGH-QUALITY PHOTO AND VIDEO CONTENT FOR HOTELS, RESTAURANTS, AND LIFESTYLE BRANDS. FROM SHARP IMAGERY TO IMMERSIVE VIDEOS AND ENGAGING REELS, WE HELP YOU TELL YOUR STORY IN A WAY THAT FEELS AUTHENTIC AND VISUALLY STRIKING. OUR STYLE LEANS INTO A DOCUMENTARY-LIKE APPROACH - CAPTURING REAL MOMENTS, GENUINE ENERGY; AND THE ATMOSPHERE THAT, MAKES YOUR SPACE UNIQUE. WHETHER IT'S FOR YOUR WEBSITE, SOCIAL MEDIA, OR A CAMPAIGN, WE MAKE SURE YOUR BRAND LOOKS ITS BEST AND STANDS OUT."
            style ={{width: 500}}
            speed = {1}/>
            </div>
            
            <div style={styles.container}>
            {/* Left logo */}
                <img src="JL-white-transparent.png" alt="JL Logo" style={styles.logo} />

                {/* Middle Text Block */}
                <div style={styles.textBlock}>
                    <TypingText text="jitterylabs.com" style={styles.site}/>
                    <div style={styles.copyright}>
                    <Copyright style={styles.ce} />
                    <TypingText text="ALL COPYRIGHT BELONGS TO THE RESPECTIVE OWNERS"
                    style = {{fontSize: "0.8rem"}}/>
                    </div>
                </div>
            </div>
        </div>
    );
}


const styles = {
    container: {
      display: "flex",
      alignItems: "center",
      backgroundColor: "#000",
      color: "#fff",
    //   padding: "1rem 2rem",
      fontFamily: "monospace",
      fontSize: "0.85rem",
    },
    logo: {
      height: "100px",
      marginRight: "1rem",
    },
    textBlock: {
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
        textAlign: "left",
    },
    site: {
        fontSize: "1.1rem",
      fontWeight: 600,
    //   marginBottom: "0.2rem",
    },
    copyright: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      fontSize: "1.1rem",
      opacity: 0.8,
    },
    ce: {
      height: "20px",
      color: "white"
    },
  };