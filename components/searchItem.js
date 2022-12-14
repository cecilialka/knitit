import styles from "../styles/Home.module.css";
import { useState } from "react";
import FlareIcon from "@mui/icons-material/Flare";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export default function SearchItem({sweaterItem}) {
    const [showYarn, setShowYarn] = useState(false);
    const sweater = sweaterItem;

    const onShowYarn = () => {
        setShowYarn(!showYarn);
    }

    console.log(sweater);

    return (
        <div className={styles.itemcontainer}>
       
        {showYarn ? <div className={styles.searchitemtext}>
            <ArrowBackIosNewIcon onClick={onShowYarn}/>
            <ul className={styles.listpadding}>{sweater.yarn.map((g, i) => (
            <li className={styles.value}>{g}</li>
          ))}</ul></div> : 
            <div className={styles.searchitemtext}>
            <span className={styles.cardheader}>
            <a className={styles.link} href={sweater.link}>
              {sweater.name}
            </a>
          </span>
            <span className={styles.key}>
              Difficulty: {[...Array(sweater.difficulty)].map((el, i) => (<FlareIcon sx={{ fontSize: 20 }}/>))}
            </span>
            <span className={styles.key}>
              Needles:{" "}
              {sweater.needlesize.map((n, i) => (
                <span className={styles.value}>{n}, </span>
              ))}
            </span>
            <span className={styles.key}>
              Yarn:{" "} <button onClick={onShowYarn} className={styles.showmorebutton}>show yarn</button>
            </span>
            </div>}
      </div>
    )
}