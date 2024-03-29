import React, { useRef, useEffect, useState } from 'react'
import styles from './InfoPage.module.css'

import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

import moreInfo from '../../data/moreInfo.json'
import heroesData from '../../data/heroes.json'

import bgVideo from '/operationBagration.mp4'

import HeroCard from '../../components/HeroCard/HeroCard'


const InfoPage = () => {
    const [heroes, setHeroes] = useState([])
    const { id } = useParams()

    const data = moreInfo.filter(el => el.id === (id - '0'))[0]

    const firstElRef = useRef(null)
    const secondElRef = useRef(null)

    window.scrollTo(0, 0);

    useEffect(() => {
        try {
            const firstElHeight = firstElRef.current.offsetHeight;
            secondElRef.current.style.maxHeight = `${firstElHeight}px`;

            setHeroes(heroesData.filter(el => el.id === (id - '0'))[0])
        }
        catch {
            console.log("Nema")
        }
    }, [])

    return data.id <= 3
        ? (
            <>
                {/* style={{backgroundImage: `url(${data.img_path})`, backgroundSize: ''}} */}
                <div className={styles.pageContainer}>
                    <video loop autoPlay muted className={styles.videoBackground}>
                        <source src={data.img_path} type='video/mp4' />
                    </video>

                    <div className={styles.pageWrapper}>
                        <h1 className={styles.headerTitle}> {data.title} </h1>
                        <p className={styles.headerSubtitle}>Память народа </p>

                        <a href={data.lochref} target="_blank" style={{ position: "relative", bottom: "0", display: "flex", alignItems: "center", gap: ".45rem", color:"white" }}>
                            <img src="/school12_web/location.svg" alt="locmark" />
                            <h5>{data.title}</h5>
                        </a>

                        <Link to={"/svetlogorsk_react/"}>
                            <button>
                                На главную...
                            </button>
                        </Link>
                    </div>
                </div>

                <div className={styles.main}>
                    <h2 className={styles.mainTitle}>Историческая справка</h2>
                    <div className={styles.mainInfoWrapper}>
                        <p>
                            {data.info}
                        </p>
                    </div>
                </div>
            </>
        ) : (
            <>
                {/* style={{backgroundImage: `url(${data.img_path})`, backgroundSize: ''}} */}
                <div className={styles.pageContainer} style={{ backgroundImage: `url(${data.img_path})`, backgroundSize: '', backgroundPosition: 'center' }}>
                    {/* <video loop autoPlay muted className={styles.videoBackground}>
                <source src={bgVideo} type='video/mp4'/>
            </video> */}

                    <div className={styles.pageWrapper}>
                        <h1 className={styles.headerTitle}> {data.title} </h1>
                        <p className={styles.headerSubtitle}>Память народа </p>

                        <Link to={"/svetlogorsk_react/"}>
                            <button>
                                На главную...
                            </button>
                        </Link>
                    </div>
                </div>

                <div className={styles.main}>
                    <h2 className={styles.mainTitle}>Историческая справка</h2>
                    <div className={styles.mainInfoWrapper}>
                        <p ref={firstElRef}>
                            {data.info}
                        </p>

                        <div className={styles.heroCardsWrapper} ref={secondElRef}>
                            <div className={styles.heroCards}>
                                {
                                    heroes?.heroes?.map((heroInfo, index) => <HeroCard heroInfo={heroInfo} key={index} />)
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
}

export default InfoPage
