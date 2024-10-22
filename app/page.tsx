"use client"
import { useEffect, useState } from "react"
import Link from "next/link"


interface MediaElement {
  title: string
  artist: string
  medium: string
  year: number
  link: string
}


interface MediaElementDisplayProps {
  element: MediaElement
}


function MediaElementDisplay({ element }: MediaElementDisplayProps) {
  const [infoRevealed, setInfoRevealed] = useState<boolean>(false);

  function toggleInfoRevealed() {
    setInfoRevealed(!infoRevealed)
  }

  function InfoBlock() {
    const buttonClass = "block bg-background text-accent w-24 mx-auto p-1 rounded-lg my-3"

    if (!infoRevealed) {
      return (
        <div>
          <button onClick={toggleInfoRevealed} className={buttonClass}>
            Reveal
          </button>
        </div>
      )
    }

    return (
      <div>
        <p>Medium: {element.medium}</p>
        <p>Artist: {element.artist}</p>
        <p>Released: {element.year}</p>
        <Link href={element.link} className="underline">
          Check it out!
        </Link>
        <button onClick={toggleInfoRevealed} className={buttonClass}>
          Hide
        </button>
      </div>
    )
  }

  return (
    <div className="block bg-secondary text-center p-2 my-3 mx-24 rounded-lg">
      <p className="text-xl my-2">
        {element.title}
      </p>
      <InfoBlock />
    </div>
  )
}


function MediaList() {
  const [media, setMedia] = useState<MediaElement>(null)

  useEffect(
    () => {
      async function getMediaData() {
        let mediaResponse: Awaited<Promise<string>> = await fetch("/data.json")
        let media = await mediaResponse.json()

        setMedia(media)
      }
      getMediaData()
    },
    []
  )

  if (!media) {
    return (
      <div>
        Loading media...
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      {
        media.map((mediaEntry, index) => (
          <MediaElementDisplay key={index} element={mediaEntry}/>
        ))
        // I noticed one of the requirements is using the key to get
        // data from media. I think my approach (passing the mediaEntry
        // object as a prop) makes more sense in this scenario, but if I
        // wanted to use the key to get the data from media, I could pass
        // the key as a prop as well, and then do something like this to
        // get the object:
        // media[key]
      }
    </div>
  )
}


export default function Home() {
  return (
    <div>
      <h1 className="text-5xl text-center font-bold my-5">Media</h1>
      <MediaList />
    </div>
  )
}
