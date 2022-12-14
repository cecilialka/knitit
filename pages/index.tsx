import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

const searchImages = [
  {
    name: "sweater",
    heading: "Sweaters",
    link: "/sweaters",
  },
  {
    name: "hat",
    heading: "Hats",
    link: "/hats",
  },
  {
    name: "pinde",
    heading: "Slipovers",
    link: "/pinde",
  },
  {
    name: "yarn",
    heading: "Yarn",
    link: "/yarn",
  },
];

export default function Home() {
  return (<>
    <div className={styles.container}>
      <h2 className={styles.textstyle}>What are you searching for?</h2>
      <div className={styles.imagecontainer}>
        {searchImages.map((img, i) => (
          <Link href={img.link}>
            <div className={styles.topiccontainer}>
              <div key={i}>
                <span>{img.heading}</span>
              </div>{" "}
            </div>{" "}
          </Link>
        ))}
      </div>
    </div>
    </>
  );
}
