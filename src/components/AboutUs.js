import React from 'react';
import { alpha, makeStyles } from "@material-ui/core/styles";
import { Card, CardHeader, CardContent } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    titleSection: {
        marginTop: "7.5rem",
        display: "flex",
        justifyContent: "center"
    },
    title: {
        fontSize: "3rem",
        fontWeight: "700",
        color: "#ad1457"
    },
    content: {
        display: "flex",
        padding: "3rem",
        marginTop: "4rem"
    },
    subContentSection: {
        flexBasis: "50%",
    },
    teamContent: {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        marginTop: "3rem"
    },
    teamCard: {
        height: "18rem",
        width: "18rem",
        flexBasis: "40%",
        marginLeft:'1rem',
        marginRight:'1rem',
    },
    teamCardImage: {
        maxWidth: "15rem",
        maxHeight: "14rem",
        minWidth: "15rem",
        minHeight: "14rem",
        objectFit: "cover",
        borderRadius: "1rem",
        border: "2px solid #484848",
        boxShadow: "1.25rem 2.1875rem 2.1875rem rgba(51, 51, 51, 0.25)"
    },
    subTitle: {
        display: "flex",
        justifyContent: "center",
        fontSize: "1.75rem",
        fontWeight: "700",
        color: "#ad1457"
    },
    ourP: {
        fontSize: "1.25rem",
        fontWeight: "700",
        color: "#484848",
        lineHeight: "2rem",
        textTransform: "uppercase"

    },
    teamName: {
        marginBottom: "1.25rem",
        marginTop:"2rem",
        textAlign : "center",
        maxWidth: "15rem",
        minWidth: "15rem",
        fontSize: "1.5rem",
        fontWeight: "700",
        color: "#ad1457"
    },
}));

export default function AboutUs() {
    const classes = useStyles();

    return (
        <article>
            <section className={classes.titleSection}>
                <label className={classes.title}>About us</label>
            </section>
            <section className={classes.content}>
                <section className={classes.subContentSection}>
                    <div className={classes.subTitle}>
                        <label>OUR TEAM</label>
                    </div>

                    <div className={classes.teamContent}>
                        <div className={classes.teamCard}>
                        <div className={classes.teamName}>
                            <label>Nihad Zeidan</label>
                        </div>

                            <a href="https://github.com/NihadZeidan" target="_blank">
                                <img className={classes.teamCardImage} src="https://avatars.githubusercontent.com/u/77915170?v=4" alt="nihad" />
                            </a>
                        </div>
                        <div className={classes.teamCard}>
                        <div className={classes.teamName}>
                            <label>Mohammad Alazzam</label>
                        </div>
                            <a href="https://github.com/MohdAzzam" target="_blank">
                                <img className={classes.teamCardImage} src="https://avatars.githubusercontent.com/u/48564462?v=4" alt="mohammd" />

                            </a>
                        </div>
                        <div className={classes.teamCard}>
                        <div className={classes.teamName}>
                            <label>Ghofran Dayyat</label>
                        </div>
                            <a href="https://github.com/GhofranDayyat" target="_blank">
                                <img className={classes.teamCardImage} src="https://avatars.githubusercontent.com/u/77917739?v=4" alt="GhofranDayyat" />
                            </a>
                        </div>
                        <div className={classes.teamCard}>
                        <div className={classes.teamName}>
                            <label>Zakeyah Abu Yasein</label>
                        </div>
                            <a href="https://github.com/zakeyah" target="_blank">
                                <img className={classes.teamCardImage} src="https://avatars.githubusercontent.com/u/77916748?v=4" alt="Zakeyah" />
                            </a>
                        </div>
                    </div>
                </section>
                <section className={classes.subContentSection}>
                    <div className={classes.subTitle}>
                        <label>OUR PHILOSOPHY</label>
                    </div>
                    <p className={classes.ourP}>
                        TO MEET THE REGIONAL MARKET DEMANDS . WAS ESTABLISHED WITH E&M CORPORATION PHILOSOPHY OF PROTECTING THE GOLDEN TRIANGLE; BEST EFFORTS, INTEGRITY AND FAIRNESS.
                    </p>
                    <div className={classes.subTitle}>
                        <label>OUR MISSION</label>
                    </div>
                    <p className={classes.ourP}>
                        Make auction process easier and more accessible, by providing real-time auction web-application. Allow users not only to buy products but to be able also to sell products.
                    </p>
                </section>
            </section>
        </article>
    );
}